Liferay.Loader.define("dynamic-data-lists-form-web@1.2.0/notification/form-entry-add-body.es", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy', './form_entry_add_body.soy'], function (exports, _component, _Soy, _form_entry_add_body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

  var _Soy2 = _interopRequireDefault(_Soy);

  var _form_entry_add_body2 = _interopRequireDefault(_form_entry_add_body);

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

  var FormEntryAddBody = function (_Component) {
    _inherits(FormEntryAddBody, _Component);

    function FormEntryAddBody() {
      _classCallCheck(this, FormEntryAddBody);

      return _possibleConstructorReturn(this, (FormEntryAddBody.__proto__ || Object.getPrototypeOf(FormEntryAddBody)).apply(this, arguments));
    }

    return FormEntryAddBody;
  }(_component2.default);

  // Register component
  _Soy2.default.register(FormEntryAddBody, _form_entry_add_body2.default, 'form_entry_add_body');

  exports.default = FormEntryAddBody;
});
//# sourceMappingURL=form_entry_add_body.es.js.map