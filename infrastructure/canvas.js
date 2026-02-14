// Canvas rendering - adapts game state to HTML5 canvas

import { ResponsiveScale } from './responsive-scale.js'

export class CanvasRenderer {
  constructor(canvas, gridWidth, gridHeight) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.gridWidth = gridWidth
    this.gridHeight = gridHeight
    this.scale = new ResponsiveScale(canvas)
    
    // Use safe area for actual drawing bounds
    this.cellSize = Math.min(
      this.scale.safeArea.width / gridWidth,
      this.scale.safeArea.height / gridHeight
    )
    
    // Offset for safe area positioning
    this.offsetX = this.scale.safeArea.left
    this.offsetY = this.scale.safeArea.top
    
    this.colors = {
      background: '#000000',
      snake: '#ffffff',
      food: '#00ff41',
      text: '#e0e0e0'
    }
  }

  clear() {
    this.ctx.fillStyle = this.colors.background
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawSnake(segments) {
    segments.forEach((segment, index) => {
      const x = this.offsetX + (segment.x * this.cellSize)
      const y = this.offsetY + (segment.y * this.cellSize)
      
      const opacity = 1 - (index / segments.length) * 0.3
      
      this.ctx.fillStyle = this.colors.snake
      this.ctx.globalAlpha = opacity
      this.ctx.fillRect(x + 2, y + 2, this.cellSize - 4, this.cellSize - 4)
      this.ctx.globalAlpha = 1
    })
  }

  drawFood(position) {
    const x = this.offsetX + (position.x * this.cellSize)
    const y = this.offsetY + (position.y * this.cellSize)
    
    const pulse = 0.85 + Math.sin(Date.now() / 800) * 0.15
    
    this.ctx.globalAlpha = pulse
    this.ctx.fillStyle = this.colors.food
    this.ctx.fillRect(x + 2, y + 2, this.cellSize - 4, this.cellSize - 4)
    this.ctx.globalAlpha = 1
  }

  drawScore(score, highScore) {
    this.ctx.fillStyle = this.colors.text
    this.ctx.font = `bold ${this.scale.text.medium}px monospace`
    this.ctx.shadowBlur = 2
    this.ctx.shadowColor = '#000'
    
    // Top-left with safety margins
    const horizontalMargin = this.scale.spacing.loose
    const verticalMargin = this.scale.spacing.loose * 1.5
    
    this.ctx.fillText(`SCORE: ${score}`, horizontalMargin, verticalMargin)
    this.ctx.fillText(`HIGH: ${highScore}`, horizontalMargin, verticalMargin + this.scale.text.medium * 1.5)
    this.ctx.shadowBlur = 0
  }

  drawGameOver(score, highScore, isNewHighScore) {
    this.ctx.fillStyle = this.colors.text
    this.ctx.font = `bold ${this.scale.text.large}px monospace`
    this.ctx.textAlign = 'center'
    this.ctx.shadowBlur = 3
    this.ctx.shadowColor = '#000'
    
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2
    const lineHeight = this.scale.text.large * 1.5
    
    this.ctx.fillText('GAME OVER', centerX, centerY - lineHeight)
    this.ctx.font = `bold ${this.scale.text.medium}px monospace`
    this.ctx.fillText(`SCORE: ${score}`, centerX, centerY + this.scale.spacing.normal)
    if (isNewHighScore) {
      this.ctx.fillText('NEW HIGH SCORE!', centerX, centerY + lineHeight)
    }
    this.ctx.fillText('TAP TO RESTART', centerX, centerY + lineHeight * 2)
    
    this.ctx.shadowBlur = 0
    this.ctx.textAlign = 'left'
  }
}
