// import { useState } from "react"
import PropTypes from "prop-types"

Cache.propTypes = {
    initCache: PropTypes.array,
    initForm: PropTypes.bool,
}

export default function Cache({initCache,initForm}) {
    let cachedTimes = initCache

    return (
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
            {cachedTimes.map((cachedTime,index) => (
            <tr key={index}>
                <td>{cachedTime.category}</td>
                <td>{cachedTime.time}</td>
            </tr>
            ))}
        </tbody>
        </table>
        <div className="col-md-12">
          {initForm}
        </div>
    </div>
    )
}