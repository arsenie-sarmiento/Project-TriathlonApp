// encapsulates all IndexedDB-related operations
class TriathlonDB {
  constructor(newName) {
    this.triathlonDB = newName
    this.athleteStore = "athletes"
    this.keyPath = "athleteKey"
    this.initializeDB()
  }

  initializeDB() {
    const request = window.indexedDB.open(this.triathlonDB, 1)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      db.createObjectStore(this.athleteStore, {
        keyPath: this.keyPath,
        autoIncrement: true,
      })
    }

    request.onsuccess = (event) => {
      this.db = event.target.result
    }

    request.onerror = (event) => {
      console.error("Error initializing IndexedDB:", event.target.errorCode)
    }
  }

  closeDB() {
		if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  deleteDatabase(targetDatabase) {
		this.closeDB()
		const indexedDB = window.indexedDB
		const deleteRequest = indexedDB.deleteDatabase(targetDatabase)
		deleteRequest.onsuccess = function () {
			console.log("Database deleted successfully")
		}
		deleteRequest.onerror = function () {
			console.error("An error occurred while deleting the database")
		}
	}

  storeAthlete = (athlete) => {
    const transaction = this.db.transaction([this.athleteStore], "readwrite")
    const store = transaction.objectStore(this.athleteStore)
    store.add(athlete)
  }

  getAllAthletes(callback) {
    const transaction = this.db.transaction([this.athleteStore], "readonly")
    const store = transaction.objectStore(this.athleteStore)
    const request = store.getAll()

    request.onsuccess = (event) => {
      let athletes = event.target.result
      athletes.forEach(element => {
        element['primary-key'] = element.athleteKey
      })
      callback(athletes)
    }

    request.onerror = (event) => {
      console.error("Error retrieving athletes:", event.target.errorCode)
      throw new Error("Error retrieving athletes:", event.target.errorCode)
    }
  }
}

export default TriathlonDB