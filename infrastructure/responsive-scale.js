// Responsive Scale - Living skin framework with elastic safety margins
// Adapts seamlessly across all screen sizes with gravitational scaling

export class ResponsiveScale {
  constructor(canvas) {
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.diagonal = Math.sqrt(this.width ** 2 + this.height ** 2)
    
    // Base unit: 1% of screen diagonal (gravitational anchor)
    this.unit = this.diagonal / 100
    
    // Safety margins - elastic bands that compress/expand
    this.safeArea = this.calculateSafeArea()
    
    // Text scales - modular gravitational steps
    this.text = {
      tiny: Math.round(this.unit * 1.2),      // ~12px on 1000px diagonal
      small: Math.round(this.unit * 1.6),     // ~16px
      medium: Math.round(this.unit * 2.4),    // ~24px
      large: Math.round(this.unit * 4),       // ~40px
      huge: Math.round(this.unit * 6)         // ~60px
    }
    
    // Spacing scales - breathable margins
    this.spacing = {
      tight: Math.round(this.unit * 0.8),     // ~8px
      normal: Math.round(this.unit * 1.6),    // ~16px
      loose: Math.round(this.unit * 3.2),     // ~32px
      spacious: Math.round(this.unit * 4.8)   // ~48px
    }
    
    // Touch targets - minimum 44px for accessibility
    this.touch = {
      minimum: Math.max(44, this.unit * 4.4),
      comfortable: Math.max(56, this.unit * 5.6)
    }
    
    // Detect device class
    this.device = this.classifyDevice()
    
    // Apply device-specific adjustments
    this.applyDeviceAdjustments()
  }
  
  calculateSafeArea() {
    // Elastic safe margins based on screen size
    const minMargin = 16  // absolute minimum
    const baseMargin = this.unit * 2  // 2% of diagonal
    
    // Compress margins on small screens, expand on large
    const horizontalMargin = Math.max(minMargin, Math.min(baseMargin, this.width * 0.05))
    const verticalMargin = Math.max(minMargin, Math.min(baseMargin, this.height * 0.05))
    
    return {
      left: horizontalMargin,
      right: this.width - horizontalMargin,
      top: verticalMargin,
      bottom: this.height - verticalMargin,
      width: this.width - (horizontalMargin * 2),
      height: this.height - (verticalMargin * 2)
    }
  }
  
  classifyDevice() {
    const aspectRatio = this.width / this.height
    const isPortrait = this.height > this.width
    const area = this.width * this.height
    
    // Device classification based on real-world breakpoints
    if (this.width <= 480) {
      return { type: 'phone-small', isPortrait, aspectRatio, density: 'compact' }
    } else if (this.width <= 768) {
      return { type: 'phone-large', isPortrait, aspectRatio, density: 'normal' }
    } else if (this.width <= 1024) {
      return { type: 'tablet', isPortrait, aspectRatio, density: 'comfortable' }
    } else if (this.width <= 1920) {
      return { type: 'desktop', isPortrait, aspectRatio, density: 'spacious' }
    } else {
      return { type: 'desktop-large', isPortrait, aspectRatio, density: 'expansive' }
    }
  }
  
  applyDeviceAdjustments() {
    // Fine-tune for specific device classes
    const multipliers = {
      'phone-small': 1.1,    // Slightly larger text on small phones
      'phone-large': 1.0,
      'tablet': 1.05,
      'desktop': 1.0,
      'desktop-large': 1.1   // Scale up on huge monitors
    }
    
    const mult = multipliers[this.device.type] || 1.0
    
    // Apply multiplier to text scales
    Object.keys(this.text).forEach(key => {
      this.text[key] = Math.round(this.text[key] * mult)
    })
  }
  
  // Utility: Convert grid coordinates to pixels with safety margin
  gridToPixels(gridX, gridY, cellSize) {
    return {
      x: this.safeArea.left + (gridX * cellSize),
      y: this.safeArea.top + (gridY * cellSize)
    }
  }
  
  // Utility: Check if point is within safe area
  isInSafeArea(x, y) {
    return x >= this.safeArea.left &&
           x <= this.safeArea.right &&
           y >= this.safeArea.top &&
           y <= this.safeArea.bottom
  }
  
  // Utility: Clamp value to safe area bounds
  clampToSafeArea(x, y) {
    return {
      x: Math.max(this.safeArea.left, Math.min(this.safeArea.right, x)),
      y: Math.max(this.safeArea.top, Math.min(this.safeArea.bottom, y))
    }
  }
  
  // Utility: Get optimal cell size for grid games
  optimalCellSize(minCells = 20, maxCells = 40) {
    const availableWidth = this.safeArea.width
    const availableHeight = this.safeArea.height
    
    // Calculate cell size that fits well
    const cellFromWidth = availableWidth / minCells
    const cellFromHeight = availableHeight / minCells
    
    // Use the smaller dimension to ensure fit
    const baseSize = Math.min(cellFromWidth, cellFromHeight)
    
    // Round to nice numbers (20, 25, 30, 40, etc)
    const niceNumbers = [20, 24, 25, 30, 32, 36, 40, 48, 50]
    const closest = niceNumbers.reduce((prev, curr) => 
      Math.abs(curr - baseSize) < Math.abs(prev - baseSize) ? curr : prev
    )
    
    return closest
  }
  
  // Utility: Responsive line width
  lineWidth(base = 1) {
    return Math.max(1, Math.round(this.unit * 0.1 * base))
  }
  
  // Utility: Scale factor relative to 1080p baseline
  scaleFactor() {
    const baseline = 1920 * 1080  // 1080p
    const current = this.width * this.height
    return Math.sqrt(current / baseline)
  }
}
