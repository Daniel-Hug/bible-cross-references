// Verbalize is a set of tiny utility functions for converting data into human-readable text.
// All functions return a plain english string.
// https://github.com/Daniel-Hug/verbalize

(function (root, factory) {
	if (typeof define === 'function' && define.amd)
		define([], factory);
	else if (typeof exports === 'object')
		module.exports = factory();
	else root.vb = factory();
})(this, function () {
	var vb = {};


	// Capitalize the first character in a string:
	vb.capitalize = function(str) {
		return str.length ? str[0].toUpperCase() + str.slice(1) : str;
	};


	// Capitalize the first character in a string and add a period (or a custom char if specified) to the end:
	vb.sentence = function(str, end) {
		end = end || '.';
		return vb.capitalize(str) + end;
	};


	// Add an 's or just an ' as needed to show possession
	vb.givePossession = function(nounStr) {
		return nounStr + (nounStr[nounStr.length - 1] === 's' ? '\'' : '\'s');
	};


	//	Accepts an integer and an optional verb:
	//		vb.times(1, 'try')
	//	Returns the number of times paired with the verb:
	//		"try once"
	vb.times = function(num, verb) {
		var adv = ['never', 'once', 'twice'][num] || num + ' times';
		return verb ? (num ? verb + ' ' + adv : adv + ' ' + verb) : adv;
	};


	//	Accepts an array of items, and an optional coordinating conjunction ("and" is default):
	//		vb.list(['apples', 'oranges', 'bananas'])
	//	Returns a comma-delimited list with the conjunction before the last item if there are 3 or more:
	//		"apples, oranges, and bananas"
	vb.list = function(items, cunjunction) {
		cunjunction = ' ' + (cunjunction || 'and') + ' ';
		if (items.length < 3) return items.join(cunjunction);
		return items.slice(0, -1).join(', ') + ',' + cunjunction + items[items.length - 1];
	};


	//	Accepts two arrays -one with items to go before the 'but' and one with items for after.
	//	Also accepts an optional "cunjunctions" array with up to three values to specify which cunjuction
	//	to use for the first list, for between the two lists, and for the second list, respectively:
	//		vb.but(['apples', 'pears', 'oranges'], ['carrots', 'celery'], [], 'are fruit')
	//	Returns a comma-delimited list with the conjunction before the last item if there are 3 or more:
	//		"apples, pears, and oranges are fruit, but not carrots or celery"
	vb.but = function(aItems, bItems, cunjunctions, predicate) {
		cunjunctions = cunjunctions || [];
		aItems = vb.list(aItems, cunjunctions[0] || 'and');
		bItems = vb.list(bItems, cunjunctions[2] || 'or');
		predicate = predicate ? ' ' + predicate : '';
		return aItems + predicate + ', ' + (cunjunctions[1] || 'but not') + ' ' + bItems;
	};


	//	Accepts an integer:
	//		vb.order(312)
	//	Returns the integer's ordinal number:
	//		"312th"
	vb.order = function(num) {
		var mod100 = num % 100;
		var suffix = mod100 > 4 && mod100 < 21 ? 0 : ['st', 'nd', 'rd'][num % 10 - 1];
		return num + (suffix || 'th');
	};


	//	Accepts a singular noun:
	//		vb.aOrAn('apple')
	//	Returns the noun paired with the correct article:
	//		"an apple"
	//	false positives: "hour", "university", "FBI agent"
	vb.aOrAn = function(noun) {
		return ('aeiouAEIOU'.indexOf(noun[0]) >= 0 ? 'an ' : 'a ') + noun;
	};


	//	Accepts a singular noun:
	//		vb.plural('box')
	//	Returns the noun in plural form:
	//		"boxes"
	//	false positives: "ox", "potato", "goose", "deer", etc.
	vb.plural = function(noun) {
		var lastChar = noun.slice(-1);
		var last2;

		// if ends with 's', 'x', 'z', 'ch', or 'sh', add 'es'
		if ('sxz'.indexOf(lastChar) >= 0 ||
			['ch', 'sh'].indexOf(last2 = noun.slice(-2)) >= 0) return noun + 'es';

		// else, if ends with 'y', replace with 'ies'
		if (lastChar === 'y') return noun.slice(0, -1) + 'ies';

		// else, if ends with 'fe' or 'lf', replace f+ with 'ves'
		if (['fe', 'lf'].indexOf(last2) >= 0) {
			var fi = noun.lastIndexOf('f');
			return noun.slice(0, fi) + 'ves';
		}

		// else, if ends with 'man' replace with 'men'
		if (noun.slice(-3) === 'man') return noun.slice(0, -3) + 'men';

		// else add 's'
		return noun + 's';
	};


	//	Accepts a number, a singular noun, and an optional plural noun (plural is inferred using vb.plural if not given):
	//		vb.count(3, 'apple')
	//	Returns the number paired with the correct noun:
	//		"3 apples"
	vb.count = function(num, singular, plural) {
		plural = plural || vb.plural(singular);
		var noun = num === 1 ? singular : plural;
		return num + ' ' + noun;
	};


	return vb;
});
