import Athlete from '../src/athlete' // Part

describe('Handle all omitted or undefined parameters with default values', () => {
    const unknown = undefined
    let testId = "03"
    let firstName = "John"
    let lastName = "Doe"
    let age = 26
    let swimTime = 0.39
    let runTime = 0.66
    let bikeTime = 1.90
    let newAthlete = new Athlete(testId, firstName, lastName, age, swimTime, runTime, bikeTime)

    test('return correct sum with default swimtime value used', () => {
        newAthlete = new Athlete(testId, firstName, lastName, age, unknown, runTime, bikeTime)
        const expected = 2.56
        const actual = newAthlete.calculateTotalDuration()
        expect(actual).toBe(expected)
    })

    test('return correct sum with default runtime value used', () => {
        newAthlete = new Athlete(testId, firstName, lastName, age, swimTime, unknown, bikeTime)
        const expected = 2.29
        const actual = newAthlete.calculateTotalDuration()
        expect(actual).toBe(expected)
    })

    test('return correct sum with default bikeTime value used', () => {
        newAthlete = new Athlete(testId, firstName, lastName, age, swimTime, runTime, unknown)
        const expected = 1.05
        const actual = newAthlete.calculateTotalDuration()
        expect(actual).toBe(expected)
    })
    
    test('omitted bikeTime values should return the correct sum', () => {
        newAthlete = new Athlete(testId, firstName, lastName, age, swimTime, runTime)
        const expected = 1.05
        const actual = newAthlete.calculateTotalDuration()
        expect(actual).toBe(expected)

    })

    test('omitted bikeTime and runTime values should return the correct sum', () => {
        newAthlete = new Athlete(testId, firstName, lastName, age, swimTime)
        const expected = 0.39
        const actual = newAthlete.calculateTotalDuration()
        expect(actual).toBe(expected)
    })

    test('three duration values missing should return a 0.00 total duration', () => {
        newAthlete = new Athlete(testId, firstName, lastName, age)
        const expected = 0.00
        const actual = newAthlete.calculateTotalDuration()
        expect(actual).toBe(expected)
    })
})
