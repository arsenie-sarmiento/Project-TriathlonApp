/* eslint linebreak-style: ["error", "unix"] */

import Athlete from '../src/athlete' // Part

describe('Training Athletes logs', () => {
	let newAthlete
	beforeEach(() => {
		newAthlete = new Athlete()
	})

	describe('Athletes with required properties', () => {
		test('should have .id property', () => {
			expect(
				Object.hasOwn(newAthlete, 'id'),
			).toBeTruthy()
		})

		test('should have .firstname property', () => {
			expect(
				Object.hasOwn(newAthlete, 'firstname'),
			).toBeTruthy()
		})
		
		test('should have .lastname property', () => {
			expect(
				Object.hasOwn(newAthlete, 'lastname'),
			).toBeTruthy()
		})
		
		test('should have .age property', () => {
			expect(
				Object.hasOwn(newAthlete, 'age'),
			).toBeTruthy()
		})

		test('should have .swimTime property', () => {
			expect(
				Object.hasOwn(newAthlete, 'swimTime'),
			).toBeTruthy()
		})

		test('should have .runTime property', () => {
			expect(
				Object.hasOwn(newAthlete, 'runTime'),
			).toBeTruthy()
		})

		test('should have .bikeTime property', () => {
			expect(
				Object.hasOwn(newAthlete, 'bikeTime'),
			).toBeTruthy()
		})
	})
})
