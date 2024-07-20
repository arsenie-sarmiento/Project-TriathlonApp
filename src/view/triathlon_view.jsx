import { useState } from "react"
import PropTypes from "prop-types"

import Timer from "../components/tools/timer"
import AthleteFinder from "../components/tools/athlete_finder"
import Calculator from "../components/tools/speed_calculator"
import AthleteTable from "../components/tables_and_storage/athlete_list"
import AthleteForm from "../components/forms/add_athlete_form"
import EditForm from "../components/forms/edit_athlete_form"
import StorageComponent from "../components/tables_and_storage/db_and_localstorage"
// import FileHandlerComponent from "../components/tables_and_storage/file_handler"

// https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
TriathlonView.propTypes = {
    onCache: PropTypes.func,
    onAdd: PropTypes.func,
    onDisplay: PropTypes.func,
    onSearch: PropTypes.func,
    onCheck: PropTypes.func,
    onProcess: PropTypes.func,
    onAverage: PropTypes.func,
    onTime: PropTypes.func,
}

// View is responsible for rendering the UI and handling user interactions.
function TriathlonView({onAdd, onDisplay, onSearch, onCheck, onProcess, onAverage, onTime}) { //onHandleFile
  const [entry, setEntry] = useState(onDisplay)

  // Forms
  const [formVisibility, setformVisibility] = useState({"add":false, "edit":false})

  // Calculator Component
  const [speed, setSpeed] = useState(0)
  const [average, setAverage] = useState(onAverage())

  const handleLoad = (type) => {
    if(type==='localStorage') {
      setEntry(onDisplay(type))
    }
    else {
      onDisplay(type)
    }
  }
  const handleTime = (operation="get") => {
    let out = onTime(operation)
    return out
  }

  const handleEditForm = (target) => {
    onProcess(target)
    let form = document.getElementById('edit-athlete-form')
    form.reset()
    handleLoad('localStorage')
    setformVisibility({"edit":!formVisibility.edit})
  }

  const handleSubmit = (storage) => {
    let timers = handleTime()
    onAdd(storage, timers)
    handleClear(false)
    setEntry(onDisplay(storage))
    setAverage(onAverage())
  }

  const handleResetStorage = (storage) => {
    if (storage === 'localStorage') {
      localStorage.clear()
      setTimeout(() => {
        alert('Local storage has been cleared.')
      }, 1000)
    } else {
      let dbName = storage
      let action = 'delete-database'
      handleAction(dbName, action)
    }
    handleClear(false)
    handleLoad('localStorage')
    setAverage(onAverage())
  }

  const handleAction = (target, action) => {
    if (action === 'edit-athlete') {
    setformVisibility({"edit":!formVisibility.edit})
      let input = document.getElementById('search-input')
      input.value = ''
      onProcess(target, action)
    } else if (action === 'delete-athlete') {
      onProcess(target, action)
      setEntry(onDisplay())
      setAverage(onAverage())
    } else if (action === 'calculate-speed'){
      let output = onProcess(target, action)
      setSpeed(output)
    } else {
      onProcess(target, action)
    }
  }

  const handleClear = (categoryComplete=true) => {
    if(categoryComplete){
      setformVisibility({"add":true})
    } 
    else if (categoryComplete === "discard") {
      handleTime(categoryComplete)
    }
    else {
      setformVisibility({"add":false, "edit":false})
    }
  }

  return (
    <div className="d-flex">
      <div className="d-flex flex-column">
        <div className="">
          <Timer
            onClear={handleClear}
            onTime={handleTime}
          />
        </div>
        <div hidden={!formVisibility.add}>
          <AthleteForm
            onDiscard={() => handleClear("discard")}
            onSave={handleSubmit}
            onCheck={onCheck}
          />
        </div>
        <div className="mt-3">
          <AthleteTable
            onGet={entry}
          />
        </div>
        <div>
          <AthleteFinder
            onSearch={onSearch}
            onProcess={handleAction}
          />
        </div>
        <div hidden={!formVisibility.edit}>
          <EditForm
            onEdit={handleEditForm}
          />
        </div>
        <div>
          <Calculator
            onCalculate={speed}
            onAverage={average}
          />
        </div>          
      </div>
      <div className="d-flex flex-column">
        <StorageComponent
          onLoad={handleLoad}
          onSave={() => handleSubmit('localStorage')}
          onClear={handleResetStorage}
        />
      </div>
    </div>
  )
}

export default TriathlonView
