import { useState } from "react"
import PropTypes from "prop-types"

Timer.propTypes = {
  onClear: PropTypes.func,
  onTime: PropTypes.func,
}

export default function Timer({onClear, onTime}) {
  const timerBtnHover = "Click to play/pause timer."
  const resetBtnHover = "Click to clear cache."
  const cacheBtnHover = "Click to temporarily store timers."

  const [state, setState] = useState({
    elapsed: '00:00:00',
    active: false,
    buttonMode: 'Play',
    clickable: true,
  })

  const [cache, setCache] = useState([])

  const handleClick = (event) => {
    let operation = event.target.id
    let data = onTime(operation)
    setState({
      buttonMode:data.buttonMode,
      clickable: data.complete,
      currentSport: data.category,
    })
    const completeSet = state.currentSport === "Running"
    
    if (completeSet) {
      setCache([{}])
      onClear(true)
    }

    if (operation === "cache") {
      setCache(data)
    }

    else if (operation === "reset") {
      onClear(false)
      setCache([])
      setState({
        buttonMode:data.buttonMode,
        clickable: data.complete,
        currentSport: data.category
      })
    }
  }
  
  return (
    <div className="d-flex row mb-3 align-middle">
      <div id="time_button" className="col-md-4 align-middle my-5">
        <h1>Timer</h1>
        <h6 id="currentSport">{state.currentSport}</h6>
        <h2 id="interval_output">00:00:00</h2>
        <input type="button" className="tablinks" id="pause-play" value={state.buttonMode} onClick={(event) => handleClick(event)}title={timerBtnHover}></input>
        <input type="button" className="tablinks" id="reset" value="Reset" onClick={(event) => handleClick(event)} title={resetBtnHover}></input>
        <input type="button" className="tablinks" id="cache" value="Cache" onClick={(event) => handleClick(event)} disabled={!state.clickable}title={cacheBtnHover}></input>
      </div>
      <div id="display" className="col-md-8">
        <h2>Cache Duration</h2>
        <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Sport Category</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody id="duration-entry">
              {cache.map((entry, subIndex) => (
                <tr key={subIndex}>
                    <td>{entry.category}</td>
                    <td>{entry.time}</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
    </div>
    )
  }