/***************************************************************************/
/* MODERN JAVASCRIPT - No jQuery! */
/***************************************************************************/

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initFullscreenHeader();
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

