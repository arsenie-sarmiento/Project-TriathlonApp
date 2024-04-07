import Triathlon from '../src/triathlon' // Whole

describe('Analysing all athlete data.', () => {
    let theTriathlon
    beforeEach(() => {
        theTriathlon = new Triathlon()
        theTriathlon.addAthlete("06", "Mick", "Riva", 24, 0.52, 0.35, 1.84)
        theTriathlon.addAthlete("02", "Harry", "Cameron", 25, 0.49, 0.56, 1.94)
        theTriathlon.addAthlete("08", "Don", "Adler", 22, 0.56, 0.84, 1.94)
        theTriathlon.addAthlete("05", "Rex", "North", 26, 0.56, 0.64, 1.93)
    })

    test('should accurately calculate average speed of all athletes', () => {
        const actual = theTriathlon.calculateAvgSpeed()
        const expected = 30.91
        expect(actual).toBe(expected)
    })

    test('should return false if an athlete speed is below average', () => {
    	const targetId = "08"
    	const actual = theTriathlon.isAboveAvg(targetId)
        const expected = false
    	expect(actual).toBe(expected)
    })

    test('should return true if an athlete speed is above average', () => {
    	const targetId = "02"
    	const actual = theTriathlon.isAboveAvg(targetId)
        const expected = true
    	expect(actual).toBe(expected)
    })

    test('should get all athletes with above average speed', () => {
    	const actual = theTriathlon.getAboveAvg()
        const expected = "AvgSpeed: 30.91\n02 - Harry: 31.27 kph\n,06 - Mick: 34.5 kph\n"
    	expect(actual).toBe(expected)
    })
})
