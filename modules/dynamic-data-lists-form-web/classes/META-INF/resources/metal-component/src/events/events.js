define(['exports', 'metal/src/metal'], function (exports, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.addListenersFromObj = addListenersFromObj;
	exports.getComponentFn = getComponentFn;


	/**
  * Adds the listeners specified in the given object.
  * @param {!Component} component
  * @param {Object} events
  * @return {!Array<!EventHandle>} Handles from all subscribed events.
  */
	function addListenersFromObj(component, events) {
		var eventNames = Object.keys(events || {});
		var handles = [];
		for (var i = 0; i < eventNames.length; i++) {
			var info = extractListenerInfo_(component, events[eventNames[i]]);
			if (info.fn) {
				var handle = void 0;
				if (info.selector) {
					handle = component.delegate(eventNames[i], info.selector, info.fn);
				} else {
					handle = component.on(eventNames[i], info.fn);
				}
				handles.push(handle);
			}
		}
		return handles;
	}

	/**
  * Extracts listener info from the given value.
  * @param {!Component} component
  * @param {!Component} component
  * @param {function()|string|{selector:string,fn:function()|string}} value
  * @return {!{selector:string,fn:function()}}
  * @protected
  */
	function extractListenerInfo_(component, value) {
		var info = {
			fn: value
		};
		if ((0, _metal.isObject)(value) && !(0, _metal.isFunction)(value)) {
			info.selector = value.selector;
			info.fn = value.fn;
		}
		if ((0, _metal.isString)(info.fn)) {
			info.fn = getComponentFn(component, info.fn);
		}
		return info;
	}

	/**
  * Gets the listener function from its name. Throws an error if none exist.
  * @param {!Component} component
  * @param {string} fnName
  * @return {function()}
  */
	function getComponentFn(component, fnName) {
		if ((0, _metal.isFunction)(component[fnName])) {
			return component[fnName].bind(component);
		} else {
			console.error('No function named ' + fnName + ' was found in the component\n\t\t\t"' + (0, _metal.getFunctionName)(component.constructor) + '". Make sure that you specify\n\t\t\tvalid function names when adding inline listeners');
		}
	}
});
//# sourceMappingURL=events.js.map