import Athlete from './athlete.ts'

export default class Triathlon extends Athlete {
    public db: any
    public newEventDate: Date
    public newLocation: string
    public newDistance: { swim: number, run:number, bike:number }//
    public athleteCount: number
    public allMyAthletes: any[]
    private allKeys: any[]
    private replaceContainer: { [key:string]: any }
    private cacheOldVal: { [key:string]: any }

    constructor(
        db: any,
        newEventDate: Date = new Date(),
        newLocation: string,
        newDistance: {swim: number, run: number, bike: number} = {swim: 3.5, run: 10.0, bike: 80.0,}
    ) {
        super()
		this.db  = db,
		this.newEventDate = newEventDate,
		this.newLocation = newLocation,
		this.newDistance = newDistance
		this.athleteCount = localStorage.length
		this.allMyAthletes = []
		this.allKeys = []
		this.replaceContainer = {}
		this.cacheOldVal = {}
    }
    // public athleteCount: number
    editAthlete(data: {[key: string]: any }): void {
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {}
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

    replaceAthlete(targetId: string, targetField: string, newValue: any): void {
		let targetAthlete: any[]= this.findAthlete(targetId)
		this.cacheOldVal['field'] = targetField
		this.saveToDatabase(targetAthlete)
		targetAthlete[targetField] = newValue
		this.saveToLocalStorage(targetAthlete)
	}
	getDatabaseEntry(callback: any) {
		return this.db.getAllAthletes(callback)
	}

	deleteDatabase(name: string) {
		this.db.deleteDatabase(name)
	}

	addAthlete(data: any) {
		let newId = data.id
		let newFirstName = data.firstName 
		let newLastName = data.lastName
		let newSwim = data.Swimming
		let newRun = data.Running
		let newBike = data.Biking
		let newAthlete = new Athlete(this, newId, newFirstName, newLastName, newSwim, newRun, newBike)
		this.allMyAthletes.push(newAthlete)
	}

	handleForm(form: any[], timers: string | number[]) {
		const data = new FormData(form)
		const store = timers
		store.forEach((item: any[]) => {
			let time: number = item.duration
			let category: string = item.category
			data.append(category, time)
		})
		let result = this.compile(data)
		return result
	}

	sortAllAthletes(arrayToSort: any, order: any, direction: any) {
		return arrayToSort.sort((a: any, b: any) => {
			if (direction === 'asc') {
				return a[order.keyToSort] >  b[order.keyToSort] ? 1 : -1
			} else{
				return a[order.keyToSort] >  b[order.keyToSort] ? -1 : 1
			}
		})
	}

	compile(data: any) {
		let newAthleteData = {}
		data.forEach((value: string, headers: string) => {
			newAthleteData[headers] = value
		})
		return newAthleteData
	}

	deleteAthlete(targetId: string) {
		localStorage.removeItem(targetId)
		this.allMyAthletes.splice(targetId)
		setTimeout(() => {
			alert('Athlete has been removed from storage and database.')
		}, 1000)
		this.incrementBadge()
	}

	getSpeed(targetId:string): number {
		try {
			if (targetId === null) {
				throw new Error("Please specify an athlete ID from the table below.")
			}
			let foundAthlete: any = null
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
			let message =`${error.message}`
			type message = string
			console.error(message)
			return 0
		}
	}

	timeToSeconds(duration: string) {
		let time = duration.split(':')
		let hours = parseInt(time[0])
		let minutes = parseInt(time[1])
		let seconds = parseInt(time[2])
		let totalSeconds = (hours * 3600) + (minutes * 60) + seconds
		return totalSeconds
	}

	// Converts 00:00:00 seconds format into float
	timeToHours(duration: string) {
		let [hours, minutes, seconds] = duration.split(':')
		let totalHours = parseInt(hours)
		let totalMinutes = parseInt(minutes) / 60
		let totalSeconds = parseInt(seconds) / 3600
		return totalHours + totalMinutes + totalSeconds
	}

	generateKey() {
		let newKey = Math.random().toString(36).substring(2,4).toUpperCase()
		let keyIsUnique = (storedKey: string) => storedKey !== newKey
		if (this.allKeys.every(keyIsUnique)){
			this.allKeys.push(newKey)
		}
		return newKey
	}

	saveToDatabase(athlete: any[]) {
		let targetID  = athlete.id
		let keyPattern = `${this.generateKey()}-${targetID}`
		this.cacheOldVal['key'] = keyPattern
		let key: string  = this.cacheOldVal.key
		type key = string
		let athleteKey= new Map()
		athleteKey.set('athleteKey', key)
		this.db.storeAthlete(athleteKey)
	}

	saveToLocalStorage(athlete: any) {
		let key = athlete.id
		console.log(this.findAthlete(key))
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
	
    loadFromLocalStorage(): any[] {
		this.incrementBadge()
		let allMyAthletes: any[] = Object.keys(localStorage).map((key) => {
			JSON.parse(localStorage.getItem(key) || '')
			}
		)
        return allMyAthletes
    }

	calculateAvgDuration(storage: any[]): {swim: number, run: number, bike: number} {
		let sum = {swim:0, run:0, bike:0}

		storage.map((athlete: any) => {
			sum.swim += this.timeToSeconds(athlete.run)
			sum.run += this.timeToSeconds(athlete.run)
			sum.bike += this.timeToSeconds(athlete.bike)
		})
		
		const divisor = this.athleteCount || 1
		enum Average {
			swim = +(sum.swim / divisor).toFixed(2),
			run = +(sum.run / divisor).toFixed(2),
			bike = +(sum.bike / divisor).toFixed(2)
		}
		let avg = Average

		return avg
	}

	async incrementBadge() {
      if ("setAppBadge" in navigator && "clearAppBadge" in navigator) {
		try {
          await navigator.setAppBadge(this.athleteCount)// Set the new badge count
        } catch (error) {
          console.error("Error updating badge count:", error)
        }
      } else {
        console.warn("Badging API is not supported in this browser.")
      }		
	}
	
	//* FINDING BY ID
	findAthlete(query: any, type="localStorage") {
		this.incrementBadge()
		let foundAthlete = null
		let storedData = null
		if (type ==="localStorage") {
			storedData = this.loadFromLocalStorage()
			for (const entry of  storedData) {
				if (entry.id === query) {
					foundAthlete = entry
					break
				}
			}
		}
		return foundAthlete
	}

}