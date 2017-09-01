Liferay.Loader.define("dynamic-data-lists-form-web@1.2.0/admin/templates/calculator.soy", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.DDLCalculator = undefined;

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

    // This file was automatically generated from calculator.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace DDLCalculator.
     * @public
     */

    goog.module('DDLCalculator.incrementaldom');

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
     *    calculatorAngleLeft: (?soydata.SanitizedHtml|string|undefined),
     *    calculatorEllipsis: (?soydata.SanitizedHtml|string|undefined),
     *    strings: {addField: string}
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.calculatorAngleLeft == null || opt_data.calculatorAngleLeft instanceof Function || opt_data.calculatorAngleLeft instanceof soydata.UnsanitizedText || goog.isString(opt_data.calculatorAngleLeft), 'calculatorAngleLeft', opt_data.calculatorAngleLeft, '?soydata.SanitizedHtml|string|undefined');
      var calculatorAngleLeft = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.calculatorAngleLeft;
      soy.asserts.assertType(opt_data.calculatorEllipsis == null || opt_data.calculatorEllipsis instanceof Function || opt_data.calculatorEllipsis instanceof soydata.UnsanitizedText || goog.isString(opt_data.calculatorEllipsis), 'calculatorEllipsis', opt_data.calculatorEllipsis, '?soydata.SanitizedHtml|string|undefined');
      var calculatorEllipsis = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.calculatorEllipsis;
      var strings = goog.asserts.assertObject(opt_data.strings, "expected parameter 'strings' of type [addField: string].");
      ie_open('div');
      ie_open('div', null, null, 'class', 'calculator-add-field-button-container');
      ie_open('button', null, null, 'class', 'btn btn-default btn-lg btn-primary calculator-add-field-button ddl-button', 'type', 'button');
      ie_open('span', null, null, 'class', '');
      var dyn10 = strings.addField;
      if (typeof dyn10 == 'function') dyn10();else if (dyn10 != null) itext(dyn10);
      ie_close('span');
      ie_close('button');
      ie_close('div');
      ie_open('div', null, null, 'class', 'calculator-button-area');
      ie_open('ul', null, null, 'class', 'calculator-buttons calculator-buttons-numbers');
      ie_open('li', null, null, 'class', 'border-top-left button-padding-icons calculator-button', 'data-calculator-key', 'backspace');
      var dyn11 = calculatorAngleLeft;
      if (typeof dyn11 == 'function') dyn11();else if (dyn11 != null) itext(dyn11);
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '(');
      itext('(');
      ie_close('li');
      ie_open('li', null, null, 'class', 'border-top-right calculator-button', 'data-calculator-key', ')');
      itext(')');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '1');
      itext('1');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '2');
      itext('2');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '3');
      itext('3');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '4');
      itext('4');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '5');
      itext('5');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '6');
      itext('6');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '7');
      itext('7');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '8');
      itext('8');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '9');
      itext('9');
      ie_close('li');
      ie_open('li', null, null, 'class', 'border-bottom-left button-two-columns calculator-button', 'data-calculator-key', '0');
      itext('0');
      ie_close('li');
      ie_open('li', null, null, 'class', 'border-bottom-right calculator-button', 'data-calculator-key', '.');
      itext('.');
      ie_close('li');
      ie_close('ul');
      ie_open('ul', null, null, 'class', 'calculator-buttons calculator-buttons-operators');
      ie_open('li', null, null, 'class', 'border-top-left border-top-right button-padding-icons calculator-add-operator-button-area');
      var dyn12 = calculatorEllipsis;
      if (typeof dyn12 == 'function') dyn12();else if (dyn12 != null) itext(dyn12);
      ie_void('div', null, null, 'class', 'calculator-add-operator-button');
      ie_void('div', null, null, 'class', 'container-list-advanced-operators');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '+');
      itext('+');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '-');
      itext('-');
      ie_close('li');
      ie_open('li', null, null, 'class', 'calculator-button', 'data-calculator-key', '*');
      itext('*');
      ie_close('li');
      ie_open('li', null, null, 'class', 'border-bottom-left border-bottom-right calculator-button', 'data-calculator-key', '/');
      itext('/');
      ie_close('li');
      ie_close('ul');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'DDLCalculator.render';
    }

    exports.render.params = ["calculatorAngleLeft", "calculatorEllipsis"];
    exports.render.types = { "calculatorAngleLeft": "html", "calculatorEllipsis": "html" };
    exports.templates = templates = exports;
    return exports;
  });

  var DDLCalculator = function (_Component) {
    _inherits(DDLCalculator, _Component);

    function DDLCalculator() {
      _classCallCheck(this, DDLCalculator);

      return _possibleConstructorReturn(this, (DDLCalculator.__proto__ || Object.getPrototypeOf(DDLCalculator)).apply(this, arguments));
    }

    return DDLCalculator;
  }(_component2.default);

  _Soy2.default.register(DDLCalculator, templates);
  exports.DDLCalculator = DDLCalculator;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=calculator.soy.js.map