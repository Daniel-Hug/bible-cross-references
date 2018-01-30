/* DOM helpers
**************************************/

// Get elements by CSS selector:
function qs(selector, scope) {
	return (scope || document).querySelector(selector);
}
function qsa(selector, scope) {
	return (scope || document).querySelectorAll(selector);
}

// Add and remove event listeners:
function on(target, type, callback, useCapture) {
	target.addEventListener(type, callback, !!useCapture);
}
function off(target, type, callback, useCapture) {
	target.removeEventListener(type, callback, !!useCapture);
}
function once(target, type, callback, useCapture) {
	function oneTimeHandler() {
		callback.apply(this, arguments);
		off(target, type, oneTimeHandler, useCapture);
	}
	on(target, type, oneTimeHandler, useCapture);
}

// event.preventDefault shortcut:
// on('submit', instead(handler));
function instead(eventHandler) {
	return function(event) {
		event.preventDefault();
		if (eventHandler) eventHandler.apply(this, arguments);
	};
}

// removes all of an element's childNodes
function removeChilds(el) {
	var last;
	while ((last = el.lastChild)) el.removeChild(last);
}

// 1. calls renderer (should return DOM node) for each item in arr
// 2. appends all the DOM nodes to parent
function renderMultiple(arr, renderer, parent) {
	var renderedEls = map(arr, renderer); // 1
	var docFrag = document.createDocumentFragment();
	for (var i = renderedEls.length; i--;) docFrag.appendChild(renderedEls[i]);
	parent.appendChild(docFrag); // 2
}

// prepend instead of append DOM nodes
function prependAInB(newChild, parent) {
	parent.insertBefore(newChild, parent.firstChild);
}


function log() {
	console.log('this: ', this, '\narguments: ', arguments);
}

function sumArray(array) {
	var sum = 0;
	for (var i = 0, l = array.length; i < l; i++) sum += array[i];
	return sum;
}