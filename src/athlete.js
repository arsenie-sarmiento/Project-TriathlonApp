/* eslint-env es6 */
/* eslint quotes: ["error", "single"] */
/* eslint semi: ["error", "never"] */
/* globals */

export default class Athlete {
	constructor(newId, newFirstName, newLastName, newAge, newSwimmingDuration = 0.0, newRunningDuration = 0.0, newCyclingDuration = 0.0, theTriathlon) {
		this.id = newId
		this.firstname = newFirstName
		this.lastname = newLastName
        this.age = newAge
		this.swimTime = newSwimmingDuration
		this.runTime = newRunningDuration
		this.bikeTime = newCyclingDuration
		this.speed = 0.0         
		this.myTriathlon = theTriathlon
		this.selectSaveChanges = false
	}

    toString() {
        let result = `[Athlete No.${this.id}] ${this.firstname} ${this.lastname}\n`
        result += `Age: ${this.age} Speed: ${this.calculateSpeedKph()} kph\n`
		result += `Swimming - ${this.swimTime} hours\n`
		result += `Running - ${this.runTime} hours\n`
		result += `Cycling - ${this.bikeTime} hours`
        return result
	}

	// Converting duration seconds into hours
	calculateTotalDuration() {
		const durationHr = (this.swimTime + this.runTime + this.bikeTime)
		return durationHr
	}

	// Calculate speed to kph
	calculateSpeedKph() {
		const distanceKm = 93.5
		const durationHr = this.calculateTotalDuration()
		this.speed =  parseFloat((distanceKm / durationHr).toFixed(2))
		return this.speed
	}

	editAthleteData(targetFieldToUpdate, newValue) {
		let edittedData = {}
		const fieldOptions = ['firstname','lastname','age']

		if (typeof targetFieldToUpdate !== 'string') {
			throw new Error('Field must be a string')
		}

		if (typeof newValue !== 'string' && targetFieldToUpdate !== 'age') {
			throw new Error('New value must be a string')
		}

		// Field is not in the list of options
		if(!fieldOptions.includes(targetFieldToUpdate)) {
			throw new Error('Invalid field to update')
		}

		// No errors found
		edittedData[targetFieldToUpdate] = newValue
		return edittedData
    }

    saveChanges(decision, targetFieldToUpdate, newValue) {
		let result
        if (decision) {
            const edittedData = this.editAthleteData(targetFieldToUpdate, newValue)
            for (const [key,value] of Object.entries(edittedData)) {
                this[key] = value
            }
            this.selectSaveChanges = true
			result = this
        } else {
            result = this.revertChanges()
        }
		return result
    }

    revertChanges() {
        this.firstname = this.firstname
        this.lastname = this.lastname
        this.age = this.age

		return this
    }
}
