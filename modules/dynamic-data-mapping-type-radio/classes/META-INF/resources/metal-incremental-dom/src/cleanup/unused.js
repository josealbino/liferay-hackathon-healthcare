define(['exports', '../data'], function (exports, _data) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.disposeUnused = disposeUnused;
	exports.schedule = schedule;


	var comps_ = [];
	var disposing_ = false;

	/**
  * Disposes all sub components that were not rerendered since the last
  * time this function was scheduled.
  */
	function disposeUnused() {
		if (disposing_) {
			return;
		}
		disposing_ = true;

		for (var i = 0; i < comps_.length; i++) {
			var comp = comps_[i];
			if (!comp.isDisposed() && !(0, _data.getData)(comp).parent) {
				// Don't let disposing cause the element to be removed, since it may
				// be currently being reused by another component.
				comp.element = null;
				comp.dispose();
			}
		}
		comps_ = [];
		disposing_ = false;
	}

	/**
  * Schedules the given components to be checked and disposed if not used
  * anymore when `disposeUnused` is called.
  * @param {!Array<!Component>} comps
  */
	function schedule(comps) {
		for (var i = 0; i < comps.length; i++) {
			if (!comps[i].isDisposed()) {
				(0, _data.getData)(comps[i]).parent = null;
				comps_.push(comps[i]);
			}
		}
	}
});
//# sourceMappingURL=unused.js.map