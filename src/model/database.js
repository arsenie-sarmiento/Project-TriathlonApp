// encapsulates all IndexedDB-related operations
class TriathlonDB {
  constructor(newName) {
    this.triathlonDB = newName
    this.athleteStore = "athletes"
    this.keyPath = "athleteKey"
		this.version = 0
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
    console.log(targetDatabase)
    const indexedDB = window.indexedDB
    this.closeDB()
    if (targetDatabase) {
      const deleteRequest = indexedDB.deleteDatabase(targetDatabase)
      deleteRequest.onsuccess = function () {
        console.log("Database deleted successfully")
        alert('Database is now empty.')
      }
      deleteRequest.onerror = function () {
        console.error("An error occurred while deleting the database")
      }
    } else {
      alert('Database does not exist.')
    }
	}

  storeAthlete = (athlete) => {
    const prompt = 'An error occurred while adding data to the database'
    if (!this.db || !this.athleteStore) {
      console.error(prompt)
      return
    }

    const transaction = this.db.transaction([this.athleteStore], "readwrite")
    transaction.oncomplete = function () {
      console.log('Change added to the dabatase successfully.')
    }
    transaction.onerror = function (event) {
      console.error(prompt)
      throw new Error(prompt, event.target.errorCode)
    }
    const store = transaction.objectStore(this.athleteStore)
    store.add(athlete)
  }

  getMetadata() {
    const metadata = {version: this.version, date: this.date}
    return metadata
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

      const { version, date } = this.getMetadata()
      callback({athletes:athletes, version: version, date: date})
    }

    request.onerror = (event) => {
      console.error("Error retrieving athletes:", event.target.errorCode)
      throw new Error("Error retrieving athletes:", event.target.errorCode)
    }
  }
}

export default TriathlonDB