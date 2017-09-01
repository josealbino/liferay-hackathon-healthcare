define(['exports'], function (exports) {
	'use strict';

	/**
  * Builds the component config object from its incremental dom call's
  * arguments.
  * @param {!Array} args
  * @return {!Object}
  */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.buildConfigFromCall = buildConfigFromCall;
	exports.buildCallFromConfig = buildCallFromConfig;
	function buildConfigFromCall(args) {
		var config = {};
		if (args[1]) {
			config.key = args[1];
		}
		var attrsArr = (args[2] || []).concat(args.slice(3));
		for (var i = 0; i < attrsArr.length; i += 2) {
			config[attrsArr[i]] = attrsArr[i + 1];
		}
		return config;
	}

	/**
  * Builds an incremental dom call array from the given tag and config object.
  * @param {string} tag
  * @param {!Object} config
  * @return {!Array}
  */
	function buildCallFromConfig(tag, config) {
		var call = [tag, config.key, []];
		var keys = Object.keys(config);
		for (var i = 0; i < keys.length; i++) {
			if (keys[i] !== 'children' && keys[i] !== 'key') {
				call.push(keys[i], config[keys[i]]);
			}
		}
		return call;
	}
});
//# sourceMappingURL=callArgs.js.map