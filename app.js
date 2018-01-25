var referenceSearchForm = qs('#reference-search-form');
var crossReferenceList = qs('#cross-references');

on(referenceSearchForm, 'submit', instead(function() {
	console.log('submitted')
	var referencesStr = this.references.value;

	// split references between every comma + optional whitespace
	//var references = referencesStr.split(/,\s*/);

	searchEngine.query(referencesStr);
}));





var processQuery = (function() {
	var bcv = new bcv_parser;

	function processQuery(referencesQuery) {
		console.log(bcv.parse(referencesQuery).osis());
		// get a list of target verses and their ranks
	}

	return processQuery;
})();


// process a query when a query and the cross reference data are ready
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
			crossReferencesByOriginReference[originReference] = {
				targetPassage: targetPassage,
				votes: voteCount
			};
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
		},

	};
})();