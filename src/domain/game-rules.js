// Game rules - collision detection, scoring

export class GameRules {
  constructor(gridWidth, gridHeight) {
    this.gridWidth = gridWidth
    this.gridHeight = gridHeight
    this.score = 0
  }

  checkWallCollision(position) {
    return (
      position.x < 0 ||
      position.x >= this.gridWidth ||
      position.y < 0 ||
      position.y >= this.gridHeight
    )
  }

  incrementScore() {
    this.score++
  }

  reset() {
    this.score = 0
  }

  getScore() {
    return this.score
  }
}
