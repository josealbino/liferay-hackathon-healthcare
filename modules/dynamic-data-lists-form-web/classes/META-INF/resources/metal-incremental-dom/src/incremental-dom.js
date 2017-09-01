define(['exports', 'incremental-dom/dist/incremental-dom-cjs', 'incremental-dom-string/dist/incremental-dom-string', 'metal/src/metal'], function (exports, _incrementalDomCjs, _incrementalDomString, _metal) {
	'use strict';

	var IncrementalDOM = _interopRequireWildcard(_incrementalDomCjs);

	var IncrementalDOMString = _interopRequireWildcard(_incrementalDomString);

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};

			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}

			newObj.default = obj;
			return newObj;
		}
	}

	if ((0, _metal.isServerSide)()) {
		// Overrides global.IncrementalDOM virtual elements with incremental dom
		// string implementation for server side rendering. At the moment it does not
		// override for Node.js tests since tests are using jsdom to simulate the
		// browser.
		global.IncrementalDOM = IncrementalDOMString;
	} else {
		var scope = typeof exports !== 'undefined' && typeof global !== 'undefined' ? global : window;

		scope.IncrementalDOM = IncrementalDOM;
	}
});
//# sourceMappingURL=incremental-dom.js.map