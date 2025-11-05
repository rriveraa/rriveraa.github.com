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
        uniform float uIntensity;
        uniform vec3 uColor;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Calculate distance from mouse
          float dist = distance(uv, uMouse);
          float influence = (1.0 - dist) * uIntensity;
          
          // Create distortion effect - stronger near mouse
          vec2 distortion = (uv - uMouse) * influence * 0.2;
          
          // Chromatic aberration - separate RGB channels for colorful edges
          float aberrationAmount = influence * 0.012;
          
          // Apply distortion with different offsets for each channel
          vec2 uvR = uv + distortion + vec2(aberrationAmount * 1.5, aberrationAmount * 0.5);
          vec2 uvG = uv + distortion;
          vec2 uvB = uv + distortion - vec2(aberrationAmount * 1.5, aberrationAmount * 0.5);
          
          // Sample each channel separately for colorful edge effect
          float r = texture2D(uTexture, uvR).r;
          float g = texture2D(uTexture, uvG).g;
          float b = texture2D(uTexture, uvB).b;
          
          // Get original alpha
          float a = texture2D(uTexture, uv).a;
          
          // Add colorful tint to edges based on distortion
          vec3 edgeColor = vec3(
            0.5 + 0.5 * sin(distortion.x * 25.0 + distortion.y * 15.0 + 0.0),
            0.5 + 0.5 * sin(distortion.x * 25.0 + distortion.y * 15.0 + 2.094),
            0.5 + 0.5 * sin(distortion.x * 25.0 + distortion.y * 15.0 + 4.189)
          );
          
          // Mix original color with edge color based on distortion intensity
          vec3 finalColor = mix(
            vec3(r, g, b),
            edgeColor,
            influence * 0.5
          );
          
          gl_FragColor = vec4(finalColor, a);
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
    });
    
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y
      this.targetMouse.set(x, y);
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
    
    // Update shader uniforms
    if (this.mesh && this.mesh.material) {
      this.mesh.material.uniforms.uMouse.value = this.mouse;
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

