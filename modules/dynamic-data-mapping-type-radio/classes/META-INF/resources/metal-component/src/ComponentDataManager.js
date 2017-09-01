define(['exports', 'metal/src/metal', 'metal-state/src/all/state'], function (exports, _metal, _state) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _state2 = _interopRequireDefault(_state);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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

	var BLACKLIST = {
		components: true,
		context: true,
		element: true,
		refs: true,
		state: true,
		stateKey: true,
		wasRendered: true
	};
	var DATA_MANAGER_DATA = '__DATA_MANAGER_DATA__';

	var ComponentDataManager = function () {
		function ComponentDataManager() {
			_classCallCheck(this, ComponentDataManager);
		}

		_createClass(ComponentDataManager, [{
			key: 'createState_',
			value: function createState_(component, data) {
				var state = new _state2.default(component.getInitialConfig(), component, component);
				state.setKeysBlacklist(BLACKLIST);
				state.configState(_metal.object.mixin({}, data, _state2.default.getStateStatic(component.constructor)));
				this.getManagerData(component).state_ = state;
			}
		}, {
			key: 'dispose',
			value: function dispose(component) {
				var data = this.getManagerData(component);
				if (data.state_) {
					data.state_.dispose();
				}
				component[DATA_MANAGER_DATA] = null;
			}
		}, {
			key: 'get',
			value: function get(component, name) {
				return this.getManagerData(component).state_.get(name);
			}
		}, {
			key: 'getManagerData',
			value: function getManagerData(component) {
				return component[DATA_MANAGER_DATA];
			}
		}, {
			key: 'getSyncKeys',
			value: function getSyncKeys(component) {
				return this.getManagerData(component).state_.getStateKeys();
			}
		}, {
			key: 'getStateKeys',
			value: function getStateKeys(component) {
				return this.getManagerData(component).state_.getStateKeys();
			}
		}, {
			key: 'getState',
			value: function getState(component) {
				return this.getManagerData(component).state_.getState();
			}
		}, {
			key: 'getStateInstance',
			value: function getStateInstance(component) {
				return this.getManagerData(component).state_;
			}
		}, {
			key: 'replaceNonInternal',
			value: function replaceNonInternal(component, data, opt_state) {
				var state = opt_state || this.getManagerData(component).state_;
				var keys = state.getStateKeys();
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					if (!state.getStateKeyConfig(key).internal) {
						if (data.hasOwnProperty(key)) {
							state.set(key, data[key]);
						} else {
							state.setDefaultValue(key);
						}
					}
				}
			}
		}, {
			key: 'setState',
			value: function setState(component, state, opt_callback) {
				this.getManagerData(component).state_.setState(state, opt_callback);
			}
		}, {
			key: 'setUp',
			value: function setUp(component, data) {
				component[DATA_MANAGER_DATA] = {};
				this.createState_(component, data);
			}
		}]);

		return ComponentDataManager;
	}();

	exports.default = new ComponentDataManager();
});
//# sourceMappingURL=ComponentDataManager.js.map