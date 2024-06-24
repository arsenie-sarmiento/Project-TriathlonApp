import Athlete from './athlete.js'

export default class Triathlon {
	constructor(
		db,
		newEventDate = new Date(),
		newLocation = 'Unknown',
		newDistance = {swim:3.5, run:10.0, bike:80.0,},
	) {
		this.db = db
		this.allMyAthletes = []
		this.date = newEventDate
		this.location = newLocation
		this.distance = newDistance
		this.replaceContainer = {}
		this.cacheOldVal = {}
	}

	editAthlete(data) {
		for (const key in data) {
			this.replaceContainer[key] = data[key]
		}
		this.checkCompleteObject()
	}

	checkCompleteObject() {
		let data = this.replaceContainer
		if (Object.keys(data).length === 3) {
			let targetId = this.replaceContainer['id']
			let targetField = data['field']
			let newValue = data['value']
			this.replaceAthlete(targetId, targetField, newValue)
		}
	}

	replaceAthlete(targetId, targetField, newValue) {
		let targetAthlete = this.findAthlete(targetId)
		this.cacheOldVal['field'] = targetField
		this.saveToDatabase(targetAthlete)
		targetAthlete[targetField] = newValue
		this.saveToLocalStorage(targetAthlete)
	}

	getDatabaseEntry(callback) {
		return this.db.getAllAthletes(callback)
	}

	deleteDatabase(name) {
		this.db.deleteDatabase(name)
	}

	// getDatabaseEntry() {
	// 	return this.db.getAllAthletes.bind(this.db)
	// }

	// getDatabaseEntry = (callback) => {
	// 	console.log(this.db.getAllAthletes((callback)))
	// 	// return this.db.getAllAthletes((callback))
	// }
	// applyChange(data) {
	// 	let id = data.id
	// 	let field = data.field
	// 	let value = data.value
	// 	this.replaceAthlete(id, field, value)
	// }

	addAthlete(data) {
		let newId = data.id
		let newFirstName = data.firstName 
		let newLastName = data.lastName
		let newSwim = data.swimTime
		let newRun = data.runTime
		let newBike = data.bikeTime
		let newSpeed = this.calculateSpeed(this.timeToHours(newSwim), this.timeToHours(newRun), this.timeToHours(newBike))
		let newAthlete = new Athlete(newId, newFirstName, newLastName, newSwim, newRun, newBike, newSpeed)
		this.allMyAthletes.push(newAthlete)
	}

	handleForm(form,timers) {
		const data = new FormData(form)
		const store = timers
		store.forEach((item) => {
			let time = item.time
			let category = item.category
			data.append(category, time)
		})

		let result = this.compile(data)
		return result
	}

	compile(data) {
		let newAthleteData = {}
		data.forEach((value, headers) => {
			newAthleteData[headers] = value
		})
		return newAthleteData
	}

	deleteAthlete(targetId) {
		localStorage.removeItem(targetId)
		this.allMyAthletes.splice(targetId)
		setTimeout(() => {
			alert('Athlete has been removed from storage and database.')
    }, 1000)
	}

	calculateTotalSpeed(speedArray) {
		let result = speedArray.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
		result = parseFloat(result.toFixed(2))
		return result
	}

	calculateSpeed(swim, run, bike) {
		let swimSpeed = (this.distance.swim/swim).toFixed(2)
		let runSpeed = (this.distance.run/run).toFixed(2)
		let bikeSpeed = (this.distance.bike/bike).toFixed(2)
		let result = this.calculateTotalSpeed([swimSpeed, runSpeed, bikeSpeed])
		return result
	}

	timeToSeconds(duration) {
		let time = duration.split(':')
		let hours = parseInt(time[0])
		let minutes = parseInt(time[1])
		let seconds = parseInt(time[2])
		let totalSeconds = (hours * 3600) + (minutes * 60) + seconds
		return totalSeconds
	}

	// Converts 00:00:00 seconds format into float
	timeToHours(duration) {
		let [hours, minutes, seconds] = duration.split(':')
		let totalHours = parseInt(hours)
		let totalMinutes = parseInt(minutes) / 60
		let totalSeconds = parseInt(seconds) / 3600
		return totalHours + totalMinutes + totalSeconds
	}

	generateKey() {
		return Math.random().toString(36).substring(2,4).toUpperCase()
	}

	saveToDatabase(athlete) {
		this.cacheOldVal['key'] = `${this.generateKey()}-${athlete.id}`
		athlete['athleteKey'] = this.cacheOldVal.key
		this.db.storeAthlete(athlete)
	}

	saveToLocalStorage(athlete) {
		let key = athlete.id
		localStorage.setItem(key, JSON.stringify(athlete))
    }

	saveToStorage(data) {
		this.saveToLocalStorage(data)
		this.allMyAthletes = []
	}
	
    loadFromLocalStorage() {
		let allMyAthletes = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)))
        return allMyAthletes
    }

	calculateAvgDuration(storage, athleteCount) {
		let sum = {swim:0, run:0, bike:0}
		let average = {swim:0, run:0, bike:0}
		for (const entryIndex in {...storage}) {
			let athlete = storage[entryIndex]
			sum.swim += this.timeToSeconds(athlete.swimTime)
			sum.run += this.timeToSeconds(athlete.runTime)
			sum.bike += this.timeToSeconds(athlete.bikeTime)
		}
		const divisor = athleteCount || 1
		average.swim = (sum.swim / divisor).toFixed(2)
		average.run = (sum.run / divisor).toFixed(2)
		average.bike = (sum.bike / divisor).toFixed(2)

		return average
	}
	
	//* FINDING BY ID
	findAthlete(query) {
		let foundAthlete = null
		let storedData = this.loadFromLocalStorage()
		for (const entryIndex in {...storedData}) {
			let entry = storedData[entryIndex]
				if (entry['id'] === query) {
					foundAthlete = entry
				}
			}
		return foundAthlete
	}
}
