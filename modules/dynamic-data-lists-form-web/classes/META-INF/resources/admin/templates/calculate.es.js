Liferay.Loader.define("dynamic-data-lists-form-web@1.2.0/admin/templates/calculate.es", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy', './calculate.soy'], function (exports, _component, _Soy, _calculate) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _component2 = _interopRequireDefault(_component);

	var _Soy2 = _interopRequireDefault(_Soy);

	var _calculate2 = _interopRequireDefault(_calculate);

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

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

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

	var CalculateTemplates = [];

	for (var template in _calculate2.default) {
		if (template !== 'templates') {
			var C = function (_Component) {
				_inherits(C, _Component);

				function C() {
					_classCallCheck(this, C);

					return _possibleConstructorReturn(this, (C.__proto__ || Object.getPrototypeOf(C)).apply(this, arguments));
				}

				return C;
			}(_component2.default);

			;
			_Soy2.default.register(C, _calculate2.default, template);
			CalculateTemplates.push({
				key: template,
				component: C
			});
		}
	}

	exports.default = CalculateTemplates;
});
//# sourceMappingURL=calculate.es.js.map