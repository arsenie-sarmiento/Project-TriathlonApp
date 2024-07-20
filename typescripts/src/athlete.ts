interface TriathlonDistance {
	swim: number,
	run: number,
	bike: number,
}

class Athlete {
    public id: string
    public firstName: string
    public lastName: string
    public swimTime: string
    public runTime: string
    public bikeTime: string
    public speed: number
    public distance: TriathlonDistance
	//...
	constructor(
        newId: string,
        newfirstName: string,
        newlastName: string,
        newSwimmingDuration: string,
        newRunningDuration: string,
        newCyclingDuration: string,
        newSpeed: number,
        theTriathlon: TriathlonDistance,
	) {
		this.id = newId
		this.firstName = newfirstName
		this.lastName = newlastName
		this.swimTime = newSwimmingDuration
		this.runTime = newRunningDuration
		this.bikeTime = newCyclingDuration
		this.speed = newSpeed// kph
		this.distance = theTriathlon
	}

	// Converts 00:00:00 seconds format into float
	timeToHours(duration: string): number {
		let [hours, minutes, seconds] = duration.split(':')
		let totalHours = parseInt(hours)
		let totalMinutes = parseInt(minutes) / 60
		let totalSeconds = parseInt(seconds) / 3600
		return totalHours + totalMinutes + totalSeconds
	}

	calculateSpeed(): number {
		let swimDuration: number = this.timeToHours(this.swimTime)
		let runDuration: number =  this.timeToHours(this.runTime)
		let bikeDuration: number = this.timeToHours(this.bikeTime)

		let swimSpeed = (this.distance.swim/swimDuration).toFixed(2)
		let runSpeed = (this.distance.run/runDuration).toFixed(2)
		let bikeSpeed = (this.distance.bike/bikeDuration).toFixed(2)
		let totalSpeed = this.calculateTotalSpeed([parseFloat(swimSpeed), parseFloat(runSpeed), parseFloat(bikeSpeed)])
		return totalSpeed
	}

	calculateTotalSpeed(speedArray: number[]): number {
		let result = speedArray.reduce((a, b) => a + b, 0)
		result = parseFloat(result.toFixed(2))
		return result
	}
}
