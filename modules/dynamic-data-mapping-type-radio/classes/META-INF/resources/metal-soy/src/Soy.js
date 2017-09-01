define(['exports', 'metal-component/src/all/component', 'metal/src/metal', 'metal-state/src/all/state', 'html2incdom/src/withParser', 'metal-incremental-dom/src/IncrementalDomRenderer', './SoyAop', 'metal-soy-bundle/build/bundle'], function (exports, _component, _metal, _state, _withParser, _IncrementalDomRenderer, _SoyAop) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.validators = exports.SoyAop = exports.Soy = exports.Config = undefined;

	var _withParser2 = _interopRequireDefault(_withParser);

	var _IncrementalDomRenderer2 = _interopRequireDefault(_IncrementalDomRenderer);

	var _SoyAop2 = _interopRequireDefault(_SoyAop);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	var _get = function get(object, property, receiver) {
		if (object === null) object = Function.prototype;
		var desc = Object.getOwnPropertyDescriptor(object, property);

		if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);

			if (parent === null) {
				return undefined;
			} else {
				return get(parent, property, receiver);
			}
		} else if ("value" in desc) {
			return desc.value;
		} else {
			var getter = desc.get;

			if (getter === undefined) {
				return undefined;
			}

			return getter.call(receiver);
		}
	};

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	// The injected data that will be passed to soy templates.
	var ijData = {};

	var Soy = function (_IncrementalDomRender) {
		_inherits(Soy, _IncrementalDomRender);

		function Soy() {
			_classCallCheck(this, Soy);

			return _possibleConstructorReturn(this, (Soy.__proto__ || Object.getPrototypeOf(Soy)).apply(this, arguments));
		}

		_createClass(Soy, [{
			key: 'getExtraDataConfig',
			value: function getExtraDataConfig(component) {
				var elementTemplate = component.constructor.TEMPLATE;
				if (!(0, _metal.isFunction)(elementTemplate)) {
					return;
				}

				elementTemplate = _SoyAop2.default.getOriginalFn(elementTemplate);
				this.soyParamTypes_ = elementTemplate.types || {};

				var keys = elementTemplate.params || [];
				var configs = {};
				for (var i = 0; i < keys.length; i++) {
					if (!component[keys[i]]) {
						configs[keys[i]] = {};
					}
				}
				return configs;
			}
		}, {
			key: 'buildTemplateData_',
			value: function buildTemplateData_(component, params) {
				var _this2 = this;

				var data = _metal.object.mixin({}, this.getConfig(component));
				component.getStateKeys().forEach(function (key) {
					var value = component[key];
					if (_this2.isHtmlParam_(component, key)) {
						value = soyRenderer_.toIncDom(value);
					}
					data[key] = value;
				});

				for (var i = 0; i < params.length; i++) {
					if (!data[params[i]] && (0, _metal.isFunction)(component[params[i]])) {
						data[params[i]] = component[params[i]].bind(component);
					}
				}

				if ((0, _metal.isFunction)(component.prepareStateForRender)) {
					return component.prepareStateForRender(data) || data;
				} else {
					return data;
				}
			}
		}, {
			key: 'getTemplate',
			value: function getTemplate(namespace, templateName) {
				return function (opt_data, opt_ignored, opt_ijData) {
					if (!goog.loadedModules_[namespace]) {
						throw new Error('No template with namespace "' + namespace + '" has been loaded yet.');
					}
					return goog.loadedModules_[namespace][templateName](opt_data, opt_ignored, opt_ijData);
				};
			}
		}, {
			key: 'handleInterceptedCall_',
			value: function handleInterceptedCall_(originalFn) {
				var opt_data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				var args = [originalFn.componentCtor, null, []];
				for (var key in opt_data) {
					args.push(key, opt_data[key]);
				}
				IncrementalDOM.elementVoid.apply(null, args);
			}
		}, {
			key: 'isHtmlParam_',
			value: function isHtmlParam_(component, name) {
				var state = component.getDataManager().getStateInstance(component);
				if (state.getStateKeyConfig(name).isHtml) {
					return true;
				}

				var elementTemplate = _SoyAop2.default.getOriginalFn(component.constructor.TEMPLATE);
				var type = (elementTemplate.types || {})[name] || '';
				return type.split('|').indexOf('html') !== -1;
			}
		}, {
			key: 'register',
			value: function register(componentCtor, templates) {
				var mainTemplate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'render';

				componentCtor.RENDERER = soyRenderer_;
				componentCtor.TEMPLATE = _SoyAop2.default.getOriginalFn(templates[mainTemplate]);
				componentCtor.TEMPLATE.componentCtor = componentCtor;
				_SoyAop2.default.registerForInterception(templates, mainTemplate);
				_component.ComponentRegistry.register(componentCtor);
			}
		}, {
			key: 'renderIncDom',
			value: function renderIncDom(component) {
				var elementTemplate = component.constructor.TEMPLATE;
				if ((0, _metal.isFunction)(elementTemplate) && !component.render) {
					elementTemplate = _SoyAop2.default.getOriginalFn(elementTemplate);
					_SoyAop2.default.startInterception(this.handleInterceptedCall_);
					var data = this.buildTemplateData_(component, elementTemplate.params || []);
					elementTemplate(data, null, ijData);
					_SoyAop2.default.stopInterception();
				} else {
					_get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'renderIncDom', this).call(this, component);
				}
			}
		}, {
			key: 'setInjectedData',
			value: function setInjectedData(data) {
				ijData = data || {};
			}
		}, {
			key: 'shouldUpdate',
			value: function shouldUpdate(component, changes) {
				var should = _get(Soy.prototype.__proto__ || Object.getPrototypeOf(Soy.prototype), 'shouldUpdate', this).call(this, component, changes);
				if (!should || component.shouldUpdate) {
					return should;
				}

				var fn = component.constructor.TEMPLATE;
				var params = fn ? _SoyAop2.default.getOriginalFn(fn).params : [];
				for (var i = 0; i < params.length; i++) {
					if (changes.props[params[i]]) {
						return true;
					}
				}
				return false;
			}
		}, {
			key: 'toHtmlString',
			value: function toHtmlString(incDomFn) {
				var element = document.createElement('div');
				IncrementalDOM.patch(element, incDomFn);
				return element.innerHTML;
			}
		}, {
			key: 'toIncDom',
			value: function toIncDom(value) {
				if ((0, _metal.isObject)(value) && (0, _metal.isString)(value.content) && value.contentKind === 'HTML') {
					value = value.content;
				}
				if ((0, _metal.isString)(value)) {
					value = _withParser2.default.buildFn(value);
				}
				return value;
			}
		}]);

		return Soy;
	}(_IncrementalDomRenderer2.default.constructor);

	var soyRenderer_ = new Soy();
	soyRenderer_.RENDERER_NAME = 'soy';

	exports.default = soyRenderer_;
	exports.Config = _state.Config;
	exports.Soy = soyRenderer_;
	exports.SoyAop = _SoyAop2.default;
	exports.validators = _state.validators;
});
//# sourceMappingURL=Soy.js.map