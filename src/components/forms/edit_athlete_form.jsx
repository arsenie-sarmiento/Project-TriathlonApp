// import { useState } from "react"
import PropTypes from "prop-types"

EditForm.propTypes = {
  onEdit: PropTypes.func,
  // onRevert: PropTypes.func,
}

export default function EditForm({onEdit}) {

  const submitHandler = (event) => {
    event.preventDefault()
    onEdit(event.target)
  }
    return (
      <div>
      <form id="edit-athlete-form" className="form p-1 bg-dark text-light d-flex flex-column" onSubmit={submitHandler}>
        <div id="form-header">    
            <h4 className="text-center">Edit Athlete</h4>
        </div>
        <div className = "container d-flex">
            <div className="col-4 m-2 mx-4 row form-element">
              <select className="form-select" aria-label="Default select example" id="targetField" name="targetField">
                <option defaultValue="1" name="firstName">First Name</option>
                <option defaultValue="2" name="lastName">Last Name</option>
              </select>
            </div>

            <div className="col-8 form-element m-2 row">
                <input type="text"  className="col-sm-9 mx-4" id="newValue" name="newValue" placeholder="Enter New Value"/>
            </div>        
        </div>
        <div className="d-flex mt-4">
          <button type="submit" id="apply" className="btn btn-primary w-50  h-25 mx-1">Apply Changes</button>
          <button id="discard" className="btn btn-secondary w-50 h-25 mx-1" onClick={(event) => submitHandler(event)}>Discard Changes</button>
        </div>
      </form>
      </div>
    )
  }