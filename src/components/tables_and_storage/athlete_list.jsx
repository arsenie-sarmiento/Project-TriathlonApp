import { useState } from "react"
import PropTypes from "prop-types"

AthleteTable.propTypes = {
  onGet: PropTypes.array,
}
export default function AthleteTable({onGet}) {
  const up = 'M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659'
  const down = 'M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659'
  const iconPath = {
    'asc': up,
    'desc': down
  }
  const [order, setOrder] = useState({
    keyToSort: "id", direction: "asc",
    icon: iconPath["asc"]
  })

  const headers = [
    {id: 1,key: "id", label: "Athlete ID"},
    {id: 2,key: "firstName", label: "First Name"},
    {id: 3,key: "lastName", label: "Last Name"},
    {id: 4,key: "swimTime", label: "Swim Duration"},
    {id: 5,key: "runTime", label: "Run Duration"},
    {id: 6,key: "bikeTime", label: "Bike Duration"},
  ]

  const handleHeaderClick = (column) => {
    const { keyToSort, direction: currentDirrection } = order
    const direction = column.key === keyToSort ? (currentDirrection === "asc" ? "desc" : "asc" ) : "desc"
    const icon = iconPath[direction]

    setOrder({
      keyToSort: column.key,
      direction: direction,
      icon: icon
    })
  }
  
  const sortAllAthletes = (arrayToSort) => {
    return arrayToSort.sort((a, b) => {
        if (order.direction === 'asc') {
            return a[order.keyToSort] >  b[order.keyToSort] ? 1 : -1
        } else{
            return a[order.keyToSort] >  b[order.keyToSort] ? -1 : 1
        }
    })
  }

    return (
      <div className="mt-4 mx-4">
        <div>
          <h2>Triathlon Athletes</h2>
          <p>When first added, the entries listed here are temporary until saved to the local storage..</p>
          <table className="table mt-3 mx-3 px-4">
            <thead>
              <tr>
                {headers.map((header,index) => (
                  <th scope="col" key={index} onClick={() => handleHeaderClick(header)}>
                    <div className="d-flex justify-content-between">
                      <span>{header.label}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                          <path d={order.icon}/>
                      </svg>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody id="athlete-entry">
              {sortAllAthletes(onGet).map((row, index) => (
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