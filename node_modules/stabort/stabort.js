/* exported sortBy */
/* global define, module */
(function (root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd)
		define([], factory);
	else if (typeof exports === 'object')
		module.exports = factory();
	else root.sortBy = factory();
})(this, function () {
	'use strict';

	return function sortBy(objs, prop, order) {
		// run sort on clone so as not to modify original
		var arrClone = [].slice.call(objs, 0);
		var desc = order.indexOf('desc') >= 0;

		arrClone.sort(function(a, b) {
			if (a[prop] < b[prop]) return desc ?  1 : -1;
			if (a[prop] > b[prop]) return desc ? -1 :  1;
			return objs.indexOf(a) - objs.indexOf(b);
		});

		return arrClone;
	};
});
