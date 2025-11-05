/***************************************************************************/
/* CUSTOM CURSOR - Based on Codrops Custom Cursor Tutorial */
/***************************************************************************/

export class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorFollower = null;
    this.mouse = { x: 0, y: 0 };
    this.follower = { x: 0, y: 0 };
    this.isHovering = false;
    this.highlightedText = null;
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    // Create cursor elements
    this.createCursor();
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Initialize mouse position
    this.mouse.x = window.innerWidth / 2;
    this.mouse.y = window.innerHeight / 2;
    this.follower.x = this.mouse.x;
    this.follower.y = this.mouse.y;
    
    // Set initial position
    this.cursor.style.left = `${this.mouse.x}px`;
    this.cursor.style.top = `${this.mouse.y}px`;
    this.cursorFollower.style.left = `${this.follower.x}px`;
    this.cursorFollower.style.top = `${this.follower.y}px`;
    
    // Event listeners
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    // Handle text highlights
    this.initTextHighlights();
    
    // Animation loop
    this.animate();
  }
  
  createCursor() {
    // Main cursor (small dot)
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    // Set only essential positioning styles - let CSS handle sizing/colors
    this.cursor.style.cssText = `
      position: fixed !important;
      pointer-events: none !important;
      z-index: 99999 !important;
      opacity: 1 !important;
      display: block !important;
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(this.cursor);
    
    // Follower cursor (magnetic circle)
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'custom-cursor-follower';
    // Set only essential positioning styles - let CSS handle sizing/colors
    this.cursorFollower.style.cssText = `
      position: fixed !important;
      pointer-events: none !important;
      z-index: 99998 !important;
      opacity: 0.6 !important;
      display: block !important;
      background: transparent !important;
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(this.cursorFollower);
  }
  
  initTextHighlights() {
    const highlights = document.querySelectorAll('.cursor-highlight');
    
    highlights.forEach(highlight => {
      highlight.addEventListener('mouseenter', () => {
        this.isHovering = true;
        this.highlightedText = highlight.getAttribute('data-text');
        this.cursor.classList.add('cursor-hover');
        this.cursorFollower.classList.add('cursor-follower-hover');
        
        // Highlight the text
        highlight.classList.add('text-highlighted');
      });
      
      highlight.addEventListener('mouseleave', () => {
        this.isHovering = false;
        this.highlightedText = null;
        this.cursor.classList.remove('cursor-hover');
        this.cursorFollower.classList.remove('cursor-follower-hover');
        
        // Remove highlight
        highlight.classList.remove('text-highlighted');
      });
    });
  }
  
  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    
    // Update main cursor position immediately (centered)
    this.cursor.style.left = `${this.mouse.x}px`;
    this.cursor.style.top = `${this.mouse.y}px`;
  }
  
  animate() {
    // Smooth follower movement (magnetic effect)
    const ease = 0.15;
    this.follower.x += (this.mouse.x - this.follower.x) * ease;
    this.follower.y += (this.mouse.y - this.follower.y) * ease;
    
    // Apply to follower (centered)
    this.cursorFollower.style.left = `${this.follower.x}px`;
    this.cursorFollower.style.top = `${this.follower.y}px`;
    
    requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    document.body.style.cursor = '';
    if (this.cursor) this.cursor.remove();
    if (this.cursorFollower) this.cursorFollower.remove();
  }
}

