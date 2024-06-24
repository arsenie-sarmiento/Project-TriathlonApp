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
		this.athleteCount = localStorage.length
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

	addAthlete(data) {
		let newId = data.id
		let newFirstName = data.firstName 
		let newLastName = data.lastName
		let newSwim = data.swimTime
		let newRun = data.runTime
		let newBike = data.bikeTime
		let newAthlete = new Athlete(newId, newFirstName, newLastName, newSwim, newRun, newBike, this)
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
		this.incrementBadge()
	}

	getSpeed(targetId) {
		try {
			if (targetId === null) {
				throw new Error("Please specify an athlete ID from the table below.")
			}
			let foundAthlete = null
			let storedData = this.allMyAthletes
			for (const entryIndex in {...storedData}) {
				let entry = storedData[entryIndex]
				if (entry['id'] === targetId) {
					foundAthlete = entry
					break
				}
			}
			return foundAthlete.calculateSpeed()

			} catch(error) {
				console.error(error.message)
				return 0
			}
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
		this.incrementBadge()
    }

	saveToStorage() {
		this.allMyAthletes.forEach((athlete) => {
			athlete["speed"] = athlete.calculateSpeed()
			this.saveToLocalStorage(athlete)
			this.saveToDatabase(athlete)
		})

		this.allMyAthletes = []
	}
	
    loadFromLocalStorage() {
		this.incrementBadge()
		let allMyAthletes = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)))
        return allMyAthletes
    }

	calculateAvgDuration(storage) {
		let sum = {swim:0, run:0, bike:0}
		let average = {swim:0, run:0, bike:0}
		for (const entryIndex in {...storage}) {
			let athlete = storage[entryIndex]
			sum.swim += this.timeToSeconds(athlete.swimTime)
			sum.run += this.timeToSeconds(athlete.runTime)
			sum.bike += this.timeToSeconds(athlete.bikeTime)
		}
		const divisor = this.athleteCount || 1
		average.swim = (sum.swim / divisor).toFixed(2)
		average.run = (sum.run / divisor).toFixed(2)
		average.bike = (sum.bike / divisor).toFixed(2)

		return average
	}

	async incrementBadge() {
      if ("setAppBadge" in navigator && "clearAppBadge" in navigator) {
		try {
          await navigator.setAppBadge(this.athleteCount) // Set the new badge count
        //   console.log("Badge count incremented to:", this.athleteCount)
        } catch (error) {
          console.error("Error updating badge count:", error)
        }
      } else {
        console.warn("Badging API is not supported in this browser.")
      }		
	}
	
	//* FINDING BY ID
	findAthlete(query, type="localStorage") {
		this.incrementBadge()
		let foundAthlete = null
		let storedData
		if (type ==="localStorage") {
			storedData = this.loadFromLocalStorage()
		}

		for (const entryIndex in {...storedData}) {
			let entry = storedData[entryIndex]
			if (entry['id'] === query) {
				foundAthlete = entry
			}
		}
		return foundAthlete
	}
}
