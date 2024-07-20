export default class Stopwatch {
  constructor() {
    this.intervalID = undefined
    this.interval = 10 // 1000
    this.allTimers = []
    this.temp = []
    this.index = 0
    this.elapsedTime = 0
    this.seconds = "00:00:00"
    this.category = ["Swimming", "Biking", "Running"]

    this.timerState = false
  }

  altButton() {
    let newState = !this.timerState
    this.timerState = newState
  }

  init() {
      this.altButton()
        if (this.timerState) {
          this.button = "Pause"
          this.seconds = this.start()
        }
        else {
          this.button = "Play"
          this.seconds = this.pause()
        }

    let currentSport = this.category[this.index]
    let complete = this.index  === 3

    return ({
      buttonMode: this.button,
      active: this.timerState,
      elapsed: this.seconds,
      complete: !complete,
      category:currentSport
    })
  }

  cache() {
    let timeSet = new Set()
    let seconds = this.init()
    let duration = seconds.elapsed
    let category = this.category[this.index]
    let complete = this.index === 3
    
    this.allTimers.push({category:category, duration: duration})

    timeSet.add({
      category: category,
      time: duration,
      complete: complete,
      buttonMode: "Pause"
    })
    
    if (complete) {
      this.clear()
      this.index = 0

    } else {
      this.index++
    }
    this.elapsedTime = 0
    let output = this.cacheTime(timeSet)

    return output
  }

  cacheTime(timeSet) {
    for(const item of timeSet) {
      this.temp.push(item)
    }
    return this.temp
  }

  clear() {
    clearInterval(this.intervalID)
    this.allTimers = []
    this.temp = []
    let output = this.formatTime(0)
    return output
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
        // this.nonexistentFunc(),
        this.elapsedTime++
        resolve(this.elapsedTime)
      } catch (error) {
        let type =  typeof error
        let message = error.message
        let errorMessage = `ERROR [${type}]: ${message}`
        alert(errorMessage)
        reject(error)
        this.elapsedTime = 0
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
    let output = this.clear()
    this.seconds = this.elapsedTime
    this.index = 0
    this.setOutput("#interval_output", output)
    this.button = "Play"
    setTimeout(() => {
      alert('Timer reset.')
    }, 1000)
    
    let currentSport = this.category[this.index]
    return ({buttonMode:this.button, active:false, elapsed: this.seconds, currentSport: currentSport, complete:true})
  }

  pause() {
    clearInterval(this.intervalID)
    let output = this.formatTime(this.elapsedTime)
    return output
  }


}