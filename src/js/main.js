/***************************************************************************/
/* MODERN JAVASCRIPT - No jQuery! */
/***************************************************************************/
import { WebGLHoverEffect } from './webgl-effect.js';
import { CustomCursor } from './custom-cursor.js';
import * as THREE from 'three';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initFullscreenHeader();
  initMarqueeLoop();
  initCustomCursor();
  initWebGLEffects();
});

/***************************************************************************/
/* PRELOADER */
/***************************************************************************/
function initPreloader() {
  const preloader = document.getElementById('preloader');
  
  if (!preloader) return;
  
  // Wait for page to fully load
  window.addEventListener('load', () => {
    // Fade out loader
    const loader = preloader.querySelector('.loader');
    if (loader) {
      loader.style.transition = 'opacity 0.5s';
      loader.style.opacity = '0';
    }
    
    // Fade out wrapper after a delay
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Remove from DOM after animation
      setTimeout(() => {
        preloader.remove();
      }, 1000);
    }, 200);
  });
}

/***************************************************************************/
/* FULLSCREEN HEADER */
/***************************************************************************/
function initFullscreenHeader() {
  const header = document.querySelector('.header');
  
  if (!header) return;
  
  // Set fullscreen height on load and resize
  const setFullscreenHeight = () => {
    // Only on tablets and desktop (min-width: 768px)
    if (window.matchMedia('(min-width: 768px)').matches) {
      const height = window.innerHeight + 'px';
      header.style.minHeight = height;
    } else {
      header.style.minHeight = 'auto';
    }
  };
  
  // Set on load
  setFullscreenHeight();
  
  // Update on resize (with debounce for performance)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setFullscreenHeight, 100);
  });
}

/***************************************************************************/
/* MARQUEE SEAMLESS LOOP - JavaScript-based for true infinite scroll */
/***************************************************************************/
function initMarqueeLoop() {
  const marquee = document.querySelector('.marquee');
  if (!marquee) return;
  
  // Remove CSS animation
  marquee.style.animation = 'none';
  
  // Get the width of one content block
  const firstContent = marquee.querySelector('.marquee-content');
  if (!firstContent) return;
  
  // Wait for layout to be ready
  const getContentWidth = () => {
    return firstContent.offsetWidth || firstContent.getBoundingClientRect().width;
  };
  
  const speed = 0.2; // pixels per frame (adjust for speed)
  let position = 0;
  let contentWidth = getContentWidth();
  
  // Update width on resize
  window.addEventListener('resize', () => {
    contentWidth = getContentWidth();
  });
  
  // Animation loop
  function animate() {
    // Move the marquee
    position -= speed;
    
    // When we've scrolled one full content width, reset seamlessly
    // Since we have 3 duplicates, when the first one is completely off-screen,
    // the second duplicate is in the exact same visual position
    // So we can reset to 0 without any visible jump
    if (position <= -contentWidth) {
      // Reset to 0 - the next duplicate is already in the same position
      position = 0;
    }
    
    // Apply transform
    marquee.style.transform = `translateX(${position}px)`;
    
    // Continue animation
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
}

/***************************************************************************/
/* CUSTOM CURSOR */
/***************************************************************************/
function initCustomCursor() {
  // Only initialize on desktop (not mobile)
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = new CustomCursor();
    window._customCursor = cursor; // Store for cleanup if needed
  }
}

/***************************************************************************/
/* WEBGL HOVER EFFECTS */
/***************************************************************************/
function initWebGLEffects() {
  // Wait for images to load
  window.addEventListener('load', () => {
    // Initialize WebGL effect on marquee photos
    const photoImages = document.querySelectorAll('.marquee-photo img');
    photoImages.forEach((img) => {
      // Only initialize if image has loaded
      if (img.complete && img.naturalHeight !== 0) {
        initWebGLEffect(img);
      } else {
        img.addEventListener('load', () => {
          initWebGLEffect(img);
        });
      }
    });
    
    // Initialize WebGL effect on header logo
    const logoImage = document.querySelector('.header-logo .logo-symbol');
    if (logoImage && logoImage.tagName === 'IMG') {
      if (logoImage.complete && logoImage.naturalHeight !== 0) {
        initWebGLEffect(logoImage);
      } else {
        logoImage.addEventListener('load', () => {
          initWebGLEffect(logoImage);
        });
      }
    }
  });
}

function initWebGLEffect(img) {
  try {
    // Make parent container relative positioned if not already
    const container = img.parentElement;
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    
    // Initialize WebGL effect
    const effect = new WebGLHoverEffect(img, {
      intensity: 0.8, // Higher intensity for more colorful edges
      color: new THREE.Color(0x01FF89) // Not used but kept for compatibility
    });
    
    // Store reference for cleanup if needed
    img._webglEffect = effect;
  } catch (error) {
    console.warn('WebGL effect initialization failed:', error);
    // Fallback: show image normally
    img.style.opacity = '1';
  }
}

