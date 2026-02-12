// Snake entity - pure domain logic, zero dependencies

export class Snake {
  constructor(startX = 10, startY = 10) {
    this.segments = [{ x: startX, y: startY }]
    this.direction = { x: 1, y: 0 }
    this.growing = false
  }

  head() {
    return this.segments[0]
  }

  move() {
    const newHead = {
      x: this.head().x + this.direction.x,
      y: this.head().y + this.direction.y
    }
    
    this.segments.unshift(newHead)
    
    if (!this.growing) {
      this.segments.pop()
    }
    this.growing = false
  }

  grow() {
    this.growing = true
  }

  changeDirection(newDirection) {
    const opposite = 
      (this.direction.x === -newDirection.x && this.direction.y === -newDirection.y)
    
    if (!opposite) {
      this.direction = newDirection
    }
  }

  collidesWith(position) {
    return this.head().x === position.x && this.head().y === position.y
  }

  collidesWithSelf() {
    const head = this.head()
    return this.segments.slice(1).some(seg => 
      seg.x === head.x && seg.y === head.y
    )
  }
}
