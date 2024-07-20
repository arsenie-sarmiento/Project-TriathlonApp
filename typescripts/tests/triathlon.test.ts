/* eslint linebreak-style: ["error", "unix"]*/

import Triathlon from "../src/triathlon"
// import Athlete from "../src/athlete"
// import Stopwatch from "../src/stopwatch"

describe("Triathlon of Athletes", function() {
    let theTriathlon:Triathlon

    beforeEach(() => {
        theTriathlon = new Triathlon()
    })

    describe("An empty Triathlon", function() {
        test("should have a .athleteCount property", function() {
            expect(Object.prototype.hasOwnProperty.call(theTriathlon, "athleteCount")).toBeTruthy()
        })

        test("should have a toy count of 0", function() {
            const count = theTriathlon.athleteCount
            expect(count).toBe(0)
        })

        test("should have an .allMyAthletes property", function() {
            expect(Object.prototype.hasOwnProperty.call(theTriathlon, "allMyAthletes")).toBeTruthy()
        })

        test("should have an array for the .allMyAthletes ", function() {
            expect(Array.isArray(theTriathlon.allMyAthletes)).toBeTruthy()
        })

        test("should have nothing in the allMyAthletes array", function() {
            const arraySize = theTriathlon.allMyAthletes.length
            expect(arraySize).toBe(0)
        })

        test("should return a string saying it has 0 toys", function() {
            const output = theTriathlon.toString()
            expect(output).toBe("This toyTriathlon has 0 toys\n")
        })
    })

    describe("a Triathlon with 1 toy in it", function() {
        // const theTriathlon = new Triathlon()
        beforeEach(
            () => {
                theTriathlon.addToy("Aardvark", "Brown", 11.11)
            }
        )        

        test("should have a toy count of 1", () => {
            const count = theTriathlon.athleteCount
            expect(count).toBe(1)
        })

        test("should have one entry in the allMyAthletes array", function() {
            const arraySize = theTriathlon.allMyAthletes.length
            expect(arraySize).toBe(1)
        })

        test("should have a Toy in the allMyAthletes array", function() {
            const aToy = theTriathlon.allMyAthletes[0]            
            expect(aToy instanceof Toy).toBeTruthy()
            // expect(aToy).toBeInstanceOf(Toy)
        })

        describe("The Brown Arrdvark Toy worth 11.11 in the toy Triathlon", function() {
            let aToy:Toy
            
            beforeAll(() => {
                aToy = theTriathlon.allMyAthletes[0]
            })

            test("should have a .name property", function() {
                expect(Object.prototype.hasOwnProperty.call(aToy, "name")).toBeTruthy()
            })

            test("should have a .color property", function() {
                expect(Object.prototype.hasOwnProperty.call(aToy, "color")).toBeTruthy()
            })

            test("should have a .cost property", function() {
                expect(Object.prototype.hasOwnProperty.call(aToy, "cost")).toBeTruthy()
            })

            test("should have a .name of \"Aardvark\"", function() {
                let theValue = aToy.name
                expect(theValue).toBe("Aardvark")
            })

            test("should have a .color of \"Brown\"", function() {
                let theValue = aToy.color
                expect(theValue).toBe("Brown")
            })

            test("should have a .cost of 11.11", function() {
                let theValue = aToy.cost
                expect(theValue).toBe(11.11)
            })

            test("should return the correct String", function() {
                let theWords = aToy.toString()
                expect(theWords).toBe("Aardvark ( Brown ) @ $11.11")
            })

            test('play method logs message', () => {
                const logSpy = jest.spyOn(console, 'log')
                aToy.play()
                expect(logSpy).toHaveBeenCalledWith('Playing with Aardvark')
            })
        })
    })

    describe("a Triathlon with 3 toys in it", function() {
        // const theTriathlon = new Triathlon()

        beforeEach(() => {
            theTriathlon.addToy("Dolly", "Pink", 33.33)
            theTriathlon.addToy("Aardvark", "Brown", 11.11)
            theTriathlon.addToy("Bat", "Wooden", 22.22)
        })

        test("should have a toy count of 3", function() {
            const count = theTriathlon.athleteCount
            expect(count).toBe(3)
        })

        test("should have three entries in the allMyAthletes array", function() {
            const arraySize = theTriathlon.allMyAthletes.length
            expect(arraySize).toBe(3)
        })

        test("should return the right string", function() {
            const output = theTriathlon.toString()
            expect(output).toBe("This toyTriathlon has 3 toys\nAardvark ( Brown ) @ $11.11\nBat ( Wooden ) @ $22.22\nDolly ( Pink ) @ $33.33\n")
        })
    })
})