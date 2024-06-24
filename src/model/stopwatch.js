// import Duration from './duration.js'

export default class Stopwatch {
  constructor() {
    // this.child = duration
    this.reset()
    this.intervalID = undefined
    this.elapsedTime = 0
    this.interval = 10 // 1000
    this.allCacheDuration = []
  }

  start() {
      clearInterval(this.intervalID)
      this.intervalID = setInterval(() => {
        this.incrementTimer()
        .then(
          this.setOutput("#interval_output", `${this.formatTime(this.elapsedTime)}`)
        )
        .catch(error => {
          throw new Error(`Time increment error: ${error.message}`)
        })
      }, this.interval)
      return `${this.formatTime(this.elapsedTime)}`
  }

  incrementTimer() {
      return new Promise((resolve, reject) => {
          try {
            this.elapsedTime++
              resolve(this.elapsedTime)
          } catch (error) {
              reject(error)
          }
      })
  }

  formatTime(seconds) {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const remainingSeconds = seconds % 60
      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(remainingSeconds)}`
  }
  
  pad(value) {
  return String(value).padStart(2, '0')
  }

  setOutput(tag, outputContent) {
  document.querySelector(tag).innerHTML = outputContent
  }

  reset() {
      clearInterval(this.intervalID)
      this.elapsedTime = 0
      this.allCacheDuration = []
      let output = this.formatTime(this.elapsedTime)
    return output
  }

  pause() {
    clearInterval(this.intervalID)
    let output = this.formatTime(this.elapsedTime)
    return output
  }

  cacheTime(tempTime) {
    this.allCacheDuration.push(tempTime)
    return this.allCacheDuration
  }
}