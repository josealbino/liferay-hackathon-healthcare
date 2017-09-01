Liferay.Loader.define("dynamic-data-mapping-type-radio@2.0.12/radio.es", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy', './radio.soy'], function (exports, _component, _Soy, _radio) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

  var _Soy2 = _interopRequireDefault(_Soy);

  var _radio2 = _interopRequireDefault(_radio);

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

  var Radio = function (_Component) {
    _inherits(Radio, _Component);

    function Radio() {
      _classCallCheck(this, Radio);

      return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
    }

    return Radio;
  }(_component2.default);

  // Register component
  _Soy2.default.register(Radio, _radio2.default, 'render');

  exports.default = Radio;
});
//# sourceMappingURL=radio.es.js.map