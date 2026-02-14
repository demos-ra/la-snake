// Game loop - orchestrates domain + database

import { Snake } from '../domain/snake.js'
import { Food } from '../domain/food.js'
import { GameRules } from '../domain/game-rules.js'
import { HighScoreRepository } from '../database/high-scores.js'

export class GameLoop {
  constructor(gridWidth, gridHeight, keyboard, onUpdate, onGameOver) {
    this.gridWidth = gridWidth
    this.gridHeight = gridHeight
    this.keyboard = keyboard
    this.onUpdate = onUpdate
    this.onGameOver = onGameOver
    
    this.snake = new Snake(Math.floor(gridWidth / 2), Math.floor(gridHeight / 2))
    this.food = new Food(gridWidth, gridHeight)
    this.rules = new GameRules(gridWidth, gridHeight)
    this.highScores = new HighScoreRepository()
    
    this.running = false
    this.intervalId = null
    this.baseSpeed = 150
    this.currentSpeed = 150
  }

  start() {
    this.running = true
    this.tick()
  }

  tick() {
    if (!this.running) return
    
    const bufferedInput = this.keyboard?.getBufferedInput()
    if (bufferedInput) this.snake.changeDirection(bufferedInput)
    
    this.snake.move()
    
    if (this.rules.checkWallCollision(this.snake.head()) || this.snake.collidesWithSelf()) {
      this.gameOver()
      return
    }
    
    if (this.snake.collidesWith(this.food.position)) {
      this.snake.grow()
      this.rules.incrementScore()
      this.food.respawn(this.snake.segments)
      
      this.currentSpeed = Math.max(90, this.currentSpeed - 3)
    }
    
    this.onUpdate({
      snake: this.snake.segments,
      food: this.food.position,
      score: this.rules.getScore()
    })
    
    setTimeout(() => this.tick(), this.currentSpeed)
  }

  gameOver() {
    this.running = false
    
    const finalScore = this.rules.getScore()
    const isHighScore = this.highScores.save(finalScore)
    
    this.onGameOver({
      score: finalScore,
      highScore: this.highScores.get(),
      isNewHighScore: isHighScore
    })
  }

  changeDirection(direction) {
    this.snake.changeDirection(direction)
  }

  reset() {
    this.snake = new Snake(Math.floor(this.gridWidth / 2), Math.floor(this.gridHeight / 2))
    this.food = new Food(this.gridWidth, this.gridHeight)
    this.rules.reset()
    this.currentSpeed = 150
    this.running = false
  }
}