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
    // Create cursor elements
    this.createCursor();
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Event listeners
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
      this.cursorFollower.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.cursorFollower.style.opacity = '0';
    });
    
    // Handle text highlights
    this.initTextHighlights();
    
    // Animation loop
    this.animate();
  }
  
  createCursor() {
    // Main cursor (small dot)
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
    
    // Follower cursor (magnetic circle)
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'custom-cursor-follower';
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
    
    // Update main cursor position immediately
    this.cursor.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
  }
  
  animate() {
    // Smooth follower movement (magnetic effect)
    const ease = 0.15;
    this.follower.x += (this.mouse.x - this.follower.x) * ease;
    this.follower.y += (this.mouse.y - this.follower.y) * ease;
    
    // Apply to follower
    this.cursorFollower.style.transform = `translate(${this.follower.x}px, ${this.follower.y}px)`;
    
    requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    document.body.style.cursor = '';
    if (this.cursor) this.cursor.remove();
    if (this.cursorFollower) this.cursorFollower.remove();
  }
}

