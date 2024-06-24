/*
ViewModel: Acts as an intermediary between the View and the Model. It manages 
the state and operations related to the calculator.
*/

export default class TriathlonViewModel {
  constructor(triathlon, timer) {
    this.triathlon = triathlon
    this.timer = timer

    this.timerState= false
    this.category = ["swimTime", "bikeTime", "runTime"]
    this.container = []
    this.allValid = {}
    this.dbstored = []

    this.button = "Play"
    this.seconds = "00:00:00"
    

    this.init = this.init.bind(this)
    this.clear = this.clear.bind(this)

    this.cache = this.cache.bind(this)
    this.add = this.add.bind(this)
    this.display = this.display.bind(this)
    this.search = this.search.bind(this)
    this.validate = this.validate.bind(this)
    this.process = this.process.bind(this)
    this.average = this.average.bind(this)
  }

  clickable() {
    let test = this.allValid.id && this.allValid.firstName
    return test
  }

  validate(field, value) {
    let result = {}
    let isValid = false

    if(field ==='id'){
      isValid = this.triathlon.findAthlete(value) === null
      result[field] =  isValid ? 'Valid' : 'Please provide unique ID'
      this.allValid[field] = isValid
      // return {prompt:result[field], readyToSave:this.clickable()}
    } else if (field ==='firstName') {
      isValid = /^[A-Za-z]+$/.test(value)
      result[field] =  isValid ? 'Valid' : 'Input must contain only letters, no special characters or numbers.'
      this.allValid[field] = isValid
      }
    return {prompt:result, readyToSave:this.clickable()}
  }

  init() {
    this.altButton()
    return this.timerHandler()
  }

  clear() {
    this.timerState = false
    return this.timerHandler(true)
  }

  cache() {
    let output
    let container = this.timer.allCacheDuration
    let index = container.length

    let duration = this.timerHandler().elapsed
    let button = this.timerHandler().button

    if (index === 2) {
      output = this.consolidate(index, duration, button, true)
      this.timer.reset()
      this.container = container
    }

    else {
      output = this.consolidate(index, duration, button, false)
    }
    return output
  }

  consolidate(index, duration, button, status) {
    let output = {}
    output['category']= this.category[index]
    output['time']= duration
    output['complete']= status
    output['button']= button
    let result = this.timer.cacheTime(output)
    return result
  }

  altButton() {
    let newState = !this.timerState
    this.timerState = newState
  }

  timerHandler(cleared=false) {
    if(cleared){
      this.button = "Play"
      this.seconds = this.timer.reset()
    } else {
      if (this.timerState) {
        this.button = "Pause"
        this.seconds = this.timer.start()
      }
      else {
        this.button = "Play"
        this.seconds = this.timer.pause()
      }
    }
    return ({button:this.button, elapsed:this.seconds})
  }

  search(value) {
    if (!value|| value === "-") return "-"
    let query = this.triathlon.findAthlete(value)
    return query === null ? 
      "No athlete found": 
      `Athlete Found: [${query.id}] ${query.firstName} ${query.lastName}`
  }

  display(storage="list") {
    var collection
    if (storage === "list") {
      collection = this.triathlon.allMyAthletes
      return collection

    }
    else if (storage === "localStorage") {
      collection = this.triathlon.loadFromLocalStorage()
      return collection
    }
    else {
      this.triathlon.getDatabaseEntry(storage)
    }
  }

  add(storage = 'list') {
    let form = document.getElementById('athlete-form')
    let timers = this.container
    let output = this.triathlon.handleForm(form, timers)
    if (storage === 'localStorage') {
      this.triathlon.allMyAthletes.forEach((athlete) => {
      this.triathlon.saveToStorage(athlete)
      })
    } else if (storage === 'list') {
    this.triathlon.addAthlete(output)
    }
    form.reset()

    return output
  }

  average() {
    let storage = this.triathlon.loadFromLocalStorage()
		let athleteCount = storage.length
    return this.triathlon.calculateAvgDuration(storage, athleteCount)
  }

  process(data, action ="edit-athlete") {
    if (action === "delete-athlete") {
      this.triathlon.deleteAthlete(data)
    } 
    else if (action === "calculate-speed") {
      let athlete = this.triathlon.findAthlete(data)
      if (athlete !== null) {
        let swim = this.triathlon.timeToHours(athlete.swimTime)
        let run = this.triathlon.timeToHours(athlete.bikeTime)
        let bike = this.triathlon.timeToHours(athlete.runTime)
        return this.triathlon.calculateSpeed(swim, run, bike)
      }
    }  else if (action === "delete-database") {
        let databaseName = data
        this.triathlon.deleteDatabase(databaseName)
    } else {
      this.unpackModification(data)
    }
  }

  unpackModification(data) {
    var newData = {}
    if (typeof data === 'string') {
      newData['id'] = data
      this.triathlon.editAthlete(newData)
    } else {
      let button = data.id
      let target = data.targetField

      if (button !== 'discard') {
        let targetField = target[target.selectedIndex].getAttribute('name')
          newData['field'] = targetField
          newData['value'] = data.newValue.value
          this.triathlon.editAthlete(newData)
        } else {
          console.log('Discarded')
        }
      }
  }
}