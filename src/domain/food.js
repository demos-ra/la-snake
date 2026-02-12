// Food entity - spawning logic

export class Food {
  constructor(gridWidth, gridHeight) {
    this.gridWidth = gridWidth
    this.gridHeight = gridHeight
    this.position = this.spawn()
  }

  spawn() {
    return {
      x: Math.floor(Math.random() * this.gridWidth),
      y: Math.floor(Math.random() * this.gridHeight)
    }
  }

  respawn(avoidPositions = []) {
    let newPosition
    let attempts = 0
    
    do {
      newPosition = this.spawn()
      attempts++
    } while (
      attempts < 100 &&
      avoidPositions.some(pos => pos.x === newPosition.x && pos.y === newPosition.y)
    )
    
    this.position = newPosition
    return this.position
  }
}
