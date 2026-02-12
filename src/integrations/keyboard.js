// Keyboard input handler with buffering

export class KeyboardHandler {
  constructor(onDirectionChange, onRestart) {
    this.onDirectionChange = onDirectionChange
    this.onRestart = onRestart
    this.inputBuffer = null
    
    this.directions = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }
    }
    
    this.setupListeners()
  }

  setupListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        this.onRestart()
        return
      }
      
      if (this.directions[e.code]) {
        e.preventDefault()
        this.inputBuffer = this.directions[e.code]
      }
    })
  }

  getBufferedInput() {
    const input = this.inputBuffer
    this.inputBuffer = null
    return input
  }
}