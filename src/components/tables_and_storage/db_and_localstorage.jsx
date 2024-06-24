import { useState } from "react"
import PropTypes from "prop-types"

StorageComponent.propTypes = {
  onLoad: PropTypes.func,
  onSave: PropTypes.func,
  onClear: PropTypes.func,

}
export default function StorageComponent({onLoad, onSave, onClear}) {
  const loadBtnHoverTxt = 'Load All Local Storage and display on Triathlon Athletes table.'
  const saveBtnHoverTxt = 'Save List To Local Storage & database.'

  const [entry, setEntry] = useState([])

  const headers = [
    {id: 1,key: "primary-key", label: "Primary Key"},
    {id: 2,key: "id", label: "Athlete ID"},
    {id: 3,key: "firstName", label: "First Name"},
    {id: 4,key: "lastName", label: "Last Name"},
    {id: 5,key: "speed", label: "Speed (kph)"},
  ]

  const handleClearStorage  = (type) => {
    onClear(type)
  }

  const handleLoadStorage = (type) => {
    if (type !== 'database') {
      onLoad(type)
    } else {
      onLoad((athletes, error) => {
        if(error) {
          console.error('Error:', error)
        } else {
          if(athletes.length > 0) {
            setEntry(athletes)
          } else {
            alert('Empty Database.')
          }
        }
      })
    }
  }

    return (
      <div className="mx-5 d-flex flex-column">
        {/* Local Storage */}
        <div className="row">
            <h2>Triathlon Storage</h2>
            <p>Save or load all athletes listed to local storage.</p>
            <button className="col-4" id="save-storage-btn" onClick={onSave} title={loadBtnHoverTxt}>Save</button>
            <button className="col-4" onClick={() => handleLoadStorage('localStorage')} title={saveBtnHoverTxt}>Load</button>
            <button className="col-4" id="reset-btn" onClick={() => handleClearStorage('localStorage')}>Clear</button>
        </div>
        {/* Database */}
        <div className="mt-5">
          <h2>Database</h2>
          <p>Edit history of the athlete data are listed here.</p>
          <div className="d-flex">
            <button className="col-6" onClick={() => handleLoadStorage('database')}>Load DB</button>
            <button className="col-6" id="reset-btn" onClick={() => handleClearStorage('database')}>Delete DB</button>
          </div>
          <table className="table mt-3 mx-3">
            <thead>
            <tr>
                {headers.map((header,index) => (
                  <th scope="col" key={index}>
                      <span>{header.label}</span>
                  </th>
                ))} 
              </tr>
            </thead>
            <tbody id="db-entry">
              {entry.map((row,index) => (
                <tr key={index}>
                  {headers.map((header, index) => (
                      <td key={index}>
                          <span>{row[header.key]}</span>
                      </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }