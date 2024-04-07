import Triathlon from '../src/triathlon' // Whole

describe('Adding Athletes to Triathlon', () => {
    let theTriathlon
    
	beforeEach(() => {
        const testDate = new Date('March 17, 2024')
        const testLocation = 'Everdeen Sport Centre'
        theTriathlon = new Triathlon(testDate, testLocation)
    })
        
    describe('A Triathlon with 1 athlete in it', () => {
        beforeEach(() => {
            const testId = "03"
            const firstName = "John"
            const lastName = "Doe"
            const age = 26
            theTriathlon.addAthlete(testId, firstName, lastName, age)
        })

        test('should have a participant count of 1', () => {
            const count = theTriathlon.participantCount
            expect(count).toBe(1)
        })
    
        test('should have 1 entry in the allParticipants array', () => {
            const arraySize = theTriathlon.allParticipants.length
            expect(arraySize).toBe(1)
        })
    
        test('should return a string saying it has 1 logged Triathlon athlete(s)', () => {
            const expected = '[March 17, 2024] - Everdeen Sport Centre]\nThere\'s 1 participant(s) competed on this event.'
            const actual = theTriathlon.toString()
            expect(actual).toBe(expected)
        })
	})

    describe('a Triathlon with 3 athletes in it', () => {
		beforeEach(() => {
            theTriathlon.addAthlete("04", "Renee", "Rodriguez", 22, 0.56, 0.84, 1.94)
			theTriathlon.addAthlete("03", "Celia", "St.James", 24, 0.52, 0.35, 1.87)
			theTriathlon.addAthlete("01", "Evelyn", "Hugo", 26, 0.56, 0.64, 1.93)
			theTriathlon.addAthlete("02", "Harry", "Cameron", 25, 0.49, 0.56, 1.94)
		})

        test('should have a log count of 4', () => {
			const count = theTriathlon.participantCount
			expect(count).toBe(4)
		})
        
		test('should have three entries in the allParticipants array', () => {
			const arraySize = theTriathlon.allParticipants.length
			expect(arraySize).toBe(4)
		})

        test('should sort the athlete by id', () => {
			theTriathlon.sortParticipants()
			expect(theTriathlon.allParticipants[0].id).toBe("01")
			expect(theTriathlon.allParticipants[1].id).toBe("02")
			expect(theTriathlon.allParticipants[2].id).toBe("03")
			expect(theTriathlon.allParticipants[3].id).toBe("04")
		})

        test('getting all athletes successfully', () => {
			const result = theTriathlon.getAllAthletes()
			let expected = "[March 17, 2024] - Everdeen Sport Centre]\nThere's 4 participant(s) competed on this event."
			expected += "[Athlete No.01] Evelyn Hugo\nAge: 26 Speed: 29.87 kph\nSwimming - 0.56 hours\nRunning - 0.64 hours\nCycling - 1.93 hours"
			expected += "[Athlete No.02] Harry Cameron\nAge: 25 Speed: 31.27 kph\nSwimming - 0.49 hours\nRunning - 0.56 hours\nCycling - 1.94 hours"
			expected += "[Athlete No.03] Celia St.James\nAge: 24 Speed: 34.12 kph\nSwimming - 0.52 hours\nRunning - 0.35 hours\nCycling - 1.87 hours"
			expected += "[Athlete No.04] Renee Rodriguez\nAge: 22 Speed: 27.99 kph\nSwimming - 0.56 hours\nRunning - 0.84 hours\nCycling - 1.94 hours"
			expect(result).toBe(expected)
		})

        describe('a Triathlon non-unique IDs', () => {
            beforeEach(() => {
                theTriathlon.addAthlete("01", "Evelyn ", "Herrera")
            })

            test('should log the non-unique warning', () => {
                consoleLogSpy = jest.spyOn(console, 'log')
                theTriathlon.sortParticipants()
                expect(consoleLogSpy).toHaveBeenCalledWith("Warning: Non-unique IDs detected!")
                consoleLogSpy.mockRestore()
            })
    
            test('should sort according to order of addition', () => {
                theTriathlon.sortParticipants()
                expect(theTriathlon.allParticipants[0].lastname).toBe("Hugo")
                expect(theTriathlon.allParticipants[1].lastname).toBe("Herrera")
            })
        })
    })
})
