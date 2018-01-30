var referenceSearchForm = qs('#reference-search-form');
var crossReferenceList = qs('#cross-references');

on(referenceSearchForm, 'submit', instead(function() {
	console.log('submitted')
	var referencesStr = this.references.value;

	// split references between every comma + optional whitespace
	//var references = referencesStr.split(/,\s*/);

	searchEngine.query(referencesStr);
}));





// When a query and the cross reference data are ready, call processQuery()
var searchEngine = (function() {
	var crossReferencesByOriginReference = {};
	var crossReferencesReady = false;
	var referencesQuery;

	// load cross reference data
	var crossReferenceFile = 'cross_references.txt';
	fetch(crossReferenceFile).then(response => response.text())
	.then(processCrossReferenceFile)
	.catch(function(error) {
	    console.error('Error fetching cross reference data:', error);
	});

	var processQuery = (function() {
		var bcv = new bcv_parser;
		bcv.set_options({"osis_compaction_strategy": "bcv"});

		function processQuery(referencesQuery) {
			var versesInQuery = expandOsis(bcv.parse(referencesQuery).osis()).split(',');
			var crossReferenceDataByTarget = {};

			// get a list of cross-reference target verses and their ranks
			versesInQuery.forEach(function(verseOsis) {
				var crossReferences = crossReferencesByOriginReference[verseOsis];
				if (crossReferences === undefined || crossReferences.length === 0) return;

				// calculate average number of votes per cross-reference
				var voteAverage = sumArray(crossReferences.map(function(crossReference) {
					return crossReference.votes;
				})) / crossReferences.length;

				crossReferences.forEach(function incrementReferenceCount(crossReferenceTargetObject) {
					var targetPassage = crossReferenceTargetObject.targetPassage;
					var voteCount = crossReferenceTargetObject.votes;
					var targetVerses = expandOsis(bcv.parse(targetPassage).osis()).split(',');

					for (var i = 0; i < targetVerses.length; i++) {
						var targetVerse = targetVerses[i];
						if (crossReferenceDataByTarget[targetVerse] === undefined) {
							crossReferenceDataByTarget[targetVerse] = {
								popularity: 0,
								referenceCount: 0,
							};
						}
						crossReferenceDataByTarget[targetVerse].referenceCount++;
						crossReferenceDataByTarget[targetVerse].popularity += voteCount / voteAverage;
					}
				});
			});

			displayResults(crossReferenceDataByTarget);
		}

		return processQuery;
	})();

	function processCrossReferenceFile(text) {
		// split on each new line
		var lines = text.split('\n').slice(1);
		lines.forEach(function(line) {

			// split each line into 3: origin reference, target reference, and # votes
			var parts = line.split('\t');
			var originReference = parts[0];
			var targetPassage = parts[1];
			var voteCount = parseInt(parts[2], 10);

			// store for easy lookup by origin reference
			if (crossReferencesByOriginReference[originReference] === undefined) {
				crossReferencesByOriginReference[originReference] = [];
			}
			crossReferencesByOriginReference[originReference].push({
				targetPassage: targetPassage,
				votes: voteCount
			});
		});
		crossReferencesReady = true;
		if (referencesQuery) {
			processQuery(referencesQuery);
		}
	}

	return {
		query: function query(referencesStr) {
			referencesQuery = referencesStr;
			if (crossReferencesReady) {
				processQuery(referencesQuery);
			}
		}
	};
})();

function displayResults(crossReferenceDataByTarget) {
	// create a standard array of objects (an object for each cross reference)
	var crossReferences = Object.keys(crossReferenceDataByTarget).map(function(key) {
		var obj = crossReferenceDataByTarget[key];
		obj.reference = key;
		return obj;
	})/*.filter(function(crossReference) {
		return crossReference.referenceCount >= 2;
	})*/;
	crossReferences = sortBy(crossReferences, 'popularity', 'descending');
	crossReferences = sortBy(crossReferences, 'referenceCount', 'descending');

	removeChilds(crossReferenceList);
	dom({
		el: crossReferenceList,
		kids: crossReferences.map(function(crossReference) {
			return {
				el: 'li',
				text: osisToEn("esv-long", crossReference.reference) + ': ' +
					vb.count(crossReference.referenceCount, 'reference') + ', ' +
					Math.round(crossReference.popularity * 100) + '% as popular as average'
			};
		})
	});
}

// Input a reference to a scripture passage in OSIS format e.g.: "2Co.6.14-2Co.7.1"
// Return an array of references for the verses in the passage:
// ["2Co.6.14", "2Co.6.15", "2Co.6.16", "2Co.6.17", "2Co.6.18", "2Co.7.1"]
var expandOsis = (function() {
	var find = new RegExp(
		'(\\w+)\\.' + // book
		'(\\d+)\\.' + // starting chapter
		'(\\d+)' + // starting verse
		'-' +
		'\\w+\\.' +   // book
		'(\\d+)\\.' + // ending chapter
		'(\\d+)',  // ending verse
		'g' // global flag (find all occurrences)
	);

	/*
		dataByBook = {
			abbreviation: {
				chapterCount: number,
				verseCountByChapter [null,number,number,...]
			},
			...
		}
	*/
	var dataByBook = {"Gen":{"chapterCount":50,"verseCountByChapter":[null,31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]},"Exod":{"chapterCount":40,"verseCountByChapter":[null,22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]},"Lev":{"chapterCount":27,"verseCountByChapter":[null,17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]},"Num":{"chapterCount":36,"verseCountByChapter":[null,54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]},"Deut":{"chapterCount":34,"verseCountByChapter":[null,46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]},"Josh":{"chapterCount":24,"verseCountByChapter":[null,18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]},"Judg":{"chapterCount":21,"verseCountByChapter":[null,36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]},"Ruth":{"chapterCount":4,"verseCountByChapter":[null,22,23,18,22]},"1Sam":{"chapterCount":31,"verseCountByChapter":[null,28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13]},"2Sam":{"chapterCount":24,"verseCountByChapter":[null,27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25]},"1Kgs":{"chapterCount":22,"verseCountByChapter":[null,53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53]},"2Kgs":{"chapterCount":25,"verseCountByChapter":[null,18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]},"1Chr":{"chapterCount":29,"verseCountByChapter":[null,54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30]},"2Chr":{"chapterCount":36,"verseCountByChapter":[null,17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23]},"Ezra":{"chapterCount":10,"verseCountByChapter":[null,11,70,13,24,17,22,28,36,15,44]},"Neh":{"chapterCount":13,"verseCountByChapter":[null,11,20,32,23,19,19,73,18,38,39,36,47,31]},"Esth":{"chapterCount":10,"verseCountByChapter":[null,22,23,15,17,14,14,10,17,32,3]},"Job":{"chapterCount":42,"verseCountByChapter":[null,22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]},"Ps":{"chapterCount":150,"verseCountByChapter":[null,6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]},"Prov":{"chapterCount":31,"verseCountByChapter":[null,33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]},"Eccl":{"chapterCount":12,"verseCountByChapter":[null,18,26,22,16,20,12,29,17,18,20,10,14]},"Song":{"chapterCount":8,"verseCountByChapter":[null,17,17,11,16,16,13,13,14]},"Isa":{"chapterCount":66,"verseCountByChapter":[null,31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24]},"Jer":{"chapterCount":52,"verseCountByChapter":[null,19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]},"Lam":{"chapterCount":5,"verseCountByChapter":[null,22,22,66,22,22]},"Ezek":{"chapterCount":48,"verseCountByChapter":[null,28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]},"Dan":{"chapterCount":12,"verseCountByChapter":[null,21,49,30,37,31,28,28,27,27,21,45,13]},"Hos":{"chapterCount":14,"verseCountByChapter":[null,11,23,5,19,15,11,16,14,17,15,12,14,16,9]},"Joel":{"chapterCount":3,"verseCountByChapter":[null,20,32,21]},"Amos":{"chapterCount":9,"verseCountByChapter":[null,15,16,15,13,27,14,17,14,15]},"Obad":{"chapterCount":1,"verseCountByChapter":[null,21]},"Jonah":{"chapterCount":4,"verseCountByChapter":[null,17,10,10,11]},"Mic":{"chapterCount":7,"verseCountByChapter":[null,16,13,12,13,15,16,20]},"Nah":{"chapterCount":3,"verseCountByChapter":[null,15,13,19]},"Hab":{"chapterCount":3,"verseCountByChapter":[null,17,20,19]},"Zeph":{"chapterCount":3,"verseCountByChapter":[null,18,15,20]},"Hag":{"chapterCount":2,"verseCountByChapter":[null,15,23]},"Zech":{"chapterCount":14,"verseCountByChapter":[null,21,13,10,14,11,15,14,23,17,12,17,14,9,21]},"Mal":{"chapterCount":4,"verseCountByChapter":[null,14,17,18,6]},"Matt":{"chapterCount":28,"verseCountByChapter":[null,25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]},"Mark":{"chapterCount":16,"verseCountByChapter":[null,45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20]},"Luke":{"chapterCount":24,"verseCountByChapter":[null,80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53]},"John":{"chapterCount":21,"verseCountByChapter":[null,51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]},"Acts":{"chapterCount":28,"verseCountByChapter":[null,26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31]},"Rom":{"chapterCount":16,"verseCountByChapter":[null,32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]},"1Cor":{"chapterCount":16,"verseCountByChapter":[null,31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]},"2Cor":{"chapterCount":13,"verseCountByChapter":[null,24,17,18,18,21,18,16,24,15,18,33,21,14]},"Gal":{"chapterCount":6,"verseCountByChapter":[null,24,21,29,31,26,18]},"Eph":{"chapterCount":6,"verseCountByChapter":[null,23,22,21,32,33,24]},"Phil":{"chapterCount":4,"verseCountByChapter":[null,30,30,21,23]},"Col":{"chapterCount":4,"verseCountByChapter":[null,29,23,25,18]},"1Thess":{"chapterCount":5,"verseCountByChapter":[null,10,20,13,18,28]},"2Thess":{"chapterCount":3,"verseCountByChapter":[null,12,17,18]},"1Tim":{"chapterCount":6,"verseCountByChapter":[null,20,15,16,16,25,21]},"2Tim":{"chapterCount":4,"verseCountByChapter":[null,18,26,17,22]},"Titus":{"chapterCount":3,"verseCountByChapter":[null,16,15,15]},"Phlm":{"chapterCount":1,"verseCountByChapter":[null,25]},"Heb":{"chapterCount":13,"verseCountByChapter":[null,14,18,19,16,14,20,28,13,28,39,40,29,25]},"Jas":{"chapterCount":5,"verseCountByChapter":[null,27,26,18,17,20]},"1Pet":{"chapterCount":5,"verseCountByChapter":[null,25,25,22,19,14]},"2Pet":{"chapterCount":3,"verseCountByChapter":[null,21,22,18]},"1John":{"chapterCount":5,"verseCountByChapter":[null,10,29,24,21,21]},"2John":{"chapterCount":1,"verseCountByChapter":[null,13]},"3John":{"chapterCount":1,"verseCountByChapter":[null,15]},"Jude":{"chapterCount":1,"verseCountByChapter":[null,25]},"Rev":{"chapterCount":22,"verseCountByChapter":[null,20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]}};

	function replace(match, book, startingChapter, startingVerse, endingChapter, endingVerse) {
		startingChapter = parseInt(startingChapter, 10);
		startingVerse   = parseInt(startingVerse, 10);
		endingChapter = parseInt(endingChapter, 10);
		endingVerse   = parseInt(endingVerse, 10);

		var verses = [];

		// Go through each chapter in the range
		for (var chapter = startingChapter; chapter <= endingChapter; chapter++) {
			var firstVerseInRangeInThisChapter = chapter === startingChapter ?
				startingVerse : 1;
			var lastVerseInRangeInThisChapter = endingChapter > chapter ?
				dataByBook[book].verseCountByChapter[chapter] :
				endingVerse;
			// Push every verse in this chapter onto verses array if it's within the range
			for (var verse = firstVerseInRangeInThisChapter; verse <= lastVerseInRangeInThisChapter; verse++) {
				verses.push(book + '.' + chapter + '.' + verse);
			}
		}

		return verses.join(',');
	}


	function expandOsis(osisStr) {
		return osisStr.replace(find, replace);
	}

	return expandOsis;
})();