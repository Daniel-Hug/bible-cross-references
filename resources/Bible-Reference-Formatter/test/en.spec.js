"use strict"
/* global require, describe, it, expect */
const osisToLang = require("../es6/en")

function loopTest(osises) {
	for (const osisKey of Object.keys(osises)) {
		const [osis, context] = osisKey.split("/")
		for (const style of Object.keys(osises[osisKey])) {
			expect(osisToLang(style, osis, context)).toEqual(osises[osisKey][style])
		}
	}
}

describe("Exceptions", function() {
	it("should throw when given an invalid style", function() {
		expect(() => osisToLang("INVALID STYLE", "Matt.1")).toThrow()
	})
})

describe("Initialization", function() {
	it("should initialize", function() {
		loopTest({
			"Matt.1.2": {
				"esv-long": "Matthew 1:2",
				"esv-short": "Matt. 1:2",
				"niv-long": "Matthew 1:2",
				"niv-short": "Matt 1:2",
				"niv-shortest": "Mt 1:2",
				"nlt-long": "Matthew 1:2",
				"nlt-short": "Matt 1:2"
			}
		})
	})
})

describe("Readme", function() {
	it("should match examples", function() {
		loopTest({
			"Matt.1.2-Matt.1.3,Matt.1.4": {
				"esv-long": "Matthew 1:2\u20133, 4",
				"esv-short": "Matt. 1:2\u20133, 4",
				"niv-long": "Matthew 1:2\u20133,4",
				"niv-short": "Matt 1:2\u20133,4",
				"niv-shortest": "Mt 1:2-3, 4",
				"nlt-long": "Matthew 1:2\u20133, 4",
				"nlt-short": "Matt 1:2\u20133, 4"
			},
			"Matt.1.2-Matt.1.3,Matt.1.4/Matt.1": {
				"esv-long": "vv. 2\u20133, 4",
				"esv-short": "vv. 2\u20133, 4",
				"niv-long": "vv. 2\u20133,4",
				"niv-short": "vv. 2\u20133,4",
				"niv-shortest": "ver 2-3, 4",
				"nlt-long": "vv 2\u20133, 4",
				"nlt-short": "vv 2\u20133, 4"
			},
			"Matt.1.2-Matt.1.3,Matt.1.4/Matt": {
				"esv-long": "1:2\u20133, 4",
				"esv-short": "1:2\u20133, 4",
				"niv-long": "1:2\u20133,4",
				"niv-short": "1:2\u20133,4",
				"niv-shortest": "1:2-3, 4",
				"nlt-long": "1:2\u20133, 4",
				"nlt-short": "1:2\u20133, 4"
			}
		})
	})
})

describe("Book names", function() {
	it("should match unusual book names", function() {
		loopTest({
			"Song": {
				"esv-long": "Song of Solomon",
				"esv-short": "Song",
				"niv-long": "Song of Songs",
				"niv-short": "Song",
				"niv-shortest": "SS",
				"nlt-long": "Song of Songs",
				"nlt-short": "Song"
			},
			"Ps": {
				"esv-long": "Psalms",
				"esv-short": "Pss.",
				"niv-long": "Psalms",
				"niv-short": "Pss",
				"niv-shortest": "Ps",
				"nlt-long": "Psalms",
				"nlt-short": "Pss"
			},
			"SgThree": {
				"esv-long": "Song of the Three Jews",
				"esv-short": "Song of the Three Jews",
				"niv-long": "Song of the Three Holy Children",
				"niv-short": "S of III Ch",
				"niv-shortest": "STHC",
				"nlt-long": "Song of the Three Jews",
				"nlt-short": "Pr Azar"
			}
		})
	})
})

describe("`b` ranges", function() {
	it("should handle `b-same b`", function() {
		loopTest({
			"Gen-Gen": {
				"esv-long": "Genesis\u2014Genesis",
				"esv-short": "Gen.\u2014Gen.",
				"niv-long": "Genesis\u2014Genesis",
				"niv-short": "Gen\u2014Gen",
				"niv-shortest": "Ge-Ge",
				"nlt-long": "Genesis\u2014Genesis",
				"nlt-short": "Gen\u2014Gen"
			},
			"Gen-Gen.1": {
				"esv-long": "Genesis\u2014ch. 1",
				"esv-short": "Gen.\u2014ch. 1",
				"niv-long": "Genesis\u2014ch. 1",
				"niv-short": "Gen\u2014ch. 1",
				"niv-shortest": "Ge-Ge 1",
				"nlt-long": "Genesis\u2014ch 1",
				"nlt-short": "Gen\u2014ch 1"
			},
			"Gen-Gen.1.2": {
				"esv-long": "Genesis\u2014ch. 1:2",
				"esv-short": "Gen.\u2014ch. 1:2",
				"niv-long": "Genesis\u2014ch. 1:2",
				"niv-short": "Gen\u2014ch. 1:2",
				"niv-shortest": "Ge-Ge 1:2",
				"nlt-long": "Genesis\u2014ch 1:2",
				"nlt-short": "Gen\u2014ch 1:2"
			}
		})
	})
	it("should handle `b-different b`", function() {
		loopTest({
			"Gen-Matt": {
				"esv-long": "Genesis\u2014Matthew",
				"esv-short": "Gen.\u2014Matt.",
				"niv-long": "Genesis\u2014Matthew",
				"niv-short": "Gen\u2014Matt",
				"niv-shortest": "Ge-Mt",
				"nlt-long": "Genesis\u2014Matthew",
				"nlt-short": "Gen\u2014Matt"
			},
			"Gen-Matt.1": {
				"esv-long": "Genesis\u2014Matthew 1",
				"esv-short": "Gen.\u2014Matt. 1",
				"niv-long": "Genesis\u2014Matthew 1",
				"niv-short": "Gen\u2014Matt 1",
				"niv-shortest": "Ge-Mt 1",
				"nlt-long": "Genesis\u2014Matthew 1",
				"nlt-short": "Gen\u2014Matt 1"
			},
			"Gen-Matt.1.2": {
				"esv-long": "Genesis\u2014Matthew 1:2",
				"esv-short": "Gen.\u2014Matt. 1:2",
				"niv-long": "Genesis\u2014Matthew 1:2",
				"niv-short": "Gen\u2014Matt 1:2",
				"niv-shortest": "Ge-Mt 1:2",
				"nlt-long": "Genesis\u2014Matthew 1:2",
				"nlt-short": "Gen\u2014Matt 1:2"
			}
		})
	})
	it("should handle `b-different, single-chapter b`", function() {
		loopTest({
			"Gen-Phlm": {
				"esv-long": "Genesis\u2014Philemon",
				"esv-short": "Gen.\u2014Philem.",
				"niv-long": "Genesis\u2014Philemon",
				"niv-short": "Gen\u2014Phlm",
				"niv-shortest": "Ge-Phm",
				"nlt-long": "Genesis\u2014Philemon",
				"nlt-short": "Gen\u2014Phlm"
			},
			"Gen-Phlm.1": {
				"esv-long": "Genesis\u2014Philemon",
				"esv-short": "Gen.\u2014Philem.",
				"niv-long": "Genesis\u2014Philemon",
				"niv-short": "Gen\u2014Phlm",
				"niv-shortest": "Ge-Phm",
				"nlt-long": "Genesis\u2014Philemon",
				"nlt-short": "Gen\u2014Phlm"
			},
			"Gen-Phlm.1.2": {
				"esv-long": "Genesis\u2014Philemon 2",
				"esv-short": "Gen.\u2014Philem. 2",
				"niv-long": "Genesis\u2014Philemon 2",
				"niv-short": "Gen\u2014Phlm 2",
				"niv-shortest": "Ge-Phm 2",
				"nlt-long": "Genesis\u2014Philemon 2",
				"nlt-short": "Gen\u2014Phlm 2"
			}
		})
	})
	it("should handle `b-Ps151`", function() {
		loopTest({
			"Gen-Ps151": {
				"esv-long": "Genesis\u2014Psalm 151",
				"esv-short": "Gen.\u2014Ps. 151",
				"niv-long": "Genesis\u2014Psalm 151",
				"niv-short": "Gen\u2014Ps 151",
				"niv-shortest": "Ge-Ps 151",
				"nlt-long": "Genesis\u2014Psalm 151",
				"nlt-short": "Gen\u2014Ps 151"
			},
			"Gen-Ps151.1": {
				"esv-long": "Genesis\u2014Psalm 151",
				"esv-short": "Gen.\u2014Ps. 151",
				"niv-long": "Genesis\u2014Psalm 151",
				"niv-short": "Gen\u2014Ps 151",
				"niv-shortest": "Ge-Ps 151",
				"nlt-long": "Genesis\u2014Psalm 151",
				"nlt-short": "Gen\u2014Ps 151"
			},
			"Gen-Ps151.1.2": {
				"esv-long": "Genesis\u2014Psalm 151:2",
				"esv-short": "Gen.\u2014Ps. 151:2",
				"niv-long": "Genesis\u2014Psalm 151:2",
				"niv-short": "Gen\u2014Ps 151:2",
				"niv-shortest": "Ge-Ps 151:2",
				"nlt-long": "Genesis\u2014Psalm 151:2",
				"nlt-short": "Gen\u2014Ps 151:2"
			}
		})
	})
	it("should handle `Ps-Ps151`", function() {
		loopTest({
			"Ps-Ps151": {
				"esv-long": "Psalms\u2014Psalm 151",
				"esv-short": "Pss.\u2014Ps. 151",
				"niv-long": "Psalms\u2014Psalm 151",
				"niv-short": "Pss\u2014Ps 151",
				"niv-shortest": "Ps-Ps 151",
				"nlt-long": "Psalms\u2014Psalm 151",
				"nlt-short": "Pss\u2014Ps 151"
			},
			"Ps-Ps151.1": {
				"esv-long": "Psalms\u2014Psalm 151",
				"esv-short": "Pss.\u2014Ps. 151",
				"niv-long": "Psalms\u2014Psalm 151",
				"niv-short": "Pss\u2014Ps 151",
				"niv-shortest": "Ps-Ps 151",
				"nlt-long": "Psalms\u2014Psalm 151",
				"nlt-short": "Pss\u2014Ps 151"
			},
			"Ps-Ps151.1.2": {
				"esv-long": "Psalms\u2014Psalm 151:2",
				"esv-short": "Pss.\u2014Ps. 151:2",
				"niv-long": "Psalms\u2014Psalm 151:2",
				"niv-short": "Pss\u2014Ps 151:2",
				"niv-shortest": "Ps-Ps 151:2",
				"nlt-long": "Psalms\u2014Psalm 151:2",
				"nlt-short": "Pss\u2014Ps 151:2"
			}
		})
	})
	it("should handle `single-chapter b-same b`", function() {
		loopTest({
			"Phlm-Phlm": {
				"esv-long": "Philemon\u2014Philemon",
				"esv-short": "Philem.\u2014Philem.",
				"niv-long": "Philemon\u2014Philemon",
				"niv-short": "Phlm\u2014Phlm",
				"niv-shortest": "Phm-Phm",
				"nlt-long": "Philemon\u2014Philemon",
				"nlt-short": "Phlm\u2014Phlm"
			},
			"Phlm-Phlm.1": {
				"esv-long": "Philemon\u2014Philemon",
				"esv-short": "Philem.\u2014Philem.",
				"niv-long": "Philemon\u2014Philemon",
				"niv-short": "Phlm\u2014Phlm",
				"niv-shortest": "Phm-Phm",
				"nlt-long": "Philemon\u2014Philemon",
				"nlt-short": "Phlm\u2014Phlm"
			},
			"Phlm-Phlm.1.2": {
				"esv-long": "Philemon\u2014Philemon 2",
				"esv-short": "Philem.\u2014Philem. 2",
				"niv-long": "Philemon\u2014Philemon 2",
				"niv-short": "Phlm\u2014Phlm 2",
				"niv-shortest": "Phm-Phm 2",
				"nlt-long": "Philemon\u2014Philemon 2",
				"nlt-short": "Phlm\u2014Phlm 2"
			}
		})
	})
	it("should handle `single-chapter b-different b`", function() {
		loopTest({
			"Phlm-Rev": {
				"esv-long": "Philemon\u2014Revelation",
				"esv-short": "Philem.\u2014Rev.",
				"niv-long": "Philemon\u2014Revelation",
				"niv-short": "Phlm\u2014Rev",
				"niv-shortest": "Phm-Rev",
				"nlt-long": "Philemon\u2014Revelation",
				"nlt-short": "Phlm\u2014Rev"
			},
			"Phlm-Rev.1": {
				"esv-long": "Philemon\u2014Revelation 1",
				"esv-short": "Philem.\u2014Rev. 1",
				"niv-long": "Philemon\u2014Revelation 1",
				"niv-short": "Phlm\u2014Rev 1",
				"niv-shortest": "Phm-Rev 1",
				"nlt-long": "Philemon\u2014Revelation 1",
				"nlt-short": "Phlm\u2014Rev 1"
			},
			"Phlm-Rev.1.2": {
				"esv-long": "Philemon\u2014Revelation 1:2",
				"esv-short": "Philem.\u2014Rev. 1:2",
				"niv-long": "Philemon\u2014Revelation 1:2",
				"niv-short": "Phlm\u2014Rev 1:2",
				"niv-shortest": "Phm-Rev 1:2",
				"nlt-long": "Philemon\u2014Revelation 1:2",
				"nlt-short": "Phlm\u2014Rev 1:2"
			}
		})
	})
	it("should handle `single-chapter b-different single-chapter b`", function() {
		loopTest({
			"Phlm-Jude": {
				"esv-long": "Philemon\u2014Jude",
				"esv-short": "Philem.\u2014Jude",
				"niv-long": "Philemon\u2014Jude",
				"niv-short": "Phlm\u2014Jude",
				"niv-shortest": "Phm-Jude",
				"nlt-long": "Philemon\u2014Jude",
				"nlt-short": "Phlm\u2014Jude"
			},
			"Phlm-Jude.1": {
				"esv-long": "Philemon\u2014Jude",
				"esv-short": "Philem.\u2014Jude",
				"niv-long": "Philemon\u2014Jude",
				"niv-short": "Phlm\u2014Jude",
				"niv-shortest": "Phm-Jude",
				"nlt-long": "Philemon\u2014Jude",
				"nlt-short": "Phlm\u2014Jude"
			},
			"Phlm-Jude.1.2": {
				"esv-long": "Philemon\u2014Jude 2",
				"esv-short": "Philem.\u2014Jude 2",
				"niv-long": "Philemon\u2014Jude 2",
				"niv-short": "Phlm\u2014Jude 2",
				"niv-shortest": "Phm-Jude 2",
				"nlt-long": "Philemon\u2014Jude 2",
				"nlt-short": "Phlm\u2014Jude 2"
			}
		})
	})
	it("should handle special book ranges", function() {
		loopTest({
			"1Sam-2Sam": {
				"esv-long": "1\u20142 Samuel",
				"esv-short": "1\u20142 Sam.",
				"niv-long": "1\u20142 Samuel",
				"niv-short": "1\u20142 Sam",
				"niv-shortest": "1-2Sa",
				"nlt-long": "1\u20142 Samuel",
				"nlt-short": "1\u20142 Sam"
			},
			"1Kgs-2Kgs": {
				"esv-long": "1\u20142 Kings",
				"esv-short": "1\u20142 Kings",
				"niv-long": "1\u20142 Kings",
				"niv-short": "1\u20142 Kgs",
				"niv-shortest": "1-2Ki",
				"nlt-long": "1\u20142 Kings",
				"nlt-short": "1\u20142 Kgs"
			},
			"1Chr-2Chr": {
				"esv-long": "1\u20142 Chronicles",
				"esv-short": "1\u20142 Chron.",
				"niv-long": "1\u20142 Chronicles",
				"niv-short": "1\u20142 Chr",
				"niv-shortest": "1-2Ch",
				"nlt-long": "1\u20142 Chronicles",
				"nlt-short": "1\u20142 Chr"
			},
			"1Cor-2Cor": {
				"esv-long": "1\u20142 Corinthians",
				"esv-short": "1\u20142 Cor.",
				"niv-long": "1\u20142 Corinthians",
				"niv-short": "1\u20142 Cor",
				"niv-shortest": "1-2Co",
				"nlt-long": "1\u20142 Corinthians",
				"nlt-short": "1\u20142 Cor"
			},
			"1Thess-2Thess": {
				"esv-long": "1\u20142 Thessalonians",
				"esv-short": "1\u20142 Thess.",
				"niv-long": "1\u20142 Thessalonians",
				"niv-short": "1\u20142 Thess",
				"niv-shortest": "1-2Th",
				"nlt-long": "1\u20142 Thessalonians",
				"nlt-short": "1\u20142 Thes"
			},
			"1Tim-2Tim": {
				"esv-long": "1\u20142 Timothy",
				"esv-short": "1\u20142 Tim.",
				"niv-long": "1\u20142 Timothy",
				"niv-short": "1\u20142 Tim",
				"niv-shortest": "1-2Ti",
				"nlt-long": "1\u20142 Timothy",
				"nlt-short": "1\u20142 Tim"
			},
			"1Pet-2Pet": {
				"esv-long": "1\u20142 Peter",
				"esv-short": "1\u20142 Pet.",
				"niv-long": "1\u20142 Peter",
				"niv-short": "1\u20142 Pet",
				"niv-shortest": "1-2Pe",
				"nlt-long": "1\u20142 Peter",
				"nlt-short": "1\u20142 Pet"
			},
			"1John-2John": {
				"esv-long": "1\u20142 John",
				"esv-short": "1\u20142 John",
				"niv-long": "1\u20142 John",
				"niv-short": "1\u20142 John",
				"niv-shortest": "1-2Jn",
				"nlt-long": "1\u20142 John",
				"nlt-short": "1\u20142 Jn"
			},
			"1John-3John": {
				"esv-long": "1\u20143 John",
				"esv-short": "1\u20143 John",
				"niv-long": "1\u20143 John",
				"niv-short": "1\u20143 John",
				"niv-shortest": "1-3Jn",
				"nlt-long": "1\u20143 John",
				"nlt-short": "1\u20143 Jn"
			},
			"2John-3John": {
				"esv-long": "2\u20143 John",
				"esv-short": "2\u20143 John",
				"niv-long": "2\u20143 John",
				"niv-short": "2\u20143 John",
				"niv-shortest": "2-3Jn",
				"nlt-long": "2\u20143 John",
				"nlt-short": "2\u20143 Jn"
			},
			"1Macc-2Macc": {
				"esv-long": "1\u20142 Maccabees",
				"esv-short": "1\u20142 Macc.",
				"niv-long": "1\u20142 Maccabees",
				"niv-short": "1\u20142 Macc",
				"niv-shortest": "1-2Mc",
				"nlt-long": "1\u20142 Maccabees",
				"nlt-short": "1\u20142 Macc"
			},
			"1Macc-3Macc": {
				"esv-long": "1\u20143 Maccabees",
				"esv-short": "1\u20143 Macc.",
				"niv-long": "1\u20143 Maccabees",
				"niv-short": "1\u20143 Macc",
				"niv-shortest": "1-3Mc",
				"nlt-long": "1\u20143 Maccabees",
				"nlt-short": "1\u20143 Macc"
			},
			"1Macc-4Macc": {
				"esv-long": "1\u20144 Maccabees",
				"esv-short": "1\u20144 Macc.",
				"niv-long": "1\u20144 Maccabees",
				"niv-short": "1\u20144 Macc",
				"niv-shortest": "1-4Mc",
				"nlt-long": "1\u20144 Maccabees",
				"nlt-short": "1\u20144 Macc"
			},
			"2Macc-3Macc": {
				"esv-long": "2\u20143 Maccabees",
				"esv-short": "2\u20143 Macc.",
				"niv-long": "2\u20143 Maccabees",
				"niv-short": "2\u20143 Macc",
				"niv-shortest": "2-3Mc",
				"nlt-long": "2\u20143 Maccabees",
				"nlt-short": "2\u20143 Macc"
			},
			"2Macc-4Macc": {
				"esv-long": "2\u20144 Maccabees",
				"esv-short": "2\u20144 Macc.",
				"niv-long": "2\u20144 Maccabees",
				"niv-short": "2\u20144 Macc",
				"niv-shortest": "2-4Mc",
				"nlt-long": "2\u20144 Maccabees",
				"nlt-short": "2\u20144 Macc"
			},
			"3Macc-4Macc": {
				"esv-long": "3\u20144 Maccabees",
				"esv-short": "3\u20144 Macc.",
				"niv-long": "3\u20144 Maccabees",
				"niv-short": "3\u20144 Macc",
				"niv-shortest": "3-4Mc",
				"nlt-long": "3\u20144 Maccabees",
				"nlt-short": "3\u20144 Macc"
			},
			"1Esd-2Esd": {
				"esv-long": "1\u20142 Esdras",
				"esv-short": "1\u20142 Esd.",
				"niv-long": "1\u20142 Esdras",
				"niv-short": "1\u20142 Esd",
				"niv-shortest": "1-2Es",
				"nlt-long": "1\u20142 Esdras",
				"nlt-short": "1\u20142 Esd"
			}
		})
	})
})

describe("`bc` ranges", function() {
	it("should handle `bc-same b`", function() {
		loopTest({
			"Gen.1-Gen": {
				"esv-long": "Genesis 1\u2014Genesis",
				"esv-short": "Gen. 1\u2014Gen.",
				"niv-long": "Genesis 1\u2014Genesis",
				"niv-short": "Gen 1\u2014Gen",
				"niv-shortest": "Ge 1-Ge",
				"nlt-long": "Genesis 1\u2014Genesis",
				"nlt-short": "Gen 1\u2014Gen"
			},
			"Gen.1-Gen.2": {
				"esv-long": "Genesis 1\u20142",
				"esv-short": "Gen. 1\u20142",
				"niv-long": "Genesis 1\u20142",
				"niv-short": "Gen 1\u20142",
				"niv-shortest": "Ge 1-2",
				"nlt-long": "Genesis 1\u20142",
				"nlt-short": "Gen 1\u20142"
			},
			"Gen.1-Gen.2.3": {
				"esv-long": "Genesis 1\u20142:3",
				"esv-short": "Gen. 1\u20142:3",
				"niv-long": "Genesis 1\u20142:3",
				"niv-short": "Gen 1\u20142:3",
				"niv-shortest": "Ge 1-2:3",
				"nlt-long": "Genesis 1\u20142:3",
				"nlt-short": "Gen 1\u20142:3"
			}
		})
	})
	it("should handle `bc-same bc`", function() {
		loopTest({
			"Gen.1-Gen.1": {
				"esv-long": "Genesis 1\u20141",
				"esv-short": "Gen. 1\u20141",
				"niv-long": "Genesis 1\u20141",
				"niv-short": "Gen 1\u20141",
				"niv-shortest": "Ge 1-1",
				"nlt-long": "Genesis 1\u20141",
				"nlt-short": "Gen 1\u20141"
			},
			"Gen.1-Gen.1.2": {
				"esv-long": "Genesis 1\u20141:2",
				"esv-short": "Gen. 1\u20141:2",
				"niv-long": "Genesis 1\u20141:2",
				"niv-short": "Gen 1\u20141:2",
				"niv-shortest": "Ge 1-1:2",
				"nlt-long": "Genesis 1\u20141:2",
				"nlt-short": "Gen 1\u20141:2"
			}
		})
	})
	it("should handle `bc-different b`", function() {
		loopTest({
			"Gen.1-Matt": {
				"esv-long": "Genesis 1\u2014Matthew",
				"esv-short": "Gen. 1\u2014Matt.",
				"niv-long": "Genesis 1\u2014Matthew",
				"niv-short": "Gen 1\u2014Matt",
				"niv-shortest": "Ge 1-Mt",
				"nlt-long": "Genesis 1\u2014Matthew",
				"nlt-short": "Gen 1\u2014Matt"
			},
			"Gen.1-Matt.2": {
				"esv-long": "Genesis 1\u2014Matthew 2",
				"esv-short": "Gen. 1\u2014Matt. 2",
				"niv-long": "Genesis 1\u2014Matthew 2",
				"niv-short": "Gen 1\u2014Matt 2",
				"niv-shortest": "Ge 1-Mt 2",
				"nlt-long": "Genesis 1\u2014Matthew 2",
				"nlt-short": "Gen 1\u2014Matt 2"
			},
			"Gen.1-Matt.2.3": {
				"esv-long": "Genesis 1\u2014Matthew 2:3",
				"esv-short": "Gen. 1\u2014Matt. 2:3",
				"niv-long": "Genesis 1\u2014Matthew 2:3",
				"niv-short": "Gen 1\u2014Matt 2:3",
				"niv-shortest": "Ge 1-Mt 2:3",
				"nlt-long": "Genesis 1\u2014Matthew 2:3",
				"nlt-short": "Gen 1\u2014Matt 2:3"
			}
		})
	})
	it("should handle `bc-different, single-chapter b`", function() {
		loopTest({
			"Gen.1-Phlm": {
				"esv-long": "Genesis 1\u2014Philemon",
				"esv-short": "Gen. 1\u2014Philem.",
				"niv-long": "Genesis 1\u2014Philemon",
				"niv-short": "Gen 1\u2014Phlm",
				"niv-shortest": "Ge 1-Phm",
				"nlt-long": "Genesis 1\u2014Philemon",
				"nlt-short": "Gen 1\u2014Phlm"
			},
			"Gen.1-Phlm.1": {
				"esv-long": "Genesis 1\u2014Philemon",
				"esv-short": "Gen. 1\u2014Philem.",
				"niv-long": "Genesis 1\u2014Philemon",
				"niv-short": "Gen 1\u2014Phlm",
				"niv-shortest": "Ge 1-Phm",
				"nlt-long": "Genesis 1\u2014Philemon",
				"nlt-short": "Gen 1\u2014Phlm"
			},
			"Gen.1-Phlm.1.2": {
				"esv-long": "Genesis 1\u2014Philemon 2",
				"esv-short": "Gen. 1\u2014Philem. 2",
				"niv-long": "Genesis 1\u2014Philemon 2",
				"niv-short": "Gen 1\u2014Phlm 2",
				"niv-shortest": "Ge 1-Phm 2",
				"nlt-long": "Genesis 1\u2014Philemon 2",
				"nlt-short": "Gen 1\u2014Phlm 2"
			}
		})
	})
	it("should handle `bc-Ps151`", function() {
		loopTest({
			"Gen.1-Ps151": {
				"esv-long": "Genesis 1\u2014Psalm 151",
				"esv-short": "Gen. 1\u2014Ps. 151",
				"niv-long": "Genesis 1\u2014Psalm 151",
				"niv-short": "Gen 1\u2014Ps 151",
				"niv-shortest": "Ge 1-Ps 151",
				"nlt-long": "Genesis 1\u2014Psalm 151",
				"nlt-short": "Gen 1\u2014Ps 151"
			},
			"Gen.1-Ps151.1": {
				"esv-long": "Genesis 1\u2014Psalm 151",
				"esv-short": "Gen. 1\u2014Ps. 151",
				"niv-long": "Genesis 1\u2014Psalm 151",
				"niv-short": "Gen 1\u2014Ps 151",
				"niv-shortest": "Ge 1-Ps 151",
				"nlt-long": "Genesis 1\u2014Psalm 151",
				"nlt-short": "Gen 1\u2014Ps 151"
			},
			"Gen.1-Ps151.1.2": {
				"esv-long": "Genesis 1\u2014Psalm 151:2",
				"esv-short": "Gen. 1\u2014Ps. 151:2",
				"niv-long": "Genesis 1\u2014Psalm 151:2",
				"niv-short": "Gen 1\u2014Ps 151:2",
				"niv-shortest": "Ge 1-Ps 151:2",
				"nlt-long": "Genesis 1\u2014Psalm 151:2",
				"nlt-short": "Gen 1\u2014Ps 151:2"
			}
		})
	})
	it("should handle `Ps.c-Ps151`", function() {
		loopTest({
			"Ps.1-Ps151": {
				"esv-long": "Psalms 1\u2014151",
				"esv-short": "Pss. 1\u2014151",
				"niv-long": "Psalms 1\u2014151",
				"niv-short": "Pss 1\u2014151",
				"niv-shortest": "Ps 1-151",
				"nlt-long": "Psalms 1\u2014151",
				"nlt-short": "Pss 1\u2014151"
			},
			"Ps.1-Ps151.1": {
				"esv-long": "Psalms 1\u2014151",
				"esv-short": "Pss. 1\u2014151",
				"niv-long": "Psalms 1\u2014151",
				"niv-short": "Pss 1\u2014151",
				"niv-shortest": "Ps 1-151",
				"nlt-long": "Psalms 1\u2014151",
				"nlt-short": "Pss 1\u2014151"
			},
			"Ps.1-Ps151.1.2": {
				"esv-long": "Psalms 1\u2014151:2",
				"esv-short": "Pss. 1\u2014151:2",
				"niv-long": "Psalms 1\u2014151:2",
				"niv-short": "Pss 1\u2014151:2",
				"niv-shortest": "Ps 1-151:2",
				"nlt-long": "Psalms 1\u2014151:2",
				"nlt-short": "Pss 1\u2014151:2"
			}
		})
	})
	it("should handle single-chapter bc-same b`", function() {
		loopTest({
			"Phlm.1-Phlm": {
				"esv-long": "Philemon\u2014Philemon",
				"esv-short": "Philem.\u2014Philem.",
				"niv-long": "Philemon\u2014Philemon",
				"niv-short": "Phlm\u2014Phlm",
				"niv-shortest": "Phm-Phm",
				"nlt-long": "Philemon\u2014Philemon",
				"nlt-short": "Phlm\u2014Phlm"
			},
			"Phlm.1-Phlm.1": {
				"esv-long": "Philemon\u2014Philemon",
				"esv-short": "Philem.\u2014Philem.",
				"niv-long": "Philemon\u2014Philemon",
				"niv-short": "Phlm\u2014Phlm",
				"niv-shortest": "Phm-Phm",
				"nlt-long": "Philemon\u2014Philemon",
				"nlt-short": "Phlm\u2014Phlm"
			},
			"Phlm.1-Phlm.1.2": {
				"esv-long": "Philemon\u2014Philemon 2",
				"esv-short": "Philem.\u2014Philem. 2",
				"niv-long": "Philemon\u2014Philemon 2",
				"niv-short": "Phlm\u2014Phlm 2",
				"niv-shortest": "Phm-Phm 2",
				"nlt-long": "Philemon\u2014Philemon 2",
				"nlt-short": "Phlm\u2014Phlm 2"
			}
		})
	})
	it("should handle `single-chapter bc-different b`", function() {
		loopTest({
			"Phlm.1-Rev": {
				"esv-long": "Philemon\u2014Revelation",
				"esv-short": "Philem.\u2014Rev.",
				"niv-long": "Philemon\u2014Revelation",
				"niv-short": "Phlm\u2014Rev",
				"niv-shortest": "Phm-Rev",
				"nlt-long": "Philemon\u2014Revelation",
				"nlt-short": "Phlm\u2014Rev"
			},
			"Phlm.1-Rev.1": {
				"esv-long": "Philemon\u2014Revelation 1",
				"esv-short": "Philem.\u2014Rev. 1",
				"niv-long": "Philemon\u2014Revelation 1",
				"niv-short": "Phlm\u2014Rev 1",
				"niv-shortest": "Phm-Rev 1",
				"nlt-long": "Philemon\u2014Revelation 1",
				"nlt-short": "Phlm\u2014Rev 1"
			},
			"Phlm.1-Rev.1.2": {
				"esv-long": "Philemon\u2014Revelation 1:2",
				"esv-short": "Philem.\u2014Rev. 1:2",
				"niv-long": "Philemon\u2014Revelation 1:2",
				"niv-short": "Phlm\u2014Rev 1:2",
				"niv-shortest": "Phm-Rev 1:2",
				"nlt-long": "Philemon\u2014Revelation 1:2",
				"nlt-short": "Phlm\u2014Rev 1:2"
			}
		})
	})
	it("should handle `single-chapter bc-different single-chapter b`", function() {
		loopTest({
			"Phlm.1-Jude": {
				"esv-long": "Philemon\u2014Jude",
				"esv-short": "Philem.\u2014Jude",
				"niv-long": "Philemon\u2014Jude",
				"niv-short": "Phlm\u2014Jude",
				"niv-shortest": "Phm-Jude",
				"nlt-long": "Philemon\u2014Jude",
				"nlt-short": "Phlm\u2014Jude"
			},
			"Phlm.1-Jude.1": {
				"esv-long": "Philemon\u2014Jude",
				"esv-short": "Philem.\u2014Jude",
				"niv-long": "Philemon\u2014Jude",
				"niv-short": "Phlm\u2014Jude",
				"niv-shortest": "Phm-Jude",
				"nlt-long": "Philemon\u2014Jude",
				"nlt-short": "Phlm\u2014Jude"
			},
			"Phlm.1-Jude.1.2": {
				"esv-long": "Philemon\u2014Jude 2",
				"esv-short": "Philem.\u2014Jude 2",
				"niv-long": "Philemon\u2014Jude 2",
				"niv-short": "Phlm\u2014Jude 2",
				"niv-shortest": "Phm-Jude 2",
				"nlt-long": "Philemon\u2014Jude 2",
				"nlt-short": "Phlm\u2014Jude 2"
			}
		})
	})
})

describe("`bcv` ranges", function() {
	it("should handle `bcv-same b`", function() {
		loopTest({
			"Gen.1.1-Gen": {
				"esv-long": "Genesis 1:1\u2014Genesis",
				"esv-short": "Gen. 1:1\u2014Gen.",
				"niv-long": "Genesis 1:1\u2014Genesis",
				"niv-short": "Gen 1:1\u2014Gen",
				"niv-shortest": "Ge 1:1-Ge",
				"nlt-long": "Genesis 1:1\u2014Genesis",
				"nlt-short": "Gen 1:1\u2014Gen"
			},
			"Gen.1.1-Gen.2": {
				"esv-long": "Genesis 1:1\u2014ch. 2",
				"esv-short": "Gen. 1:1\u2014ch. 2",
				"niv-long": "Genesis 1:1\u2014ch. 2",
				"niv-short": "Gen 1:1\u2014ch. 2",
				"niv-shortest": "Ge 1:1-Ge 2",
				"nlt-long": "Genesis 1:1\u2014ch 2",
				"nlt-short": "Gen 1:1\u2014ch 2"
			},
			"Gen.1.1-Gen.2.3": {
				"esv-long": "Genesis 1:1\u20142:3",
				"esv-short": "Gen. 1:1\u20142:3",
				"niv-long": "Genesis 1:1\u20142:3",
				"niv-short": "Gen 1:1\u20142:3",
				"niv-shortest": "Ge 1:1-2:3",
				"nlt-long": "Genesis 1:1\u20142:3",
				"nlt-short": "Gen 1:1\u20142:3"
			}
		})
	})
	it("should handle `bcv-same bc`", function() {
		loopTest({
			"Gen.1.1-Gen.1": {
				"esv-long": "Genesis 1:1\u2014ch. 1",
				"esv-short": "Gen. 1:1\u2014ch. 1",
				"niv-long": "Genesis 1:1\u2014ch. 1",
				"niv-short": "Gen 1:1\u2014ch. 1",
				"niv-shortest": "Ge 1:1-Ge 1",
				"nlt-long": "Genesis 1:1\u2014ch 1",
				"nlt-short": "Gen 1:1\u2014ch 1"
			},
			"Gen.1.1-Gen.1.2": {
				"esv-long": "Genesis 1:1\u20132",
				"esv-short": "Gen. 1:1\u20132",
				"niv-long": "Genesis 1:1\u20132",
				"niv-short": "Gen 1:1\u20132",
				"niv-shortest": "Ge 1:1-2",
				"nlt-long": "Genesis 1:1\u20132",
				"nlt-short": "Gen 1:1\u20132"
			}
		})
	})
	it("should handle `bcv-same bcv`", function() {
		loopTest({
			"Gen.1.1-Gen.1.1": {
				"esv-long": "Genesis 1:1\u20131",
				"esv-short": "Gen. 1:1\u20131",
				"niv-long": "Genesis 1:1\u20131",
				"niv-short": "Gen 1:1\u20131",
				"niv-shortest": "Ge 1:1-1",
				"nlt-long": "Genesis 1:1\u20131",
				"nlt-short": "Gen 1:1\u20131"
			}
		})
	})
	it("should handle `bcv-different b`", function() {
		loopTest({
			"Gen.1.1-Matt": {
				"esv-long": "Genesis 1:1\u2014Matthew",
				"esv-short": "Gen. 1:1\u2014Matt.",
				"niv-long": "Genesis 1:1\u2014Matthew",
				"niv-short": "Gen 1:1\u2014Matt",
				"niv-shortest": "Ge 1:1-Mt",
				"nlt-long": "Genesis 1:1\u2014Matthew",
				"nlt-short": "Gen 1:1\u2014Matt"
			},
			"Gen.1.1-Matt.2": {
				"esv-long": "Genesis 1:1\u2014Matthew 2",
				"esv-short": "Gen. 1:1\u2014Matt. 2",
				"niv-long": "Genesis 1:1\u2014Matthew 2",
				"niv-short": "Gen 1:1\u2014Matt 2",
				"niv-shortest": "Ge 1:1-Mt 2",
				"nlt-long": "Genesis 1:1\u2014Matthew 2",
				"nlt-short": "Gen 1:1\u2014Matt 2"
			},
			"Gen.1.1-Matt.2.3": {
				"esv-long": "Genesis 1:1\u2014Matthew 2:3",
				"esv-short": "Gen. 1:1\u2014Matt. 2:3",
				"niv-long": "Genesis 1:1\u2014Matthew 2:3",
				"niv-short": "Gen 1:1\u2014Matt 2:3",
				"niv-shortest": "Ge 1:1-Mt 2:3",
				"nlt-long": "Genesis 1:1\u2014Matthew 2:3",
				"nlt-short": "Gen 1:1\u2014Matt 2:3"
			}
		})
	})
	it("should handle `bcv-different, single-chapter b`", function() {
		loopTest({
			"Gen.1.1-Phlm": {
				"esv-long": "Genesis 1:1\u2014Philemon",
				"esv-short": "Gen. 1:1\u2014Philem.",
				"niv-long": "Genesis 1:1\u2014Philemon",
				"niv-short": "Gen 1:1\u2014Phlm",
				"niv-shortest": "Ge 1:1-Phm",
				"nlt-long": "Genesis 1:1\u2014Philemon",
				"nlt-short": "Gen 1:1\u2014Phlm"
			},
			"Gen.1.1-Phlm.1": {
				"esv-long": "Genesis 1:1\u2014Philemon",
				"esv-short": "Gen. 1:1\u2014Philem.",
				"niv-long": "Genesis 1:1\u2014Philemon",
				"niv-short": "Gen 1:1\u2014Phlm",
				"niv-shortest": "Ge 1:1-Phm",
				"nlt-long": "Genesis 1:1\u2014Philemon",
				"nlt-short": "Gen 1:1\u2014Phlm"
			},
			"Gen.1.1-Phlm.1.2": {
				"esv-long": "Genesis 1:1\u2014Philemon 2",
				"esv-short": "Gen. 1:1\u2014Philem. 2",
				"niv-long": "Genesis 1:1\u2014Philemon 2",
				"niv-short": "Gen 1:1\u2014Phlm 2",
				"niv-shortest": "Ge 1:1-Phm 2",
				"nlt-long": "Genesis 1:1\u2014Philemon 2",
				"nlt-short": "Gen 1:1\u2014Phlm 2"
			}
		})
	})
	it("should handle `bcv-Ps151`", function() {
		loopTest({
			"Gen.1.1-Ps151": {
				"esv-long": "Genesis 1:1\u2014Psalm 151",
				"esv-short": "Gen. 1:1\u2014Ps. 151",
				"niv-long": "Genesis 1:1\u2014Psalm 151",
				"niv-short": "Gen 1:1\u2014Ps 151",
				"niv-shortest": "Ge 1:1-Ps 151",
				"nlt-long": "Genesis 1:1\u2014Psalm 151",
				"nlt-short": "Gen 1:1\u2014Ps 151"
			},
			"Gen.1.1-Ps151.1": {
				"esv-long": "Genesis 1:1\u2014Psalm 151",
				"esv-short": "Gen. 1:1\u2014Ps. 151",
				"niv-long": "Genesis 1:1\u2014Psalm 151",
				"niv-short": "Gen 1:1\u2014Ps 151",
				"niv-shortest": "Ge 1:1-Ps 151",
				"nlt-long": "Genesis 1:1\u2014Psalm 151",
				"nlt-short": "Gen 1:1\u2014Ps 151"
			},
			"Gen.1.1-Ps151.1.2": {
				"esv-long": "Genesis 1:1\u2014Psalm 151:2",
				"esv-short": "Gen. 1:1\u2014Ps. 151:2",
				"niv-long": "Genesis 1:1\u2014Psalm 151:2",
				"niv-short": "Gen 1:1\u2014Ps 151:2",
				"niv-shortest": "Ge 1:1-Ps 151:2",
				"nlt-long": "Genesis 1:1\u2014Psalm 151:2",
				"nlt-short": "Gen 1:1\u2014Ps 151:2"
			}
		})
	})
	it("should handle `Ps.cv-Ps151`", function() {
		loopTest({
			"Ps.1.1-Ps151": {
				"esv-long": "Psalms 1:1\u2014Psalm 151",
				"esv-short": "Pss. 1:1\u2014Ps. 151",
				"niv-long": "Psalms 1:1\u2014Psalm 151",
				"niv-short": "Pss 1:1\u2014Ps 151",
				"niv-shortest": "Ps 1:1-Ps 151",
				"nlt-long": "Psalms 1:1\u2014Psalm 151",
				"nlt-short": "Pss 1:1\u2014Ps 151"
			},
			"Ps.1.1-Ps151.1": {
				"esv-long": "Psalms 1:1\u2014Psalm 151",
				"esv-short": "Pss. 1:1\u2014Ps. 151",
				"niv-long": "Psalms 1:1\u2014Psalm 151",
				"niv-short": "Pss 1:1\u2014Ps 151",
				"niv-shortest": "Ps 1:1-Ps 151",
				"nlt-long": "Psalms 1:1\u2014Psalm 151",
				"nlt-short": "Pss 1:1\u2014Ps 151"
			},
			"Ps.1.1-Ps151.1.2": {
				"esv-long": "Psalms 1:1\u2014151:2",
				"esv-short": "Pss. 1:1\u2014151:2",
				"niv-long": "Psalms 1:1\u2014151:2",
				"niv-short": "Pss 1:1\u2014151:2",
				"niv-shortest": "Ps 1:1-151:2",
				"nlt-long": "Psalms 1:1\u2014151:2",
				"nlt-short": "Pss 1:1\u2014151:2"
			}
		})
	})
})

describe("`bv` ranges", function() {
	it("should handle `bv-same b`", function() {
		loopTest({
			"Phlm.1.1-Phlm": {
				"esv-long": "Philemon 1\u2014Philemon",
				"esv-short": "Philem. 1\u2014Philem.",
				"niv-long": "Philemon 1\u2014Philemon",
				"niv-short": "Phlm 1\u2014Phlm",
				"niv-shortest": "Phm 1-Phm",
				"nlt-long": "Philemon 1\u2014Philemon",
				"nlt-short": "Phlm 1\u2014Phlm"
			},
			"Phlm.1.1-Phlm.1": {
				"esv-long": "Philemon 1\u2014Philemon",
				"esv-short": "Philem. 1\u2014Philem.",
				"niv-long": "Philemon 1\u2014Philemon",
				"niv-short": "Phlm 1\u2014Phlm",
				"niv-shortest": "Phm 1-Phm",
				"nlt-long": "Philemon 1\u2014Philemon",
				"nlt-short": "Phlm 1\u2014Phlm"
			},
			"Phlm.1.1-Phlm.1.2": {
				"esv-long": "Philemon 1\u20132",
				"esv-short": "Philem. 1\u20132",
				"niv-long": "Philemon 1\u20132",
				"niv-short": "Phlm 1\u20132",
				"niv-shortest": "Phm 1-2",
				"nlt-long": "Philemon 1\u20132",
				"nlt-short": "Phlm 1\u20132"
			}
		})
	})
	it("should handle `bv-same bv`", function() {
		loopTest({
			"Phlm.1.1-Phlm.1.1": {
				"esv-long": "Philemon 1\u20131",
				"esv-short": "Philem. 1\u20131",
				"niv-long": "Philemon 1\u20131",
				"niv-short": "Phlm 1\u20131",
				"niv-shortest": "Phm 1-1",
				"nlt-long": "Philemon 1\u20131",
				"nlt-short": "Phlm 1\u20131"
			}
		})
	})
	it("should handle `bv-different b`", function() {
		loopTest({
			"Phlm.1.1-Rev": {
				"esv-long": "Philemon 1\u2014Revelation",
				"esv-short": "Philem. 1\u2014Rev.",
				"niv-long": "Philemon 1\u2014Revelation",
				"niv-short": "Phlm 1\u2014Rev",
				"niv-shortest": "Phm 1-Rev",
				"nlt-long": "Philemon 1\u2014Revelation",
				"nlt-short": "Phlm 1\u2014Rev"
			},
			"Phlm.1.1-Rev.1": {
				"esv-long": "Philemon 1\u2014Revelation 1",
				"esv-short": "Philem. 1\u2014Rev. 1",
				"niv-long": "Philemon 1\u2014Revelation 1",
				"niv-short": "Phlm 1\u2014Rev 1",
				"niv-shortest": "Phm 1-Rev 1",
				"nlt-long": "Philemon 1\u2014Revelation 1",
				"nlt-short": "Phlm 1\u2014Rev 1"
			},
			"Phlm.1.1-Rev.1.2": {
				"esv-long": "Philemon 1\u2014Revelation 1:2",
				"esv-short": "Philem. 1\u2014Rev. 1:2",
				"niv-long": "Philemon 1\u2014Revelation 1:2",
				"niv-short": "Phlm 1\u2014Rev 1:2",
				"niv-shortest": "Phm 1-Rev 1:2",
				"nlt-long": "Philemon 1\u2014Revelation 1:2",
				"nlt-short": "Phlm 1\u2014Rev 1:2"
			}
		})
	})
	it("should handle `bv-different single-chapter b`", function() {
		loopTest({
			"Phlm.1.1-Jude": {
				"esv-long": "Philemon 1\u2014Jude",
				"esv-short": "Philem. 1\u2014Jude",
				"niv-long": "Philemon 1\u2014Jude",
				"niv-short": "Phlm 1\u2014Jude",
				"niv-shortest": "Phm 1-Jude",
				"nlt-long": "Philemon 1\u2014Jude",
				"nlt-short": "Phlm 1\u2014Jude"
			},
			"Phlm.1.1-Jude.1": {
				"esv-long": "Philemon 1\u2014Jude",
				"esv-short": "Philem. 1\u2014Jude",
				"niv-long": "Philemon 1\u2014Jude",
				"niv-short": "Phlm 1\u2014Jude",
				"niv-shortest": "Phm 1-Jude",
				"nlt-long": "Philemon 1\u2014Jude",
				"nlt-short": "Phlm 1\u2014Jude"
			},
			"Phlm.1.1-Jude.1.2": {
				"esv-long": "Philemon 1\u2014Jude 2",
				"esv-short": "Philem. 1\u2014Jude 2",
				"niv-long": "Philemon 1\u2014Jude 2",
				"niv-short": "Phlm 1\u2014Jude 2",
				"niv-shortest": "Phm 1-Jude 2",
				"nlt-long": "Philemon 1\u2014Jude 2",
				"nlt-short": "Phlm 1\u2014Jude 2"
			}
		})
	})
})

describe("`b` sequences", function() {
	it("should handle `b,same b`", function() {
		loopTest({
			"Gen,Gen": {
				"esv-long": "Genesis; Genesis",
				"esv-short": "Gen.; Gen.",
				"niv-long": "Genesis; Genesis",
				"niv-short": "Gen; Gen",
				"niv-shortest": "Ge; Ge",
				"nlt-long": "Genesis; Genesis",
				"nlt-short": "Gen; Gen"
			},
			"Gen,Gen.1": {
				"esv-long": "Genesis; ch. 1",
				"esv-short": "Gen.; ch. 1",
				"niv-long": "Genesis; ch. 1",
				"niv-short": "Gen; ch. 1",
				"niv-shortest": "Ge; Ge 1",
				"nlt-long": "Genesis; ch 1",
				"nlt-short": "Gen; ch 1"
			},
			"Gen,Gen.1-Gen.2": {
				"esv-long": "Genesis; chs. 1\u20142",
				"esv-short": "Gen.; chs. 1\u20142",
				"niv-long": "Genesis; chs. 1\u20142",
				"niv-short": "Gen; chs. 1\u20142",
				"niv-shortest": "Ge; Ge 1-2",
				"nlt-long": "Genesis; chs 1\u20142",
				"nlt-short": "Gen; chs 1\u20142"
			},
			"Gen,Gen.1.2": {
				"esv-long": "Genesis; ch. 1:2",
				"esv-short": "Gen.; ch. 1:2",
				"niv-long": "Genesis; ch. 1:2",
				"niv-short": "Gen; ch. 1:2",
				"niv-shortest": "Ge; Ge 1:2",
				"nlt-long": "Genesis; ch 1:2",
				"nlt-short": "Gen; ch 1:2"
			}
		})
	})
	it("should handle `b,different b`", function() {
		loopTest({
			"Gen,Matt": {
				"esv-long": "Genesis; Matthew",
				"esv-short": "Gen.; Matt.",
				"niv-long": "Genesis; Matthew",
				"niv-short": "Gen; Matt",
				"niv-shortest": "Ge; Mt",
				"nlt-long": "Genesis; Matthew",
				"nlt-short": "Gen; Matt"
			},
			"Gen,Matt.1": {
				"esv-long": "Genesis; Matthew 1",
				"esv-short": "Gen.; Matt. 1",
				"niv-long": "Genesis; Matthew 1",
				"niv-short": "Gen; Matt 1",
				"niv-shortest": "Ge; Mt 1",
				"nlt-long": "Genesis; Matthew 1",
				"nlt-short": "Gen; Matt 1"
			},
			"Gen,Matt.1.2": {
				"esv-long": "Genesis; Matthew 1:2",
				"esv-short": "Gen.; Matt. 1:2",
				"niv-long": "Genesis; Matthew 1:2",
				"niv-short": "Gen; Matt 1:2",
				"niv-shortest": "Ge; Mt 1:2",
				"nlt-long": "Genesis; Matthew 1:2",
				"nlt-short": "Gen; Matt 1:2"
			}
		})
	})
	it("should handle `b,different, single-chapter b`", function() {
		loopTest({
			"Gen,Phlm": {
				"esv-long": "Genesis; Philemon",
				"esv-short": "Gen.; Philem.",
				"niv-long": "Genesis; Philemon",
				"niv-short": "Gen; Phlm",
				"niv-shortest": "Ge; Phm",
				"nlt-long": "Genesis; Philemon",
				"nlt-short": "Gen; Phlm"
			},
			"Gen,Phlm.1": {
				"esv-long": "Genesis; Philemon",
				"esv-short": "Gen.; Philem.",
				"niv-long": "Genesis; Philemon",
				"niv-short": "Gen; Phlm",
				"niv-shortest": "Ge; Phm",
				"nlt-long": "Genesis; Philemon",
				"nlt-short": "Gen; Phlm"
			},
			"Gen,Phlm.1.2": {
				"esv-long": "Genesis; Philemon 2",
				"esv-short": "Gen.; Philem. 2",
				"niv-long": "Genesis; Philemon 2",
				"niv-short": "Gen; Phlm 2",
				"niv-shortest": "Ge; Phm 2",
				"nlt-long": "Genesis; Philemon 2",
				"nlt-short": "Gen; Phlm 2"
			}
		})
	})
	it("should handle `b,Ps151`", function() {
		loopTest({
			"Gen,Ps151": {
				"esv-long": "Genesis; Psalm 151",
				"esv-short": "Gen.; Ps. 151",
				"niv-long": "Genesis; Psalm 151",
				"niv-short": "Gen; Ps 151",
				"niv-shortest": "Ge; Ps 151",
				"nlt-long": "Genesis; Psalm 151",
				"nlt-short": "Gen; Ps 151"
			},
			"Gen,Ps151.1": {
				"esv-long": "Genesis; Psalm 151",
				"esv-short": "Gen.; Ps. 151",
				"niv-long": "Genesis; Psalm 151",
				"niv-short": "Gen; Ps 151",
				"niv-shortest": "Ge; Ps 151",
				"nlt-long": "Genesis; Psalm 151",
				"nlt-short": "Gen; Ps 151"
			},
			"Gen,Ps151.1.2": {
				"esv-long": "Genesis; Psalm 151:2",
				"esv-short": "Gen.; Ps. 151:2",
				"niv-long": "Genesis; Psalm 151:2",
				"niv-short": "Gen; Ps 151:2",
				"niv-shortest": "Ge; Ps 151:2",
				"nlt-long": "Genesis; Psalm 151:2",
				"nlt-short": "Gen; Ps 151:2"
			}
		})
	})
	it("should handle `Ps,Ps151`", function() {
		loopTest({
			"Ps,Ps151": {
				"esv-long": "Psalms; Psalm 151",
				"esv-short": "Pss.; Ps. 151",
				"niv-long": "Psalms; Psalm 151",
				"niv-short": "Pss; Ps 151",
				"niv-shortest": "Ps; Ps 151",
				"nlt-long": "Psalms; Psalm 151",
				"nlt-short": "Pss; Ps 151"
			},
			"Ps,Ps151.1": {
				"esv-long": "Psalms; Psalm 151",
				"esv-short": "Pss.; Ps. 151",
				"niv-long": "Psalms; Psalm 151",
				"niv-short": "Pss; Ps 151",
				"niv-shortest": "Ps; Ps 151",
				"nlt-long": "Psalms; Psalm 151",
				"nlt-short": "Pss; Ps 151"
			},
			"Ps,Ps151.1.2": {
				"esv-long": "Psalms; Psalm 151:2",
				"esv-short": "Pss.; Ps. 151:2",
				"niv-long": "Psalms; Psalm 151:2",
				"niv-short": "Pss; Ps 151:2",
				"niv-shortest": "Ps; Ps 151:2",
				"nlt-long": "Psalms; Psalm 151:2",
				"nlt-short": "Pss; Ps 151:2"
			}
		})
	})
	it("should handle `single-chapter b,same b`", function() {
		loopTest({
			"Phlm,Phlm": {
				"esv-long": "Philemon; Philemon",
				"esv-short": "Philem.; Philem.",
				"niv-long": "Philemon; Philemon",
				"niv-short": "Phlm; Phlm",
				"niv-shortest": "Phm; Phm",
				"nlt-long": "Philemon; Philemon",
				"nlt-short": "Phlm; Phlm"
			},
			"Phlm,Phlm.1": {
				"esv-long": "Philemon; Philemon",
				"esv-short": "Philem.; Philem.",
				"niv-long": "Philemon; Philemon",
				"niv-short": "Phlm; Phlm",
				"niv-shortest": "Phm; Phm",
				"nlt-long": "Philemon; Philemon",
				"nlt-short": "Phlm; Phlm"
			},
			"Phlm,Phlm.1.2": {
				"esv-long": "Philemon; Philemon 2",
				"esv-short": "Philem.; Philem. 2",
				"niv-long": "Philemon; Philemon 2",
				"niv-short": "Phlm; Phlm 2",
				"niv-shortest": "Phm; Phm 2",
				"nlt-long": "Philemon; Philemon 2",
				"nlt-short": "Phlm; Phlm 2"
			}
		})
	})
	it("should handle `single-chapter b,different b`", function() {
		loopTest({
			"Phlm,Rev": {
				"esv-long": "Philemon; Revelation",
				"esv-short": "Philem.; Rev.",
				"niv-long": "Philemon; Revelation",
				"niv-short": "Phlm; Rev",
				"niv-shortest": "Phm; Rev",
				"nlt-long": "Philemon; Revelation",
				"nlt-short": "Phlm; Rev"
			},
			"Phlm,Rev.1": {
				"esv-long": "Philemon; Revelation 1",
				"esv-short": "Philem.; Rev. 1",
				"niv-long": "Philemon; Revelation 1",
				"niv-short": "Phlm; Rev 1",
				"niv-shortest": "Phm; Rev 1",
				"nlt-long": "Philemon; Revelation 1",
				"nlt-short": "Phlm; Rev 1"
			},
			"Phlm,Rev.1.2": {
				"esv-long": "Philemon; Revelation 1:2",
				"esv-short": "Philem.; Rev. 1:2",
				"niv-long": "Philemon; Revelation 1:2",
				"niv-short": "Phlm; Rev 1:2",
				"niv-shortest": "Phm; Rev 1:2",
				"nlt-long": "Philemon; Revelation 1:2",
				"nlt-short": "Phlm; Rev 1:2"
			}
		})
	})
	it("should handle `single-chapter b,different single-chapter b`", function() {
		loopTest({
			"Phlm,Jude": {
				"esv-long": "Philemon; Jude",
				"esv-short": "Philem.; Jude",
				"niv-long": "Philemon; Jude",
				"niv-short": "Phlm; Jude",
				"niv-shortest": "Phm; Jude",
				"nlt-long": "Philemon; Jude",
				"nlt-short": "Phlm; Jude"
			},
			"Phlm,Jude.1": {
				"esv-long": "Philemon; Jude",
				"esv-short": "Philem.; Jude",
				"niv-long": "Philemon; Jude",
				"niv-short": "Phlm; Jude",
				"niv-shortest": "Phm; Jude",
				"nlt-long": "Philemon; Jude",
				"nlt-short": "Phlm; Jude"
			},
			"Phlm,Jude.1.2": {
				"esv-long": "Philemon; Jude 2",
				"esv-short": "Philem.; Jude 2",
				"niv-long": "Philemon; Jude 2",
				"niv-short": "Phlm; Jude 2",
				"niv-shortest": "Phm; Jude 2",
				"nlt-long": "Philemon; Jude 2",
				"nlt-short": "Phlm; Jude 2"
			}
		})
	})
	it("should handle special book sequences", function() {
		loopTest({
			"1Sam,2Sam": {
				"esv-long": "1 and 2 Samuel",
				"esv-short": "1 and 2 Sam.",
				"niv-long": "1 and 2 Samuel",
				"niv-short": "1 and 2 Sam",
				"niv-shortest": "1Sa; 2Sa",
				"nlt-long": "1 and 2 Samuel",
				"nlt-short": "1 and 2 Sam"
			},
			"1Kgs,2Kgs": {
				"esv-long": "1 and 2 Kings",
				"esv-short": "1 and 2 Kings",
				"niv-long": "1 and 2 Kings",
				"niv-short": "1 and 2 Kgs",
				"niv-shortest": "1Ki; 2Ki",
				"nlt-long": "1 and 2 Kings",
				"nlt-short": "1 and 2 Kgs"
			},
			"1Chr,2Chr": {
				"esv-long": "1 and 2 Chronicles",
				"esv-short": "1 and 2 Chron.",
				"niv-long": "1 and 2 Chronicles",
				"niv-short": "1 and 2 Chr",
				"niv-shortest": "1Ch; 2Ch",
				"nlt-long": "1 and 2 Chronicles",
				"nlt-short": "1 and 2 Chr"
			},
			"1Cor,2Cor": {
				"esv-long": "1 and 2 Corinthians",
				"esv-short": "1 and 2 Cor.",
				"niv-long": "1 and 2 Corinthians",
				"niv-short": "1 and 2 Cor",
				"niv-shortest": "1Co; 2Co",
				"nlt-long": "1 and 2 Corinthians",
				"nlt-short": "1 and 2 Cor"
			},
			"1Thess,2Thess": {
				"esv-long": "1 and 2 Thessalonians",
				"esv-short": "1 and 2 Thess.",
				"niv-long": "1 and 2 Thessalonians",
				"niv-short": "1 and 2 Thess",
				"niv-shortest": "1Th; 2Th",
				"nlt-long": "1 and 2 Thessalonians",
				"nlt-short": "1 and 2 Thes"
			},
			"1Tim,2Tim": {
				"esv-long": "1 and 2 Timothy",
				"esv-short": "1 and 2 Tim.",
				"niv-long": "1 and 2 Timothy",
				"niv-short": "1 and 2 Tim",
				"niv-shortest": "1Ti; 2Ti",
				"nlt-long": "1 and 2 Timothy",
				"nlt-short": "1 and 2 Tim"
			},
			"1Pet,2Pet": {
				"esv-long": "1 and 2 Peter",
				"esv-short": "1 and 2 Pet.",
				"niv-long": "1 and 2 Peter",
				"niv-short": "1 and 2 Pet",
				"niv-shortest": "1Pe; 2Pe",
				"nlt-long": "1 and 2 Peter",
				"nlt-short": "1 and 2 Pet"
			},
			"1John,2John": {
				"esv-long": "1 and 2 John",
				"esv-short": "1 and 2 John",
				"niv-long": "1 and 2 John",
				"niv-short": "1 and 2 John",
				"niv-shortest": "1Jn; 2Jn",
				"nlt-long": "1 and 2 John",
				"nlt-short": "1 and 2 Jn"
			},
			"1John,3John": {
				"esv-long": "1 and 3 John",
				"esv-short": "1 and 3 John",
				"niv-long": "1 and 3 John",
				"niv-short": "1 and 3 John",
				"niv-shortest": "1Jn; 3Jn",
				"nlt-long": "1 and 3 John",
				"nlt-short": "1 and 3 Jn"
			},
			"2John,3John": {
				"esv-long": "2 and 3 John",
				"esv-short": "2 and 3 John",
				"niv-long": "2 and 3 John",
				"niv-short": "2 and 3 John",
				"niv-shortest": "2Jn; 3Jn",
				"nlt-long": "2 and 3 John",
				"nlt-short": "2 and 3 Jn"
			},
			"1Macc,2Macc": {
				"esv-long": "1 and 2 Maccabees",
				"esv-short": "1 and 2 Macc.",
				"niv-long": "1 and 2 Maccabees",
				"niv-short": "1 and 2 Macc",
				"niv-shortest": "1Mc; 2Mc",
				"nlt-long": "1 and 2 Maccabees",
				"nlt-short": "1 and 2 Macc"
			},
			"1Macc,2Macc,3Macc": {
				"esv-long": "1, 2, and 3 Maccabees",
				"esv-short": "1, 2, and 3 Macc.",
				"niv-long": "1, 2, and 3 Maccabees",
				"niv-short": "1, 2, and 3 Macc",
				"niv-shortest": "1Mc; 2Mc; 3Mc",
				"nlt-long": "1, 2, and 3 Maccabees",
				"nlt-short": "1, 2, and 3 Macc"
			},
			"1Macc,2Macc,3Macc,4Macc": {
				"esv-long": "1, 2, 3, and 4 Maccabees",
				"esv-short": "1, 2, 3, and 4 Macc.",
				"niv-long": "1, 2, 3, and 4 Maccabees",
				"niv-short": "1, 2, 3, and 4 Macc",
				"niv-shortest": "1Mc; 2Mc; 3Mc; 4Mc",
				"nlt-long": "1, 2, 3, and 4 Maccabees",
				"nlt-short": "1, 2, 3, and 4 Macc"
			},
			"1Macc,3Macc": {
				"esv-long": "1 and 3 Maccabees",
				"esv-short": "1 and 3 Macc.",
				"niv-long": "1 and 3 Maccabees",
				"niv-short": "1 and 3 Macc",
				"niv-shortest": "1Mc; 3Mc",
				"nlt-long": "1 and 3 Maccabees",
				"nlt-short": "1 and 3 Macc"
			},
			"1Macc,3Macc,4Macc": {
				"esv-long": "1, 3, and 4 Maccabees",
				"esv-short": "1, 3, and 4 Macc.",
				"niv-long": "1, 3, and 4 Maccabees",
				"niv-short": "1, 3, and 4 Macc",
				"niv-shortest": "1Mc; 3Mc; 4Mc",
				"nlt-long": "1, 3, and 4 Maccabees",
				"nlt-short": "1, 3, and 4 Macc"
			},
			"1Macc,4Macc": {
				"esv-long": "1 and 4 Maccabees",
				"esv-short": "1 and 4 Macc.",
				"niv-long": "1 and 4 Maccabees",
				"niv-short": "1 and 4 Macc",
				"niv-shortest": "1Mc; 4Mc",
				"nlt-long": "1 and 4 Maccabees",
				"nlt-short": "1 and 4 Macc"
			},
			"2Macc,3Macc": {
				"esv-long": "2 and 3 Maccabees",
				"esv-short": "2 and 3 Macc.",
				"niv-long": "2 and 3 Maccabees",
				"niv-short": "2 and 3 Macc",
				"niv-shortest": "2Mc; 3Mc",
				"nlt-long": "2 and 3 Maccabees",
				"nlt-short": "2 and 3 Macc"
			},
			"2Macc,3Macc,4Macc": {
				"esv-long": "2, 3, and 4 Maccabees",
				"esv-short": "2, 3, and 4 Macc.",
				"niv-long": "2, 3, and 4 Maccabees",
				"niv-short": "2, 3, and 4 Macc",
				"niv-shortest": "2Mc; 3Mc; 4Mc",
				"nlt-long": "2, 3, and 4 Maccabees",
				"nlt-short": "2, 3, and 4 Macc"
			},
			"2Macc,4Macc": {
				"esv-long": "2 and 4 Maccabees",
				"esv-short": "2 and 4 Macc.",
				"niv-long": "2 and 4 Maccabees",
				"niv-short": "2 and 4 Macc",
				"niv-shortest": "2Mc; 4Mc",
				"nlt-long": "2 and 4 Maccabees",
				"nlt-short": "2 and 4 Macc"
			},
			"3Macc,4Macc": {
				"esv-long": "3 and 4 Maccabees",
				"esv-short": "3 and 4 Macc.",
				"niv-long": "3 and 4 Maccabees",
				"niv-short": "3 and 4 Macc",
				"niv-shortest": "3Mc; 4Mc",
				"nlt-long": "3 and 4 Maccabees",
				"nlt-short": "3 and 4 Macc"
			},
			"1Esd,2Esd": {
				"esv-long": "1 and 2 Esdras",
				"esv-short": "1 and 2 Esd.",
				"niv-long": "1 and 2 Esdras",
				"niv-short": "1 and 2 Esd",
				"niv-shortest": "1Es; 2Es",
				"nlt-long": "1 and 2 Esdras",
				"nlt-short": "1 and 2 Esd"
			}
		})
	})
})

describe("`bc` sequences", function() {
	it("should handle `bc, same b`", function() {
		loopTest({
			"Gen.1,Gen": {
				"esv-long": "Genesis 1; Genesis",
				"esv-short": "Gen. 1; Gen.",
				"niv-long": "Genesis 1; Genesis",
				"niv-short": "Gen 1; Gen",
				"niv-shortest": "Ge 1; Ge",
				"nlt-long": "Genesis 1; Genesis",
				"nlt-short": "Gen 1; Gen"
			},
			"Gen.1,Gen.2": {
				"esv-long": "Genesis 1; 2",
				"esv-short": "Gen. 1; 2",
				"niv-long": "Genesis 1; 2",
				"niv-short": "Gen 1; 2",
				"niv-shortest": "Ge 1; 2",
				"nlt-long": "Genesis 1; 2",
				"nlt-short": "Gen 1; 2"
			},
			"Gen.1,Gen.2.3": {
				"esv-long": "Genesis 1; 2:3",
				"esv-short": "Gen. 1; 2:3",
				"niv-long": "Genesis 1; 2:3",
				"niv-short": "Gen 1; 2:3",
				"niv-shortest": "Ge 1; 2:3",
				"nlt-long": "Genesis 1; 2:3",
				"nlt-short": "Gen 1; 2:3"
			}
		})
	})
	it("should handle `bc, same bc`", function() {
		loopTest({
			"Gen.1,Gen.1": {
				"esv-long": "Genesis 1; 1",
				"esv-short": "Gen. 1; 1",
				"niv-long": "Genesis 1; 1",
				"niv-short": "Gen 1; 1",
				"niv-shortest": "Ge 1; 1",
				"nlt-long": "Genesis 1; 1",
				"nlt-short": "Gen 1; 1"
			},
			"Gen.1,Gen.1.2": {
				"esv-long": "Genesis 1; 1:2",
				"esv-short": "Gen. 1; 1:2",
				"niv-long": "Genesis 1; 1:2",
				"niv-short": "Gen 1; 1:2",
				"niv-shortest": "Ge 1; 1:2",
				"nlt-long": "Genesis 1; 1:2",
				"nlt-short": "Gen 1; 1:2"
			}
		})
	})
	it("should handle `bc, different b`", function() {
		loopTest({
			"Gen.1,Matt": {
				"esv-long": "Genesis 1; Matthew",
				"esv-short": "Gen. 1; Matt.",
				"niv-long": "Genesis 1; Matthew",
				"niv-short": "Gen 1; Matt",
				"niv-shortest": "Ge 1; Mt",
				"nlt-long": "Genesis 1; Matthew",
				"nlt-short": "Gen 1; Matt"
			},
			"Gen.1,Matt.2": {
				"esv-long": "Genesis 1; Matthew 2",
				"esv-short": "Gen. 1; Matt. 2",
				"niv-long": "Genesis 1; Matthew 2",
				"niv-short": "Gen 1; Matt 2",
				"niv-shortest": "Ge 1; Mt 2",
				"nlt-long": "Genesis 1; Matthew 2",
				"nlt-short": "Gen 1; Matt 2"
			},
			"Gen.1,Matt.2.3": {
				"esv-long": "Genesis 1; Matthew 2:3",
				"esv-short": "Gen. 1; Matt. 2:3",
				"niv-long": "Genesis 1; Matthew 2:3",
				"niv-short": "Gen 1; Matt 2:3",
				"niv-shortest": "Ge 1; Mt 2:3",
				"nlt-long": "Genesis 1; Matthew 2:3",
				"nlt-short": "Gen 1; Matt 2:3"
			}
		})
	})
	it("should handle `bc, different, single-chapter b`", function() {
		loopTest({
			"Gen.1,Phlm": {
				"esv-long": "Genesis 1; Philemon",
				"esv-short": "Gen. 1; Philem.",
				"niv-long": "Genesis 1; Philemon",
				"niv-short": "Gen 1; Phlm",
				"niv-shortest": "Ge 1; Phm",
				"nlt-long": "Genesis 1; Philemon",
				"nlt-short": "Gen 1; Phlm"
			},
			"Gen.1,Phlm.1": {
				"esv-long": "Genesis 1; Philemon",
				"esv-short": "Gen. 1; Philem.",
				"niv-long": "Genesis 1; Philemon",
				"niv-short": "Gen 1; Phlm",
				"niv-shortest": "Ge 1; Phm",
				"nlt-long": "Genesis 1; Philemon",
				"nlt-short": "Gen 1; Phlm"
			},
			"Gen.1,Phlm.1.2": {
				"esv-long": "Genesis 1; Philemon 2",
				"esv-short": "Gen. 1; Philem. 2",
				"niv-long": "Genesis 1; Philemon 2",
				"niv-short": "Gen 1; Phlm 2",
				"niv-shortest": "Ge 1; Phm 2",
				"nlt-long": "Genesis 1; Philemon 2",
				"nlt-short": "Gen 1; Phlm 2"
			}
		})
	})
	it("should handle `bc, Ps151`", function() {
		loopTest({
			"Gen.1,Ps151": {
				"esv-long": "Genesis 1; Psalm 151",
				"esv-short": "Gen. 1; Ps. 151",
				"niv-long": "Genesis 1; Psalm 151",
				"niv-short": "Gen 1; Ps 151",
				"niv-shortest": "Ge 1; Ps 151",
				"nlt-long": "Genesis 1; Psalm 151",
				"nlt-short": "Gen 1; Ps 151"
			},
			"Gen.1,Ps151.1": {
				"esv-long": "Genesis 1; Psalm 151",
				"esv-short": "Gen. 1; Ps. 151",
				"niv-long": "Genesis 1; Psalm 151",
				"niv-short": "Gen 1; Ps 151",
				"niv-shortest": "Ge 1; Ps 151",
				"nlt-long": "Genesis 1; Psalm 151",
				"nlt-short": "Gen 1; Ps 151"
			},
			"Gen.1,Ps151.1.2": {
				"esv-long": "Genesis 1; Psalm 151:2",
				"esv-short": "Gen. 1; Ps. 151:2",
				"niv-long": "Genesis 1; Psalm 151:2",
				"niv-short": "Gen 1; Ps 151:2",
				"niv-shortest": "Ge 1; Ps 151:2",
				"nlt-long": "Genesis 1; Psalm 151:2",
				"nlt-short": "Gen 1; Ps 151:2"
			}
		})
	})
	it("should handle `Ps.c, Ps151`", function() {
		loopTest({
			"Ps.1,Ps151": {
				"esv-long": "Psalms 1; 151",
				"esv-short": "Pss. 1; 151",
				"niv-long": "Psalms 1; 151",
				"niv-short": "Pss 1; 151",
				"niv-shortest": "Ps 1; 151",
				"nlt-long": "Psalms 1; 151",
				"nlt-short": "Pss 1; 151"
			},
			"Ps.1,Ps151.1": {
				"esv-long": "Psalms 1; 151",
				"esv-short": "Pss. 1; 151",
				"niv-long": "Psalms 1; 151",
				"niv-short": "Pss 1; 151",
				"niv-shortest": "Ps 1; 151",
				"nlt-long": "Psalms 1; 151",
				"nlt-short": "Pss 1; 151"
			},
			"Ps.1,Ps151.1.2": {
				"esv-long": "Psalms 1; 151:2",
				"esv-short": "Pss. 1; 151:2",
				"niv-long": "Psalms 1; 151:2",
				"niv-short": "Pss 1; 151:2",
				"niv-shortest": "Ps 1; 151:2",
				"nlt-long": "Psalms 1; 151:2",
				"nlt-short": "Pss 1; 151:2"
			}
		})
	})
	it("should handle single-chapter bc, same b`", function() {
		loopTest({
			"Phlm.1,Phlm": {
				"esv-long": "Philemon; Philemon",
				"esv-short": "Philem.; Philem.",
				"niv-long": "Philemon; Philemon",
				"niv-short": "Phlm; Phlm",
				"niv-shortest": "Phm; Phm",
				"nlt-long": "Philemon; Philemon",
				"nlt-short": "Phlm; Phlm"
			},
			"Phlm.1,Phlm.1": {
				"esv-long": "Philemon; Philemon",
				"esv-short": "Philem.; Philem.",
				"niv-long": "Philemon; Philemon",
				"niv-short": "Phlm; Phlm",
				"niv-shortest": "Phm; Phm",
				"nlt-long": "Philemon; Philemon",
				"nlt-short": "Phlm; Phlm"
			},
			"Phlm.1,Phlm.1.2": {
				"esv-long": "Philemon; Philemon 2",
				"esv-short": "Philem.; Philem. 2",
				"niv-long": "Philemon; Philemon 2",
				"niv-short": "Phlm; Phlm 2",
				"niv-shortest": "Phm; Phm 2",
				"nlt-long": "Philemon; Philemon 2",
				"nlt-short": "Phlm; Phlm 2"
			}
		})
	})
	it("should handle `single-chapter bc, different b`", function() {
		loopTest({
			"Phlm.1,Rev": {
				"esv-long": "Philemon; Revelation",
				"esv-short": "Philem.; Rev.",
				"niv-long": "Philemon; Revelation",
				"niv-short": "Phlm; Rev",
				"niv-shortest": "Phm; Rev",
				"nlt-long": "Philemon; Revelation",
				"nlt-short": "Phlm; Rev"
			},
			"Phlm.1,Rev.1": {
				"esv-long": "Philemon; Revelation 1",
				"esv-short": "Philem.; Rev. 1",
				"niv-long": "Philemon; Revelation 1",
				"niv-short": "Phlm; Rev 1",
				"niv-shortest": "Phm; Rev 1",
				"nlt-long": "Philemon; Revelation 1",
				"nlt-short": "Phlm; Rev 1"
			},
			"Phlm.1,Rev.1.2": {
				"esv-long": "Philemon; Revelation 1:2",
				"esv-short": "Philem.; Rev. 1:2",
				"niv-long": "Philemon; Revelation 1:2",
				"niv-short": "Phlm; Rev 1:2",
				"niv-shortest": "Phm; Rev 1:2",
				"nlt-long": "Philemon; Revelation 1:2",
				"nlt-short": "Phlm; Rev 1:2"
			}
		})
	})
	it("should handle `single-chapter bc, different single-chapter b`", function() {
		loopTest({
			"Phlm.1,Jude": {
				"esv-long": "Philemon; Jude",
				"esv-short": "Philem.; Jude",
				"niv-long": "Philemon; Jude",
				"niv-short": "Phlm; Jude",
				"niv-shortest": "Phm; Jude",
				"nlt-long": "Philemon; Jude",
				"nlt-short": "Phlm; Jude"
			},
			"Phlm.1,Jude.1": {
				"esv-long": "Philemon; Jude",
				"esv-short": "Philem.; Jude",
				"niv-long": "Philemon; Jude",
				"niv-short": "Phlm; Jude",
				"niv-shortest": "Phm; Jude",
				"nlt-long": "Philemon; Jude",
				"nlt-short": "Phlm; Jude"
			},
			"Phlm.1,Jude.1.2": {
				"esv-long": "Philemon; Jude 2",
				"esv-short": "Philem.; Jude 2",
				"niv-long": "Philemon; Jude 2",
				"niv-short": "Phlm; Jude 2",
				"niv-shortest": "Phm; Jude 2",
				"nlt-long": "Philemon; Jude 2",
				"nlt-short": "Phlm; Jude 2"
			}
		})
	})
})

describe("`bcv` sequences", function() {
	it("should handle `bcv, same b`", function() {
		loopTest({
			"Gen.1.1,Gen": {
				"esv-long": "Genesis 1:1; Genesis",
				"esv-short": "Gen. 1:1; Gen.",
				"niv-long": "Genesis 1:1; Genesis",
				"niv-short": "Gen 1:1; Gen",
				"niv-shortest": "Ge 1:1; Ge",
				"nlt-long": "Genesis 1:1; Genesis",
				"nlt-short": "Gen 1:1; Gen"
			},
			"Gen.1.1,Gen.2": {
				"esv-long": "Genesis 1:1; ch. 2",
				"esv-short": "Gen. 1:1; ch. 2",
				"niv-long": "Genesis 1:1; ch. 2",
				"niv-short": "Gen 1:1; ch. 2",
				"niv-shortest": "Ge 1:1; Ge 2",
				"nlt-long": "Genesis 1:1; ch 2",
				"nlt-short": "Gen 1:1; ch 2"
			},
			"Gen.1.1,Gen.2-Gen.3": {
				"esv-long": "Genesis 1:1; chs. 2\u20143",
				"esv-short": "Gen. 1:1; chs. 2\u20143",
				"niv-long": "Genesis 1:1; chs. 2\u20143",
				"niv-short": "Gen 1:1; chs. 2\u20143",
				"niv-shortest": "Ge 1:1; Ge 2-3",
				"nlt-long": "Genesis 1:1; chs 2\u20143",
				"nlt-short": "Gen 1:1; chs 2\u20143"
			},
			"Gen.1.1,Gen.2.3": {
				"esv-long": "Genesis 1:1; 2:3",
				"esv-short": "Gen. 1:1; 2:3",
				"niv-long": "Genesis 1:1; 2:3",
				"niv-short": "Gen 1:1; 2:3",
				"niv-shortest": "Ge 1:1; 2:3",
				"nlt-long": "Genesis 1:1; 2:3",
				"nlt-short": "Gen 1:1; 2:3"
			},
			"Gen.1.1,Gen.1.2-Gen.1.3": {
				"esv-long": "Genesis 1:1, 2\u20133",
				"esv-short": "Gen. 1:1, 2\u20133",
				"niv-long": "Genesis 1:1,2\u20133",
				"niv-short": "Gen 1:1,2\u20133",
				"niv-shortest": "Ge 1:1, 2-3",
				"nlt-long": "Genesis 1:1, 2\u20133",
				"nlt-short": "Gen 1:1, 2\u20133"
			}
		})
	})
	it("should handle `bcv, same bc`", function() {
		loopTest({
			"Gen.1.1,Gen.1": {
				"esv-long": "Genesis 1:1; ch. 1",
				"esv-short": "Gen. 1:1; ch. 1",
				"niv-long": "Genesis 1:1; ch. 1",
				"niv-short": "Gen 1:1; ch. 1",
				"niv-shortest": "Ge 1:1; Ge 1",
				"nlt-long": "Genesis 1:1; ch 1",
				"nlt-short": "Gen 1:1; ch 1"
			},
			"Gen.1.1,Gen.1.2": {
				"esv-long": "Genesis 1:1, 2",
				"esv-short": "Gen. 1:1, 2",
				"niv-long": "Genesis 1:1,2",
				"niv-short": "Gen 1:1,2",
				"niv-shortest": "Ge 1:1, 2",
				"nlt-long": "Genesis 1:1, 2",
				"nlt-short": "Gen 1:1, 2"
			}
		})
	})
	it("should handle `bcv, same bcv`", function() {
		loopTest({
			"Gen.1.1,Gen.1.1": {
				"esv-long": "Genesis 1:1, 1",
				"esv-short": "Gen. 1:1, 1",
				"niv-long": "Genesis 1:1,1",
				"niv-short": "Gen 1:1,1",
				"niv-shortest": "Ge 1:1, 1",
				"nlt-long": "Genesis 1:1, 1",
				"nlt-short": "Gen 1:1, 1"
			}
		})
	})
	it("should handle `bcv, different b`", function() {
		loopTest({
			"Gen.1.1,Matt": {
				"esv-long": "Genesis 1:1; Matthew",
				"esv-short": "Gen. 1:1; Matt.",
				"niv-long": "Genesis 1:1; Matthew",
				"niv-short": "Gen 1:1; Matt",
				"niv-shortest": "Ge 1:1; Mt",
				"nlt-long": "Genesis 1:1; Matthew",
				"nlt-short": "Gen 1:1; Matt"
			},
			"Gen.1.1,Matt.2": {
				"esv-long": "Genesis 1:1; Matthew 2",
				"esv-short": "Gen. 1:1; Matt. 2",
				"niv-long": "Genesis 1:1; Matthew 2",
				"niv-short": "Gen 1:1; Matt 2",
				"niv-shortest": "Ge 1:1; Mt 2",
				"nlt-long": "Genesis 1:1; Matthew 2",
				"nlt-short": "Gen 1:1; Matt 2"
			},
			"Gen.1.1,Matt.2.3": {
				"esv-long": "Genesis 1:1; Matthew 2:3",
				"esv-short": "Gen. 1:1; Matt. 2:3",
				"niv-long": "Genesis 1:1; Matthew 2:3",
				"niv-short": "Gen 1:1; Matt 2:3",
				"niv-shortest": "Ge 1:1; Mt 2:3",
				"nlt-long": "Genesis 1:1; Matthew 2:3",
				"nlt-short": "Gen 1:1; Matt 2:3"
			}
		})
	})
	it("should handle `bcv, different, single-chapter b`", function() {
		loopTest({
			"Gen.1.1,Phlm": {
				"esv-long": "Genesis 1:1; Philemon",
				"esv-short": "Gen. 1:1; Philem.",
				"niv-long": "Genesis 1:1; Philemon",
				"niv-short": "Gen 1:1; Phlm",
				"niv-shortest": "Ge 1:1; Phm",
				"nlt-long": "Genesis 1:1; Philemon",
				"nlt-short": "Gen 1:1; Phlm"
			},
			"Gen.1.1,Phlm.1": {
				"esv-long": "Genesis 1:1; Philemon",
				"esv-short": "Gen. 1:1; Philem.",
				"niv-long": "Genesis 1:1; Philemon",
				"niv-short": "Gen 1:1; Phlm",
				"niv-shortest": "Ge 1:1; Phm",
				"nlt-long": "Genesis 1:1; Philemon",
				"nlt-short": "Gen 1:1; Phlm"
			},
			"Gen.1.1,Phlm.1.2": {
				"esv-long": "Genesis 1:1; Philemon 2",
				"esv-short": "Gen. 1:1; Philem. 2",
				"niv-long": "Genesis 1:1; Philemon 2",
				"niv-short": "Gen 1:1; Phlm 2",
				"niv-shortest": "Ge 1:1; Phm 2",
				"nlt-long": "Genesis 1:1; Philemon 2",
				"nlt-short": "Gen 1:1; Phlm 2"
			}
		})
	})
	it("should handle `bcv, Ps151`", function() {
		loopTest({
			"Gen.1.1,Ps151": {
				"esv-long": "Genesis 1:1; Psalm 151",
				"esv-short": "Gen. 1:1; Ps. 151",
				"niv-long": "Genesis 1:1; Psalm 151",
				"niv-short": "Gen 1:1; Ps 151",
				"niv-shortest": "Ge 1:1; Ps 151",
				"nlt-long": "Genesis 1:1; Psalm 151",
				"nlt-short": "Gen 1:1; Ps 151"
			},
			"Gen.1.1,Ps151.1": {
				"esv-long": "Genesis 1:1; Psalm 151",
				"esv-short": "Gen. 1:1; Ps. 151",
				"niv-long": "Genesis 1:1; Psalm 151",
				"niv-short": "Gen 1:1; Ps 151",
				"niv-shortest": "Ge 1:1; Ps 151",
				"nlt-long": "Genesis 1:1; Psalm 151",
				"nlt-short": "Gen 1:1; Ps 151"
			},
			"Gen.1.1,Ps151.1.2": {
				"esv-long": "Genesis 1:1; Psalm 151:2",
				"esv-short": "Gen. 1:1; Ps. 151:2",
				"niv-long": "Genesis 1:1; Psalm 151:2",
				"niv-short": "Gen 1:1; Ps 151:2",
				"niv-shortest": "Ge 1:1; Ps 151:2",
				"nlt-long": "Genesis 1:1; Psalm 151:2",
				"nlt-short": "Gen 1:1; Ps 151:2"
			}
		})
	})
	it("should handle `Ps.cv, Ps151`", function() {
		loopTest({
			"Ps.1.1,Ps151": {
				"esv-long": "Psalms 1:1; Psalm 151",
				"esv-short": "Pss. 1:1; Ps. 151",
				"niv-long": "Psalms 1:1; Psalm 151",
				"niv-short": "Pss 1:1; Ps 151",
				"niv-shortest": "Ps 1:1; Ps 151",
				"nlt-long": "Psalms 1:1; Psalm 151",
				"nlt-short": "Pss 1:1; Ps 151"
			},
			"Ps.1.1,Ps151.1": {
				"esv-long": "Psalms 1:1; Psalm 151",
				"esv-short": "Pss. 1:1; Ps. 151",
				"niv-long": "Psalms 1:1; Psalm 151",
				"niv-short": "Pss 1:1; Ps 151",
				"niv-shortest": "Ps 1:1; Ps 151",
				"nlt-long": "Psalms 1:1; Psalm 151",
				"nlt-short": "Pss 1:1; Ps 151"
			},
			"Ps.1.1,Ps151.1.2": {
				"esv-long": "Psalms 1:1; 151:2",
				"esv-short": "Pss. 1:1; 151:2",
				"niv-long": "Psalms 1:1; 151:2",
				"niv-short": "Pss 1:1; 151:2",
				"niv-shortest": "Ps 1:1; 151:2",
				"nlt-long": "Psalms 1:1; 151:2",
				"nlt-short": "Pss 1:1; 151:2"
			}
		})
	})
})

describe("`bv` sequences", function() {
	it("should handle `bv, same b`", function() {
		loopTest({
			"Phlm.1.1,Phlm": {
				"esv-long": "Philemon 1; Philemon",
				"esv-short": "Philem. 1; Philem.",
				"niv-long": "Philemon 1; Philemon",
				"niv-short": "Phlm 1; Phlm",
				"niv-shortest": "Phm 1; Phm",
				"nlt-long": "Philemon 1; Philemon",
				"nlt-short": "Phlm 1; Phlm"
			},
			"Phlm.1.1,Phlm.1": {
				"esv-long": "Philemon 1; Philemon",
				"esv-short": "Philem. 1; Philem.",
				"niv-long": "Philemon 1; Philemon",
				"niv-short": "Phlm 1; Phlm",
				"niv-shortest": "Phm 1; Phm",
				"nlt-long": "Philemon 1; Philemon",
				"nlt-short": "Phlm 1; Phlm"
			},
			"Phlm.1.1,Phlm.1.2": {
				"esv-long": "Philemon 1, 2",
				"esv-short": "Philem. 1, 2",
				"niv-long": "Philemon 1,2",
				"niv-short": "Phlm 1,2",
				"niv-shortest": "Phm 1, 2",
				"nlt-long": "Philemon 1, 2",
				"nlt-short": "Phlm 1, 2"
			}
		})
	})
	it("should handle `bv, same bcv`", function() {
		loopTest({
			"Phlm.1.1,Phlm.1.1": {
				"esv-long": "Philemon 1, 1",
				"esv-short": "Philem. 1, 1",
				"niv-long": "Philemon 1,1",
				"niv-short": "Phlm 1,1",
				"niv-shortest": "Phm 1, 1",
				"nlt-long": "Philemon 1, 1",
				"nlt-short": "Phlm 1, 1"
			}
		})
	})
	it("should handle `bv, different b`", function() {
		loopTest({
			"Phlm.1.1,Rev": {
				"esv-long": "Philemon 1; Revelation",
				"esv-short": "Philem. 1; Rev.",
				"niv-long": "Philemon 1; Revelation",
				"niv-short": "Phlm 1; Rev",
				"niv-shortest": "Phm 1; Rev",
				"nlt-long": "Philemon 1; Revelation",
				"nlt-short": "Phlm 1; Rev"
			},
			"Phlm.1.1,Rev.1": {
				"esv-long": "Philemon 1; Revelation 1",
				"esv-short": "Philem. 1; Rev. 1",
				"niv-long": "Philemon 1; Revelation 1",
				"niv-short": "Phlm 1; Rev 1",
				"niv-shortest": "Phm 1; Rev 1",
				"nlt-long": "Philemon 1; Revelation 1",
				"nlt-short": "Phlm 1; Rev 1"
			},
			"Phlm.1.1,Rev.1.2": {
				"esv-long": "Philemon 1; Revelation 1:2",
				"esv-short": "Philem. 1; Rev. 1:2",
				"niv-long": "Philemon 1; Revelation 1:2",
				"niv-short": "Phlm 1; Rev 1:2",
				"niv-shortest": "Phm 1; Rev 1:2",
				"nlt-long": "Philemon 1; Revelation 1:2",
				"nlt-short": "Phlm 1; Rev 1:2"
			}
		})
	})
	it("should handle `bv, different single-chapter b`", function() {
		loopTest({
			"Phlm.1.1,Jude": {
				"esv-long": "Philemon 1; Jude",
				"esv-short": "Philem. 1; Jude",
				"niv-long": "Philemon 1; Jude",
				"niv-short": "Phlm 1; Jude",
				"niv-shortest": "Phm 1; Jude",
				"nlt-long": "Philemon 1; Jude",
				"nlt-short": "Phlm 1; Jude"
			},
			"Phlm.1.1,Jude.1": {
				"esv-long": "Philemon 1; Jude",
				"esv-short": "Philem. 1; Jude",
				"niv-long": "Philemon 1; Jude",
				"niv-short": "Phlm 1; Jude",
				"niv-shortest": "Phm 1; Jude",
				"nlt-long": "Philemon 1; Jude",
				"nlt-short": "Phlm 1; Jude"
			},
			"Phlm.1.1,Jude.1.2": {
				"esv-long": "Philemon 1; Jude 2",
				"esv-short": "Philem. 1; Jude 2",
				"niv-long": "Philemon 1; Jude 2",
				"niv-short": "Phlm 1; Jude 2",
				"niv-shortest": "Phm 1; Jude 2",
				"nlt-long": "Philemon 1; Jude 2",
				"nlt-short": "Phlm 1; Jude 2"
			}
		})
	})
})

describe("Context", function() {
	it("should handle `b^c`", function() {
		loopTest({
			"Gen.1/Gen": {
				"esv-long": "ch. 1",
				"esv-short": "ch. 1",
				"niv-long": "ch. 1",
				"niv-short": "ch. 1",
				"niv-shortest": "Ge 1",
				"nlt-long": "ch 1",
				"nlt-short": "ch 1"
			},
			"Gen.1-Gen.2/Gen": {
				"esv-long": "chs. 1\u20142",
				"esv-short": "chs. 1\u20142",
				"niv-long": "chs. 1\u20142",
				"niv-short": "chs. 1\u20142",
				"niv-shortest": "Ge 1-2",
				"nlt-long": "chs 1\u20142",
				"nlt-short": "chs 1\u20142"
			},
			"Gen.1-Matt.1/Gen": {
				"esv-long": "chs. 1\u2014Matthew 1",
				"esv-short": "chs. 1\u2014Matt. 1",
				"niv-long": "chs. 1\u2014Matthew 1",
				"niv-short": "chs. 1\u2014Matt 1",
				"niv-shortest": "Ge 1-Mt 1",
				"nlt-long": "chs 1\u2014Matthew 1",
				"nlt-short": "chs 1\u2014Matt 1"
			}
		})
	})
	it("should handle `b^cv`", function() {
		loopTest({
			"Gen.1.1/Gen": {
				"esv-long": "1:1",
				"esv-short": "1:1",
				"niv-long": "1:1",
				"niv-short": "1:1",
				"niv-shortest": "1:1",
				"nlt-long": "1:1",
				"nlt-short": "1:1"
			},
			"Gen.1.1-Gen.2/Gen": {
				"esv-long": "1:1\u2014ch. 2",
				"esv-short": "1:1\u2014ch. 2",
				"niv-long": "1:1\u2014ch. 2",
				"niv-short": "1:1\u2014ch. 2",
				"niv-shortest": "1:1-Ge 2",
				"nlt-long": "1:1\u2014ch 2",
				"nlt-short": "1:1\u2014ch 2"
			},
			"Gen.1.1-Matt.1/Gen": {
				"esv-long": "1:1\u2014Matthew 1",
				"esv-short": "1:1\u2014Matt. 1",
				"niv-long": "1:1\u2014Matthew 1",
				"niv-short": "1:1\u2014Matt 1",
				"niv-shortest": "1:1-Mt 1",
				"nlt-long": "1:1\u2014Matthew 1",
				"nlt-short": "1:1\u2014Matt 1"
			}
		})
	})
	it("should handle `b1^c`", function() {
		loopTest({
			"Phlm.1/Phlm": {
				"esv-long": "Philemon",
				"esv-short": "Philem.",
				"niv-long": "Philemon",
				"niv-short": "Phlm",
				"niv-shortest": "Phm",
				"nlt-long": "Philemon",
				"nlt-short": "Phlm"
			}
		})
	})
	it("should handle `b1^v`", function() {
		loopTest({
			"Phlm.1.1-Phlm.1.2/Phlm": {
				"esv-long": "vv. 1\u20132",
				"esv-short": "vv. 1\u20132",
				"niv-long": "vv. 1\u20132",
				"niv-short": "vv. 1\u20132",
				"niv-shortest": "ver 1-2",
				"nlt-long": "vv 1\u20132",
				"nlt-short": "vv 1\u20132"
			},
			"Phlm.1.1-Jude.1.2/Phlm": {
				"esv-long": "vv. 1\u2014Jude 2",
				"esv-short": "vv. 1\u2014Jude 2",
				"niv-long": "vv. 1\u2014Jude 2",
				"niv-short": "vv. 1\u2014Jude 2",
				"niv-shortest": "ver 1-Jude 2",
				"nlt-long": "vv 1\u2014Jude 2",
				"nlt-short": "vv 1\u2014Jude 2"
			}
		})
	})
})

describe("Not switching styles", function() {
	it("should work when not switching styles", function() {
		expect(() => osisToLang("esv-long", "Matt.1")).not.toThrow()
		expect(() => osisToLang("esv-long", "Matt.2")).not.toThrow()
	})
})
