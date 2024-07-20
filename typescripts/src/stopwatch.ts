export default class Stopwatch {
    public intervalID: any | undefined
    public interval: number
    public allTimers: { category: string; duration: string }[]
    public temp: { category: string; time: string; complete: boolean }[]
    public index: number
    public elapsedTime: number
    public seconds: string
    public category: string[]
    public timerState: boolean
    public button: string
    
    constructor() {
        this.intervalID = undefined
        this.interval = 10 // 1000
        this.allTimers = []
        this.temp = []
        this.index = 0
        this.elapsedTime = 0
        this.category = ["Swimming", "Biking", "Running"]
        this.timerState = false
        this.seconds = "00:00:00"
        this.button = "Play"
    }

    altButton(): void {
        let newState: boolean = !this.timerState
        this.timerState = newState
    }
    
    init(): object {
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

    cache(): {category:string; duration: string}[] {
        let timeSet = new Set()
        
        timeSet.add({
            category: this.category[this.index],
            time: this.seconds,
            complete: this.index === 3,
            buttonMode: "Pause"
        })
        
        if (complete) {
            this.clear()
            this.index = 0
            
        } else {
            this.index++
        }
        const {a, b} = timeSet 
        this.allTimers.push({category:a, duration: b})
        this.temp.push(timeSet)
        
        return this.temp
    }

    start() {
        clearInterval(this.intervalID)
        this.intervalID = setInterval((): void => {
            this.incrementTimer()
            .then((elapsed) => {
                this.setOutput("#interval_output",this.formatTime(elapsed))
            })
            .catch(error => {
                throw new Error(`Time increment error: ${error.message}`)
            })
        }, this.interval)
        }

        incrementTimer(): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
            this.elapsedTime++
                resolve(this.elapsedTime)
            } catch (error) {
                reject(error)
            }
        })
    }

    formatTime(seconds: number): string {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60
        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(remainingSeconds)}`
    }
    
    pad(value: number): string {
    return String(value).padStart(2, '0')
    }

    setOutput(tag: string, outputContent: string): void {
        const element = document.querySelector(tag) as HTMLCanvasElement
        if(element) {
            element.innerHTML = outputContent
        }
    }

    reset(): object {
        let output = this.clear()
        this.seconds = this.formatTime(this.elapsedTime)
        this.index = 0
        this.setOutput("#interval_output", output)
        this.button = "Play"
        let currentSport = this.category[this.index]
        return ({buttonMode:this.button, active:false, elapsed: this.seconds, currentSport: currentSport, complete:true})//currentSport:currentSport
    }

    pause(): void {
        clearInterval(this.intervalID)
        this.seconds = this.formatTime(this.elapsedTime)
    }
    
}