export default class Athlete {
	constructor(
		newId,
		newfirstName,
		newlastName,
		newSwimmingDuration,
		newRunningDuration,
		newCyclingDuration,
		theTriathlon
	) {
		this.id = newId
		this.firstName = newfirstName
		this.lastName = newlastName
		this.swimTime = newSwimmingDuration
		this.runTime = newRunningDuration
		this.bikeTime = newCyclingDuration
		this.speed = 0.0 // kph
		this.distance = theTriathlon.distance
	}

	// Converts 00:00:00 seconds format into float
	timeToHours(duration) {
		let [hours, minutes, seconds] = duration.split(':')
		let totalHours = parseInt(hours)
		let totalMinutes = parseInt(minutes) / 60
		let totalSeconds = parseInt(seconds) / 3600
		return totalHours + totalMinutes + totalSeconds
	}

	calculateSpeed() {
		let swim = this.timeToHours(this.swimTime)
		let run =  this.timeToHours(this.runTime)
		let bike = this.timeToHours(this.bikeTime)

		let swimSpeed = (this.distance.swim/swim).toFixed(2)
		let runSpeed = (this.distance.run/run).toFixed(2)
		let bikeSpeed = (this.distance.bike/bike).toFixed(2)
		let result = this.calculateTotalSpeed([swimSpeed, runSpeed, bikeSpeed])
		return result
	}

	calculateTotalSpeed(speedArray) {
		let result = speedArray.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
		result = parseFloat(result.toFixed(2))
		return result
	}
}
