import { useState } from "react"
import PropTypes from "prop-types"

AthleteForm.propTypes = {
  onDiscard: PropTypes.func,
  onSave: PropTypes.func,
  onCheck: PropTypes.func,
}

export default function AthleteForm({onDiscard, onSave, onCheck}) {
  const [valid, setValid] = useState('')
  const [seen, setSeen] = useState(false)
  const [clickable, setClickable] = useState(false)

  const handleAddButtonClick = () => {
    setSeen(true)
  }
  
  const handleDiscard = () => {
    setSeen(false)
    onDiscard(true)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    onSave()
    setValid('')
  }

  const validateInput = (event) => {
    const { name, value } = event.target
    let validated = onCheck(name, value)
    setValid(validated.prompt)
    setClickable(validated.readyToSave)
  }

  if (seen) {
    return (
      <form id="athlete-form" className="form p-4 bg-dark text-light d-flex flex-column justify-content-center" onSubmit={submitHandler}>
      <div id="form-header">    
          <h1 className="text-center">Add New Athlete</h1>
      </div>
      <div className = "container">
          <div className="form-element m-2 row">
              <label className="form-label col-sm-3" htmlFor="id">Athlete ID<span className="text-danger"> *</span></label>
              <input type="text" className="col-sm-4" id="id" name="id" onChange={validateInput} placeholder="e.g. DEF-ID-123" required/>
              <div className="form-validators form-element col-sm-5">{valid.id}</div>
          </div>
  
          <div className="form-element m-2 row">
              <label className="form-label col-sm-3" htmlFor="firstName">First Name<span className="text-danger"> *</span></label>
              <input type="text"  className="col-sm-4" id="firstName" name="firstName" onChange={validateInput} placeholder="e.g. Jane" required/>
              <div className="form-validators form-element col-sm-5">{valid.firstName}</div>
          </div>
  
          <div className="form-element m-2 row">
              <label className="form-label col-sm-3" htmlFor="lastName">Last Name</label>
              <input type="text"  className="col-sm-4" id="lastName" name="lastName" onChange={validateInput} placeholder="e.g. Doe"/>
          </div>
  
      </div>
      <div className="d-flex mt-4">
        <button type="submit" id="save-button" className="btn btn-primary w-50 mx-1" disabled={!clickable}>Add</button>
        <button id="discard-button" className="btn btn-secondary w-50 mx-1" onClick={handleDiscard}>Discard</button>
      </div>
    </form>
    )
  }
  else {
    return (
      <button id="add-button" className="btn btn-secondary w-100 p-2" onClick={handleAddButtonClick}>Add Athlete Data</button>
    )
  }
}