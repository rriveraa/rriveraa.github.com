/***************************************************************************/
/* MODERN JAVASCRIPT - No jQuery! */
/***************************************************************************/
import { WebGLHoverEffect } from './webgl-effect.js';
import * as THREE from 'three';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initFullscreenHeader();
  initMarqueeLoop();
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
/* MARQUEE SEAMLESS LOOP */
/***************************************************************************/
function initMarqueeLoop() {
  const marquee = document.querySelector('.marquee');
  if (!marquee) return;
  
  // Listen for animation iteration to reset position seamlessly
  marquee.addEventListener('animationiteration', () => {
    // Reset transform to 0 without visible jump
    // Since we have 3 duplicates, when animation completes at -33.333%,
    // the next duplicate is already in position, so we can reset to 0
    requestAnimationFrame(() => {
      marquee.style.transform = 'translateX(0)';
    });
  });
}

/***************************************************************************/
/* WEBGL HOVER EFFECTS */
/***************************************************************************/
function initWebGLEffects() {
  // Wait for images to load
  window.addEventListener('load', () => {
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

