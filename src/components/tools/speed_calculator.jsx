// import { useState } from "react"
import PropTypes from "prop-types"

Calculator.propTypes = {
    onCalculate: PropTypes.number,
    onAverage: PropTypes.object,
}

export default function Calculator({onCalculate, onAverage}) {
    let average = onAverage


    return (
        <div className="row mt-4">
            <div className="border p-3 col-sm">
                <h3>Calculated Speed:</h3>
                <p>Queried athlete from the local storage.</p>
                <h5>{onCalculate} kilometre(s) / hour</h5>
                <p>
                <strong>Distance:</strong><br/>
                    Swimming: 3.5km<br/>
                    Running: 10.0km<br/>
                    Biking: 80.0km<br/>
                </p>
            </div>
            <div className="border p-3 col-sm">
                <h3>Average Total Duration:</h3>
                <p>Getting the average of all the athlete&apos;s speed in the local storage.</p>
                <h5>Swim: {average.swim} second(s)</h5>
                <h5>Run: {average.run} second(s)</h5>
                <h5>Bike: {average.bike} second(s)</h5>
            </div>
        </div>
    )
}