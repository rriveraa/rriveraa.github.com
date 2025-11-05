/***************************************************************************/
/* WEBGL HOVER EFFECT - Based on webgl-mouseover-effects */
/***************************************************************************/
import * as THREE from 'three';

export class WebGLHoverEffect {
  constructor(img, options = {}) {
    this.img = img;
    this.options = {
      intensity: 0.8,
      color: new THREE.Color(0x01FF89), // Not used in new shader but kept for compatibility
      ...options
    };
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mesh = null;
    this.mouse = new THREE.Vector2(0.5, 0.5);
    this.targetMouse = new THREE.Vector2(0.5, 0.5);
    this.mouseVelocity = new THREE.Vector2(0, 0);
    this.prevMouse = new THREE.Vector2(0.5, 0.5);
    this.isHovered = false;
    
    this.init();
  }
  
  init() {
    const container = this.img.parentElement;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
    
    // Texture
    const texture = new THREE.TextureLoader().load(this.img.src, () => {
      this.img.style.opacity = '0';
    });
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseVelocity: { value: new THREE.Vector2(0, 0) },
        uIntensity: { value: this.options.intensity },
        uColor: { value: this.options.color }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform vec2 uMouseVelocity;
        uniform float uIntensity;
        uniform vec3 uColor;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Get texture 3 times, each time with a different offset, depending on mouse velocity
          // This creates the chromatic aberration / colorful edge effect
          // Increased multipliers for more visible distortion at edges
          float r = texture2D(uTexture, uv + uMouseVelocity * 1.0).r;
          float g = texture2D(uTexture, uv + uMouseVelocity * 1.05).g;
          float b = texture2D(uTexture, uv + uMouseVelocity * 1.1).b;
          
          // Get original alpha
          float a = texture2D(uTexture, uv).a;
          
          // Combine RGB channels with trailing effect
          gl_FragColor = vec4(r, g, b, a);
        }
      `
    });
    
    // Mesh
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.pointerEvents = 'none';
    
    // Event listeners
    container.addEventListener('mouseenter', () => {
      this.isHovered = true;
    });
    
    container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.targetMouse.set(0.5, 0.5);
      this.mouseVelocity.set(0, 0);
      this.prevMouse.set(0.5, 0.5);
    });
    
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y
      this.targetMouse.set(x, y);
      
      // Calculate mouse velocity for trailing effect (increased for more visible distortion)
      this.mouseVelocity.set(
        (x - this.prevMouse.x) * 20.0,
        (y - this.prevMouse.y) * 20.0
      );
      this.prevMouse.set(x, y);
    });
    
    // Animation
    this.animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Smooth mouse interpolation
    this.mouse.lerp(this.targetMouse, 0.1);
    
    // Decay mouse velocity (smooth trailing effect)
    this.mouseVelocity.lerp(new THREE.Vector2(0, 0), 0.1);
    
    // Update shader uniforms
    if (this.mesh && this.mesh.material) {
      this.mesh.material.uniforms.uMouse.value = this.mouse;
      this.mesh.material.uniforms.uMouseVelocity.value = this.mouseVelocity;
      this.mesh.material.uniforms.uIntensity.value = this.isHovered ? this.options.intensity : 0;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  handleResize() {
    const container = this.img.parentElement;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    this.renderer.setSize(width, height);
  }
  
  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }
    if (this.mesh && this.mesh.material) {
      this.mesh.material.dispose();
    }
    if (this.mesh && this.mesh.geometry) {
      this.mesh.geometry.dispose();
    }
  }
}

