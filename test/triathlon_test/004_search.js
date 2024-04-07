import Triathlon from '../src/triathlon'

describe('A Triathlon with filters and search', () => {
    let theTriathlon
    
	beforeEach(() => {
        const testDate = new Date('March 17, 2024')
        const testLocation = 'Everdeen Sport Centre'
        theTriathlon = new Triathlon(testDate, testLocation)

        theTriathlon.addAthlete("01", "Evelyn", "Hugo", 26, 0.56, 0.64, 1.93)
        theTriathlon.addAthlete("02", "Harry", "Cameron", 25, 0.49, 0.56, 1.94)
        theTriathlon.addAthlete("03", "Celia", "St.James", 24, 0.52, 0.35, 1.84)
        theTriathlon.addAthlete("04", "Renee", "Rodriguez", 22, 0.56, 0.84, 1.94)
    })

    test('should return "non-existent athlete" if targetId is not found', () => {
        const targetId = "08"
        const anAthlete = theTriathlon.findAthlete(targetId)
        const actual = anAthlete
        const expected = null
        expect(actual).toBe(expected)
    })

    test('should find the existing athlete with the specified targetId 01', () => {
        const targetId = "01"
        const anAthlete = theTriathlon.findAthlete(targetId)
        expect(anAthlete.firstname).toBe("Evelyn")
        expect(anAthlete.lastname).toBe("Hugo")
        expect(anAthlete.age).toBe(26)
        expect(anAthlete.swimTime).toBe(0.56)
        expect(anAthlete.runTime).toBe(0.64)
        expect(anAthlete.bikeTime).toBe(1.93)
    })
})
