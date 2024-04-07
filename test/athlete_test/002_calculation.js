import Athlete from '../src/athlete' // Part

describe('Mandatory parameters provided and correct values returned', () => {
    let newAthlete
    beforeEach(() => {
        let testId = "03"
        let firstName = "John"
        let lastName = "Doe"
        let age = 26
        let swimTime = 0.47
        let runTime = 0.62
        let bikeTime = 2.13
        newAthlete = new Athlete(testId, firstName, lastName, age, swimTime, runTime, bikeTime)
    })
    
    test('should return the correct string and correct date format', () => {
        const expected = "[Athlete No.03] John Doe\nAge: 26 Speed: 29.04 kph\nSwimming - 0.47 hours\nRunning - 0.62 hours\nCycling - 2.13 hours"
        const actual = newAthlete.toString()
        expect(actual).toBe(expected)
    })

    test('should return an hour duration of  3.22', () => {
        const expected = 3.22
        const actual = parseFloat(newAthlete.calculateTotalDuration().toFixed(2))
        expect(actual).toBe(expected)
    })

    test('should return a data type of the sum as number, not string', () => {
        const expected = 'number'
        const actual = typeof newAthlete.calculateTotalDuration()
        expect(actual).toBe(expected)
    })

    test('should calculate speed of 29.04', () => {
        const actual = newAthlete.calculateSpeedKph()
        const expected = 29.04
        expect(actual).toBe(expected)
    })

    test('should return a data type of the sum as number, not string', () => {
        const expected = 'number'
        const actual = typeof newAthlete.calculateSpeedKph()
        expect(actual).toBe(expected)
    })
})
