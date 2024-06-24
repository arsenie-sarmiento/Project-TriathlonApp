import { useState } from "react"
import PropTypes from "prop-types"

AthleteFinder.propTypes = {
  onSearch: PropTypes.func,
  onProcess: PropTypes.func,
}
export default function AthleteFinder({onSearch, onProcess}) {

  const deleteBtnHoverTxt = 'Click to delete searched entry from the local storage'
  const editBtnHoverTxt = 'Click to modify searched entry from the local storage'
  const calculateBtnHoverTxt = 'Click to calculate speed of the searched entry'

  const [query, setQuery] = useState("-")
  const [clickable, setClickable] = useState(false)

  const handleSearch = (event) => {
    const value = event.target.value
    setQuery(value)
    if (onSearch(value) !== "No athlete found" && value !== "") {
      setClickable(true)
    } else {
      setClickable(false)
    }
  }

  const handleClick = (index, event) => {
    const button = event.target.id
    onProcess(index, button)
    setQuery('-')
    setClickable(false)
  }

    return (
      <div className="mt-4">
          <div className="d-flex flex-column">
            <h2>Athlete Finder</h2>
            <p>Find an athlete stored in local storage.</p>
            <input id="search-input" onChange={handleSearch} placeholder="Search Athlete by ID"/>
            <div>{onSearch(query)}</div>
          </div>
          <div className="d-flex mt-2">
            <button type="button" id="delete-athlete" className="w-100 mx-1" onClick={(event) => handleClick(query,event)} title = {deleteBtnHoverTxt} disabled={!clickable}>Delete</button>
            <button type="button" id="calculate-speed" className="w-100 mx-1" onClick={(event) => handleClick(query,event)} title = {editBtnHoverTxt} disabled={!clickable}>Calculate</button>
            <button type="button" id="edit-athlete" className="w-100 mx-1" onClick={(event) => handleClick(query,event)} title = {calculateBtnHoverTxt} disabled={!clickable}>Edit</button>
          </div>
      </div>
    )
  }