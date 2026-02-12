// High score persistence - depends on domain scoring

export class HighScoreRepository {
  constructor() {
    this.storageKey = 'la-snake-high-score'
  }

  get() {
    const stored = localStorage.getItem(this.storageKey)
    return stored ? parseInt(stored, 10) : 0
  }

  save(score) {
    const current = this.get()
    if (score > current) {
      localStorage.setItem(this.storageKey, score.toString())
      return true
    }
    return false
  }

  clear() {
    localStorage.removeItem(this.storageKey)
  }
}
