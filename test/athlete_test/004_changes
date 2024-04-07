import Athlete from '../src/athlete'

describe('Modifying athlete values and saving or discarding changes.', () => {
    let testId = "03"
    let firstName = "John"
    let lastName = "Doe"
    let age = 26
    let swimTime = 0.39
    let runTime = 0.66
    let bikeTime = 1.90
    let newAthlete

    beforeEach(() => {
        newAthlete = new Athlete(testId, firstName, lastName, age, swimTime, runTime, bikeTime)
    })

    describe('Valid data type and fields provided and errors handled', () => {
        let targetField
        let newValue
        let expectedError
        // let expectedType = 'string'

        test('Invalid field error', () => {
            targetField = "nonExistentField"
            newValue = "Johnny"
            expectedError = "Invalid field to update"
            expect(() => newAthlete.editAthleteData(targetField, newValue)).toThrow(expectedError)
        })

        test('Data type error', () => {
            targetField = 123
            newValue = "Johnathan"
            expectedError = "Field must be a string"
            expect(() => newAthlete.editAthleteData(targetField, newValue)).toThrow(expectedError)
        })

        test('New value data type error', () => {
            targetField = "firstname"
            newValue = 123
            expectedError = "New value must be a string"
            expect(() => newAthlete.editAthleteData(targetField, newValue)).toThrow(expectedError)
        })

        test('No error for new age value that is numeric', () => {
            targetField = "age"
            newValue = 24
            expectedError = "New value must be a string"
            expect(() => newAthlete.editAthleteData(targetField, newValue)).not.toThrow(expectedError)
        })

        test('Saving changes on first name', () => {
            targetField = "firstname"
            newValue = "Johnathan"
            newAthlete.saveChanges(true, targetField, newValue)
            expect(newAthlete.selectSaveChanges).toBe(true)
        })

        test('Old value is overwritten', () => {
            targetField = "lastname"
            newValue = "Maximus"
            let actual = newAthlete.saveChanges(true, targetField, newValue)
            expect(actual[targetField]).toEqual(newAthlete.lastname)
        })

        test('Discarding changes', () => {
            targetField = "age"
            newValue = 24
            let actual = newAthlete.saveChanges(false, targetField, newValue)
            expect(actual[targetField]).not.toEqual(newAthlete.lastname)
            expect(newAthlete.age).toBe(26)
        })
    })
})
