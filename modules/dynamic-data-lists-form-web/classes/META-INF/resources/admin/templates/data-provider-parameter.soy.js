Liferay.Loader.define("dynamic-data-lists-form-web@1.2.0/admin/templates/data-provider-parameter.soy", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.DDLDataProviderParameter = undefined;

  var _component2 = _interopRequireDefault(_component);

  var _Soy2 = _interopRequireDefault(_Soy);

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

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from data-provider-parameter.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace DDLDataProviderParameter.
     * @public
     */

    goog.module('DDLDataProviderParameter.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    /** @suppress {extraRequire} */
    goog.require('soy.asserts');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.string');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    /**
     * @param {{
     *    hasInputs: boolean,
     *    hasRequiredInputs: boolean,
     *    strings: {dataProviderParameterInput: string, dataProviderParameterInputDescription: string, dataProviderParameterOutput: string, dataProviderParameterOutputDescription: string, requiredField: string}
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(goog.isBoolean(opt_data.hasInputs) || opt_data.hasInputs === 1 || opt_data.hasInputs === 0, 'hasInputs', opt_data.hasInputs, 'boolean');
      var hasInputs = /** @type {boolean} */!!opt_data.hasInputs;
      soy.asserts.assertType(goog.isBoolean(opt_data.hasRequiredInputs) || opt_data.hasRequiredInputs === 1 || opt_data.hasRequiredInputs === 0, 'hasRequiredInputs', opt_data.hasRequiredInputs, 'boolean');
      var hasRequiredInputs = /** @type {boolean} */!!opt_data.hasRequiredInputs;
      var strings = goog.asserts.assertObject(opt_data.strings, "expected parameter 'strings' of type [dataProviderParameterInput: string, dataProviderParameterInputDescription: string, dataProviderParameterOutput: string, dataProviderParameterOutputDescription: string, requiredField: string].");
      ie_open('div');
      if (hasInputs) {
        ie_open('div', null, null, 'class', 'data-provider-parameter-input-container');
        if (hasRequiredInputs) {
          ie_open('div', null, null, 'class', 'data-provider-label-container');
          ie_open('p', null, null, 'class', 'data-provider-parameter-input-required-field');
          var dyn13 = strings.requiredField;
          if (typeof dyn13 == 'function') dyn13();else if (dyn13 != null) itext(dyn13);
          ie_close('p');
          ie_void('span', null, null, 'class', 'icon-asterisk text-warning');
          ie_close('div');
        }
        ie_open('div', null, null, 'class', 'data-provider-label-container');
        ie_open('p', null, null, 'class', 'data-provider-parameter-input');
        ie_open('b');
        var dyn14 = strings.dataProviderParameterInput;
        if (typeof dyn14 == 'function') dyn14();else if (dyn14 != null) itext(dyn14);
        ie_close('b');
        ie_close('p');
        ie_open('p', null, null, 'class', 'data-provider-parameter-input-description');
        var dyn15 = strings.dataProviderParameterInputDescription;
        if (typeof dyn15 == 'function') dyn15();else if (dyn15 != null) itext(dyn15);
        ie_close('p');
        ie_close('div');
        ie_void('div', null, null, 'class', 'data-provider-parameter-input-list row');
        ie_close('div');
      }
      ie_open('div', null, null, 'class', 'data-provider-parameter-output-container');
      ie_open('div', null, null, 'class', 'data-provider-label-container');
      ie_open('p', null, null, 'class', 'data-provider-parameter-output');
      ie_open('b');
      var dyn16 = strings.dataProviderParameterOutput;
      if (typeof dyn16 == 'function') dyn16();else if (dyn16 != null) itext(dyn16);
      ie_close('b');
      ie_close('p');
      ie_open('p', null, null, 'class', 'data-provider-parameter-output-description');
      var dyn17 = strings.dataProviderParameterOutputDescription;
      if (typeof dyn17 == 'function') dyn17();else if (dyn17 != null) itext(dyn17);
      ie_close('p');
      ie_close('div');
      ie_void('div', null, null, 'class', 'data-provider-parameter-output-list row');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'DDLDataProviderParameter.render';
    }

    exports.render.params = ["hasInputs", "hasRequiredInputs"];
    exports.render.types = { "hasInputs": "bool", "hasRequiredInputs": "bool" };
    exports.templates = templates = exports;
    return exports;
  });

  var DDLDataProviderParameter = function (_Component) {
    _inherits(DDLDataProviderParameter, _Component);

    function DDLDataProviderParameter() {
      _classCallCheck(this, DDLDataProviderParameter);

      return _possibleConstructorReturn(this, (DDLDataProviderParameter.__proto__ || Object.getPrototypeOf(DDLDataProviderParameter)).apply(this, arguments));
    }

    return DDLDataProviderParameter;
  }(_component2.default);

  _Soy2.default.register(DDLDataProviderParameter, templates);
  exports.DDLDataProviderParameter = DDLDataProviderParameter;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=data-provider-parameter.soy.js.map