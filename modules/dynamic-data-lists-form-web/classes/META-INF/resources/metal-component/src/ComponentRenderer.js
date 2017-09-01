define(['exports'], function (exports) {
	'use strict';

	/**
  * Base class that component renderers should extend from. It defines the
  * required methods all renderers should have.
  */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var ComponentRenderer = function () {
		function ComponentRenderer() {
			_classCallCheck(this, ComponentRenderer);
		}

		_createClass(ComponentRenderer, [{
			key: 'dispose',
			value: function dispose() {}
		}, {
			key: 'getExtraDataConfig',
			value: function getExtraDataConfig() {}
		}, {
			key: 'render',
			value: function render(component) {
				if (!component.element) {
					component.element = document.createElement('div');
				}
				component.informRendered();
			}
		}, {
			key: 'setUp',
			value: function setUp() {}
		}, {
			key: 'update',
			value: function update() {}
		}]);

		return ComponentRenderer;
	}();

	exports.default = new ComponentRenderer();
});
//# sourceMappingURL=ComponentRenderer.js.map