Liferay.Loader.define("dynamic-data-lists-form-web@1.2.0/admin/templates/calculator.es", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy', './calculator.soy'], function (exports, _component, _Soy, _calculator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

  var _Soy2 = _interopRequireDefault(_Soy);

  var _calculator2 = _interopRequireDefault(_calculator);

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

  var Calculator = function (_Component) {
    _inherits(Calculator, _Component);

    function Calculator() {
      _classCallCheck(this, Calculator);

      return _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).apply(this, arguments));
    }

    return Calculator;
  }(_component2.default);

  // Register component
  _Soy2.default.register(Calculator, _calculator2.default, 'render');

  exports.default = Calculator;
});
//# sourceMappingURL=calculator.es.js.map