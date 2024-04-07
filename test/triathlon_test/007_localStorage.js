/* eslint linebreak-style: ["error", "unix"] */

import { beforeEach, expect } from '@jest/globals'
import Triathlon from '../src/triathlon'

describe('localStorage with Jest', () => {
    let theTriathlon
    let mockAthleteData

    beforeEach(() => {
        theTriathlon = new Triathlon()
        mockAthleteData = {
            id: "11", firstname: "Edward", lastname: "Hugo", age: 65, swimTime: 0.56, runTime: 0.84, bikeTime: 1.94
        }
    })

    describe('An empty localstorage', () => {
        beforeEach(() => {
            localStorage.clear()
        })
        test('local storage size will be 0', () => {
            expect(localStorage.length).toEqual(0)
        })

        test('should return empty {} from an empty localStorage', () => {
            expect(theTriathlon.loadAllLocalStorage()).toEqual({})
        })
    })

    describe('A non-empty local storage', () => {
        beforeEach(() => {
            let mockLocalStorageKey = "01"
            theTriathlon.saveAllToStorage(mockLocalStorageKey, mockAthleteData)
        }) 
        test('local storage size will be 1', () => {
            const actual = localStorage.length
            const expected = 1
            expect(actual).toEqual(expected)
        })

        test('should load all athlete data from localStorage', () => {
			const expected = {
                "01": {
                    id: "11",
                    firstname: "Edward",
                    lastname: "Hugo",
                    age: 65,
                    swimTime: 0.56,
                    runTime: 0.84,
                    bikeTime: 1.94
                }
            }
            const actual = theTriathlon.loadAllLocalStorage()
			expect(actual).toEqual(expected)
		})
    })
})
