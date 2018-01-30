/* global describe, it, expect, sortBy */
(function() {
	'use strict';

	var people = [
		{
			name: 'John Doe',
			age: 26
		},
		{
			name: 'Jane Doe',
			age: 26
		},
		{
			name: 'Jill Doe',
			age: 13
		},
		{
			name: 'Bob Doe',
			age: 13
		},
		{
			name: 'John Smith',
			age: 26
		},
		{
			name: 'Jane Smith',
			age: 26
		},
		{
			name: 'Jill Smith',
			age: 13
		},
		{
			name: 'Bob Smith',
			age: 13
		},
		{
			name: 'Nathaniel',
			age: 18
		},
		{
			name: 'Daniel',
			age: 18
		},
		{
			name: 'Dr. Smith',
			age: 36
		}
	];
	var serializedOriginal = JSON.stringify(people);

	var peopleAscending = [
		{
			name: 'Jill Doe',
			age: 13
		},
		{
			name: 'Bob Doe',
			age: 13
		},
		{
			name: 'Jill Smith',
			age: 13
		},
		{
			name: 'Bob Smith',
			age: 13
		},
		{
			name: 'Nathaniel',
			age: 18
		},
		{
			name: 'Daniel',
			age: 18
		},
		{
			name: 'John Doe',
			age: 26
		},
		{
			name: 'Jane Doe',
			age: 26
		},
		{
			name: 'John Smith',
			age: 26
		},
		{
			name: 'Jane Smith',
			age: 26
		},
		{
			name: 'Dr. Smith',
			age: 36
		}
	];
	var serializedAscending = JSON.stringify(peopleAscending);
	var serializedDescending = JSON.stringify(peopleAscending.reverse());

	describe('sortBy', function() {
		it('should not modify passed array', function() {
			sortBy(people, 'age', 'ascending');
			expect(JSON.stringify(people)).toBe(serializedOriginal);
			sortBy(people, 'age', 'descending');
			expect(JSON.stringify(people)).toBe(serializedOriginal);
		});

		it('should perform stable sort ascending', function() {
			var sorted = sortBy(people, 'age', 'ascending');
			expect(JSON.stringify(sorted)).toBe(serializedAscending);
		});

		it('should perform stable sort descending', function() {
			var sorted = sortBy(people, 'age', 'descending');
			expect(JSON.stringify(sorted)).toBe(serializedDescending);
		});
	});
})();