/*
ViewModel: Acts as an intermediary between the View and the Model. It manages 
the state and operations related to the calculator.
*/

export default class TriathlonViewModel {
  constructor(triathlon, timer, fileHandler) {
    this.triathlon = triathlon
    this.timer = timer
    this.fileHandler = fileHandler

    this.container = []
    this.allValid = {}
    this.dbstored = []

    this.add = this.add.bind(this)
    this.display = this.display.bind(this)
    this.search = this.search.bind(this)
    this.validate = this.validate.bind(this)
    this.process = this.process.bind(this)
    this.average = this.average.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.time = this.time.bind(this)
    this.sort = this.sort.bind(this)
  }

  time(button) {
    if (button === 'pause-play') {
      return this.timer.init()
    } else if (button === 'cache') {
      let cache = this.timer.cache()
      return cache
    } else if (button === 'reset' || button === 'discard') {
      return this.timer.reset()
    } else {
      this.container = this.timer.allTimers
      return this.container
    }
  }

  sort(collection, sortMetadata) {
    let out = this.triathlon.sortAllAthletes(collection, sortMetadata)
    return out
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
    } else if (field ==='firstName') {
      isValid = /^[A-Za-z]+$/.test(value)
      result[field] =  isValid ? 'Valid' : 'Input must contain only letters, no special characters or numbers.'
      this.allValid[field] = isValid
      }
    return {prompt:result, readyToSave:this.clickable()}
  }

  search(value) {
    if (!value|| value === "-") return "-"
    let query = this.triathlon.findAthlete(value)
    return query === null ? 
      "No athlete found": 
      `Athlete Found: [${query.id}] ${query.firstName} ${query.lastName}`
  }

  display(storage = "list") {
    var collection
    if (storage === "localStorage") {
      collection = this.triathlon.loadFromLocalStorage()
      this.triathlon.incrementBadge()
      return collection
    }
    else if (storage === "list") {
      collection = this.triathlon.allMyAthletes
      return collection
    } else {
      this.triathlon.getDatabaseEntry(storage)
    }
  }

  add(storage = 'list') {
    let form = document.getElementById('athlete-form')
    let timers = this.container
    let output = this.triathlon.handleForm(form, timers)
    this.container = []
    if (storage === 'localStorage') {
      this.triathlon.saveToStorage()
    }
    else {
    this.triathlon.addAthlete(output)
  }
  form.reset()
  this.timer.clear()
    return output
  }

  average() {
    let storage = this.triathlon.loadFromLocalStorage()
    return this.triathlon.calculateAvgDuration(storage)
  }

  handleFile(operation) {
    this.fileHandler.call(operation)
  }

  process(data, action ="edit-athlete") {
    if (action === "delete-athlete") {
      this.triathlon.deleteAthlete(data)
    } 
    else if (action === "calculate-speed") {
      let speed = this.triathlon.getSpeed(data)
      return speed
    }
    else if (action === "delete-database") {
      if(data) {
          let databaseName = data
          this.triathlon.deleteDatabase(databaseName)
      } else {
        alert('Please specify the database to delete.')
      }
    }
    else if (action === "check-speed") {
      return this.triathlon.isBelowAvg()
    } 
    //edit
    else {
      this.unpackModification(data)
    }
  }

  unpackModification(data) {
    var newData = {}
    if (typeof data === 'string') {
      newData['id'] = data
      console.log(newData)
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
          alert('Changes cancelled.')
        }
      }
  }
}