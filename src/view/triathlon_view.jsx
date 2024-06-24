import { useState } from "react"
import PropTypes from "prop-types"

import Timer from "../components/tools/timer"
import AthleteFinder from "../components/tools/athlete_finder"
import Calculator from "../components/tools/speed_calculator"
import Cache from "../components/tables_and_storage/cache_speed"
import AthleteTable from "../components/tables_and_storage/athlete_list"
import AthleteForm from "../components/forms/add_athlete_form"
import EditForm from "../components/forms/edit_athlete_form"
import StorageComponent from "../components/tables_and_storage/db_and_localstorage"

// https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
TriathlonView.propTypes = {
    onInit: PropTypes.func,
    onClear: PropTypes.func,
    onCache: PropTypes.func,
    onAdd: PropTypes.func,
    onDisplay: PropTypes.func,
    onSearch: PropTypes.func,
    onCheck: PropTypes.func,
    onProcess: PropTypes.func,
    onAverage: PropTypes.func,
}

// View is responsible for rendering the UI and handling user interactions.
function TriathlonView({onInit, onClear, onCache, onAdd, onDisplay, onSearch, onCheck, onProcess, onAverage}) {
    const [elapsed, setElapsed] = useState('00:00:00')
    const [initButton, setInitButton] = useState('Play')
    const [cachedTimes, setCachedTimes] = useState([])
  
    const [clickable, setClickable] = useState(true)
    const [entry, setEntry] = useState(onDisplay)
    // Forms
    const [formVisible, setformVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    
    // Calculator Component
    const [speed, setSpeed] = useState(0)
    const [average, setAverage] = useState(onAverage())
  
    const initState = {
      elapsed: elapsed,
      initButton: initButton,
      clickable: clickable,
    }

    const handleLoad = (type) => {
      if(type==='localStorage') {
        setEntry(onDisplay(type))
      }
      else {
        onDisplay(type)
      }
    }
  
    const handleTimer = () => {
        let timerProp = onInit()
        setInitButton(timerProp.button)
        setElapsed(timerProp.elapsed)
    }
  
    const handleClear = () => {
        const output = onClear()
        setElapsed(output.elapsed)
        setInitButton(output.button)
        setCachedTimes([])
        setformVisible(false)
        setClickable(true)
    }
  
    const cacheTime = () => {
      let cacheData = onCache()
      setCachedTimes([...cacheData])
  
      let recentEntry = cacheData[cacheData.length-1]
      document.getElementById('currentSport')
      .replaceChildren(recentEntry.category)
      handleCompleteSet(recentEntry.complete)
    }

    const handleEditForm = (target) => {
      onProcess(target)
      let form = document.getElementById('edit-athlete-form')
      form.reset()
      setEntry(onDisplay('localStorage'))
      setEditVisible(!editVisible)
    }
  
    const handleSubmit = (storage = "list") => {
        onAdd(storage)
        handleClear() //equivalent:setCachedTimes([]);setElapsed('00:00:00');setForm(false);setClickable(true)
        setEntry(onDisplay(storage))

      setAverage(onAverage())
    }
  
    const handleResetStorage = (type) => {
      if (type === 'localStorage') {
        localStorage.clear()
        setTimeout(() => {
          alert('Local storage has been cleared.')
        }, 1000)
      } else {
        let action = 'delete-' + type
        handleAction('triathlonDB', action)
        setTimeout(() => {
          alert('Database is now empty.')
        }, 1000)
      }
      handleClear()
      setEntry(onDisplay('localStorage'))
      setAverage(onAverage())
    }

    const handleAction = (target, action) => {
      if (action === 'edit-athlete') {
        setEditVisible(!editVisible)
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
  
    const handleCompleteSet = (state=false) => {
      if(state){
        setClickable(false)
        setformVisible(true)
      }
    }
  
    return (
      <div className="d-flex">
        <div className="d-flex flex-column">
          <div className="d-flex row mb-3">
            <Timer
              initState={initState}
              onInit={handleTimer}
              onClear={handleClear}
              onCache={cacheTime}
            />
            <Cache
              initCache={cachedTimes}
              initForm={formVisible}
            />
          </div>
          <div hidden={!formVisible}>
            <AthleteForm
              onDiscard={handleClear}
              onSave={handleSubmit}
              onCheck={onCheck}
            />
          </div>
          <div className="d-flex row mb-3">
            <div className="col-4">
                <AthleteFinder
                  onSearch={onSearch}
                  onProcess={handleAction}
                />
            </div>
            <div className="col-8" hidden={!editVisible}>
              <EditForm
                onEdit={handleEditForm}
              />
            </div>
          </div>
          <div className="mt-3">
            <div>
              <AthleteTable
                onGet={entry}
              />
            </div>
          </div>
          <div>
            <Calculator
              onCalculate={speed}
              onAverage={average}
            />
          </div>          
        </div>
        <div>
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
