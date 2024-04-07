import Triathlon from '../src/triathlon'

describe('An empty Triathlon log', () => {
    let theTriathlon
	let newAthlete

	beforeEach(() => {
        const testDate = new Date('March 17, 2024')
        const testLocation = 'Everdeen Sport Centre'
        theTriathlon = new Triathlon(testDate, testLocation)
	})

    test('should have a participant count of 0', () => {
        let expected = 0
        let actual = theTriathlon.participantCount
        expect(actual).toBe(expected)
    })

    test('should have nothing in the allParticipants array', () => {
        let expected = 0
        let arraySize = theTriathlon.allParticipants.length
        expect(arraySize).toBe(expected)
    })

    test('should match expected date format', () => {
        const expected = 'March 17, 2024'
        const actual = theTriathlon.formatDate()
        expect(actual).toBe(expected)
    })

    test('should return a string saying it has 0 logged Triathlon athletes', () => {
        const expected = '[March 17, 2024] - Everdeen Sport Centre]\nThere\'s 0 participant(s) competed on this event.'
        const actual = theTriathlon.toString()
        expect(actual).toBe(expected)
    })
})
