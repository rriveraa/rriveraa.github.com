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
    this.targetScale = 1.0;
    this.currentScale = 1.0;
    
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
    
    // Geometry - more segments for smoother distortion
    const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);
    
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
        uScale: { value: 1.0 },
        uColor: { value: this.options.color }
      },
      vertexShader: `
        uniform vec2 uMouse;
        uniform vec2 uMouseVelocity;
        uniform float uIntensity;
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          
          // Get original position
          vec3 pos = position;
          
          // Convert UV to position space for distance calculation
          vec2 uvPos = uv * 2.0 - 1.0;
          vec2 mousePos = uMouse * 1.0 - 1.0;
          float dist = distance(uvPos, mousePos);
          
          // Calculate distance from center (for edge emphasis)
          float distFromCenter = length(uvPos);
          // Make edge factor more aggressive - starts later, stronger at edges
          float edgeFactor = smoothstep(0.5, 0.95, distFromCenter); // Stronger near edges only
          
          // Reduce influence in center significantly, maximize at edges
          float influence = (1.0 - dist) * uIntensity * (0.2 + 1.8 * edgeFactor);
          
          // Displace vertices based on mouse velocity (distorts the actual shape including edges)
          vec2 displacement = uMouseVelocity * influence * 0.2;
          pos.xy += displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform vec2 uMouseVelocity;
        uniform float uIntensity;
        uniform float uScale;
        uniform vec3 uColor;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Circular mask - ensure we're within circle
          vec2 center = vec2(0.5, 0.5);
          float distFromCenter = distance(uv, center);
          
          // Zoom effect: scale UV coordinates from center
          vec2 zoomedUv = (uv - center) / uScale + center;
          
          // Get texture 3 times, each time with a different offset, depending on mouse velocity
          // This creates the chromatic aberration / colorful edge effect
          // Increased multipliers for more visible distortion at edges
          vec2 aberrationOffset = uMouseVelocity * 1.2; // Slightly stronger for more color separation
          float r = texture2D(uTexture, zoomedUv + aberrationOffset * vec2(0.7, 0.0)).r;
          float g = texture2D(uTexture, zoomedUv + aberrationOffset * vec2(1.05, 0.0)).g;
          float b = texture2D(uTexture, zoomedUv + aberrationOffset * vec2(1.1, 0.0)).b;
          
          // Get original alpha from zoomed UV
          float a = texture2D(uTexture, zoomedUv).a;
          
          // Calculate edge proximity for colorful edge glow
          float edgeProximity = 1.0 - smoothstep(0.45, 0.5, distFromCenter);
          
          // Create colorful edge effect based on mouse velocity direction
          vec3 edgeColor = vec3(
            0.5 + 0.5 * sin(length(uMouseVelocity) * 10.0 + 0.0),
            0.5 + 0.5 * sin(length(uMouseVelocity) * 10.0 + 2.094),
            0.5 + 0.5 * sin(length(uMouseVelocity) * 10.0 + 4.189)
          );
          
          // Mix edge color with image based on proximity to edge
          vec3 finalColor = mix(
            vec3(r, g, b),
            edgeColor,
            edgeProximity * 0.4 * uIntensity
          );
          
          // Apply circular mask with smooth edge (allows distortion to show near edges)
          float edgeFade = 1.0 - smoothstep(0.48, 0.5, distFromCenter);
          
          // Combine RGB channels with trailing effect and colorful edges
          gl_FragColor = vec4(finalColor, a * edgeFade);
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
      this.targetScale = 1.15; // 15% zoom on hover
    });
    
    container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.targetScale = 1.0; // Return to normal size
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
    
    // Smooth scale interpolation
    this.currentScale += (this.targetScale - this.currentScale) * 0.1;
    
    // Update shader uniforms
    if (this.mesh && this.mesh.material) {
      this.mesh.material.uniforms.uMouse.value = this.mouse;
      this.mesh.material.uniforms.uMouseVelocity.value = this.mouseVelocity;
      this.mesh.material.uniforms.uIntensity.value = this.isHovered ? this.options.intensity : 0;
      this.mesh.material.uniforms.uScale.value = this.currentScale;
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

