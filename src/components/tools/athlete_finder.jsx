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
    <div className="mt-4 d-flex flex-column">
          <h2>Athlete Finder</h2>
          <div className="m-0 mb-2">{onSearch(query)}</div>
          <input id="search-input" className="my-2" onChange={handleSearch} placeholder="Search Athlete by ID"/>
          <br/>
          <p>Find an athlete stored in local storage.</p>
          <div className="d-flex">
            <button type="button"id="delete-athlete" className="w-100 mx-1" onClick={(event) => handleClick(query,event)} title = {deleteBtnHoverTxt} disabled={!clickable}>Delete</button>
            <button type="button" id="edit-athlete" className="w-100 mx-1" onClick={(event) => handleClick(query,event)} title = {calculateBtnHoverTxt} disabled={!clickable}>Edit</button>
          </div>
          <br/>
          <p>Get speed on cached entry.</p>
          <button type="button" id="calculate-speed" className="w-100 mx-1" onClick={(event) => handleClick(query,event)} title = {editBtnHoverTxt}>Calculate</button>
    </div>
  )
}