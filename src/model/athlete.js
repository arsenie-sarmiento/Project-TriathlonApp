export default class Athlete {
	constructor(
		newId,
		newfirstName,
		newlastName,
		newSwimmingDuration = 0.0,
		newRunningDuration = 0.0,
		newCyclingDuration = 0.0,
		newSpeed = 0.0,
	) {
		this.id = newId
		this.firstName = newfirstName
		this.lastName = newlastName
		this.swimTime = newSwimmingDuration
		this.runTime = newRunningDuration
		this.bikeTime = newCyclingDuration
		this.speed = newSpeed
	}
}
