// import { useState } from "react"
import PropTypes from "prop-types"

Timer.propTypes = {
  initState: PropTypes.object,
  onInit: PropTypes.func,
  onClear: PropTypes.func,
  onCache: PropTypes.func,
  onReset: PropTypes.func,
}

export default function Timer({initState, onInit, onClear, onCache}) {
  const timerBtnHover = "Click to play/pause timer."
  const resetBtnHover = "Click to clear cache."
  const cacheBtnHover = "Click to temporarily store timers."
  
  return (
      <div id="time_button" className="col-md-4">
        <div>
          <h1>Timer</h1>
          <h6 id="currentSport"></h6>
          <h2 id="interval_output">{initState.elapsed}</h2>
          <input type="button" className="tablinks" id="pause-play-btn" value={initState.initButton} onClick={onInit}title={timerBtnHover}></input>
          <input type="button" className="tablinks" id="reset-btn" value="Reset" onClick={onClear} title={resetBtnHover}></input>
          <input type="button" className="tablinks" id="cache-btn" value="Cache" onClick={onCache} disabled={!initState.clickable}title={cacheBtnHover}></input>
        </div>
    </div>
    )
  }