Liferay.Loader.define("dynamic-data-mapping-type-radio@2.0.12/radio.soy", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.DDMRadio = undefined;

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

    // This file was automatically generated from radio.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace DDMRadio.
     * @hassoydeltemplate {ddm.field.idom}
     * @public
     */

    goog.module('DDMRadio.incrementaldom');

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
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s2_a0071001(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      $render(opt_data, null, opt_ijData);
    }
    exports.__deltemplate_s2_a0071001 = __deltemplate_s2_a0071001;
    if (goog.DEBUG) {
      __deltemplate_s2_a0071001.soyTemplateName = 'DDMRadio.__deltemplate_s2_a0071001';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('ddm.field.idom'), 'radio', 0, __deltemplate_s2_a0071001);

    /**
     * @param {{
     *    dir: (null|string|undefined),
     *    inline: boolean,
     *    label: string,
     *    name: string,
     *    options: !Array<{label: string, value: string}>,
     *    predefinedValue: (null|string|undefined),
     *    readOnly: boolean,
     *    required: (boolean|null|undefined),
     *    showLabel: boolean,
     *    tip: (null|string|undefined),
     *    value: string,
     *    visible: boolean
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.dir == null || opt_data.dir instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.dir), 'dir', opt_data.dir, 'null|string|undefined');
      var dir = /** @type {null|string|undefined} */opt_data.dir;
      soy.asserts.assertType(goog.isBoolean(opt_data.inline) || opt_data.inline === 1 || opt_data.inline === 0, 'inline', opt_data.inline, 'boolean');
      var inline = /** @type {boolean} */!!opt_data.inline;
      soy.asserts.assertType(goog.isString(opt_data.label) || opt_data.label instanceof goog.soy.data.SanitizedContent, 'label', opt_data.label, 'string|goog.soy.data.SanitizedContent');
      var label = /** @type {string|goog.soy.data.SanitizedContent} */opt_data.label;
      soy.asserts.assertType(goog.isString(opt_data.name) || opt_data.name instanceof goog.soy.data.SanitizedContent, 'name', opt_data.name, 'string|goog.soy.data.SanitizedContent');
      var name = /** @type {string|goog.soy.data.SanitizedContent} */opt_data.name;
      var options = goog.asserts.assertArray(opt_data.options, "expected parameter 'options' of type list<[label: string, value: string]>.");
      soy.asserts.assertType(opt_data.predefinedValue == null || opt_data.predefinedValue instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.predefinedValue), 'predefinedValue', opt_data.predefinedValue, 'null|string|undefined');
      var predefinedValue = /** @type {null|string|undefined} */opt_data.predefinedValue;
      soy.asserts.assertType(goog.isBoolean(opt_data.readOnly) || opt_data.readOnly === 1 || opt_data.readOnly === 0, 'readOnly', opt_data.readOnly, 'boolean');
      var readOnly = /** @type {boolean} */!!opt_data.readOnly;
      soy.asserts.assertType(opt_data.required == null || goog.isBoolean(opt_data.required) || opt_data.required === 1 || opt_data.required === 0, 'required', opt_data.required, 'boolean|null|undefined');
      var required = /** @type {boolean|null|undefined} */opt_data.required;
      soy.asserts.assertType(goog.isBoolean(opt_data.showLabel) || opt_data.showLabel === 1 || opt_data.showLabel === 0, 'showLabel', opt_data.showLabel, 'boolean');
      var showLabel = /** @type {boolean} */!!opt_data.showLabel;
      soy.asserts.assertType(opt_data.tip == null || opt_data.tip instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.tip), 'tip', opt_data.tip, 'null|string|undefined');
      var tip = /** @type {null|string|undefined} */opt_data.tip;
      soy.asserts.assertType(goog.isString(opt_data.value) || opt_data.value instanceof goog.soy.data.SanitizedContent, 'value', opt_data.value, 'string|goog.soy.data.SanitizedContent');
      var value = /** @type {string|goog.soy.data.SanitizedContent} */opt_data.value;
      soy.asserts.assertType(goog.isBoolean(opt_data.visible) || opt_data.visible === 1 || opt_data.visible === 0, 'visible', opt_data.visible, 'boolean');
      var visible = /** @type {boolean} */!!opt_data.visible;
      var displayValue__soy5 = value ? value : predefinedValue;
      var disabled__soy6 = function disabled__soy6() {
        if (readOnly) {
          iattr('disabled', '');
        }
      };
      ie_open('div', null, null, 'class', 'form-group' + (visible ? '' : ' hide'), 'data-fieldname', name);
      if (showLabel) {
        ie_open('label', null, null, 'class', 'control-label');
        var dyn0 = label;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        if (required) {
          ie_void('span', null, null, 'class', 'icon-asterisk text-warning');
        }
        ie_close('label');
        if (tip) {
          ie_open('p', null, null, 'class', 'liferay-ddm-form-field-tip');
          var dyn1 = tip;
          if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
          ie_close('p');
        }
      }
      ie_open('div', null, null, 'class', 'clearfix radio radio-options');
      var optionList64 = options;
      var optionListLen64 = optionList64.length;
      for (var optionIndex64 = 0; optionIndex64 < optionListLen64; optionIndex64++) {
        var optionData64 = optionList64[optionIndex64];
        var checked__soy29 = function checked__soy29() {
          if (optionData64.value == displayValue__soy5) {
            iattr('checked', '');
          }
        };
        if (!inline) {
          ie_open('div', null, null, 'class', 'radio');
        }
        ie_open('label', null, null, 'class', (inline ? ' radio-inline' : '') + ' radio-option-' + optionData64.value, 'for', name + '_' + optionData64.value);
        ie_open_start('input');
        checked__soy29();
        iattr('class', 'field toggle-card');
        iattr('dir', dir || '');
        disabled__soy6();
        iattr('id', name + '_' + optionData64.value);
        iattr('name', name);
        iattr('type', 'radio');
        iattr('value', optionData64.value);
        ie_open_end();
        ie_close('input');
        ie_open('div', null, null, 'class', 'toggle-card-container');
        ie_open('div', null, null, 'class', 'toggle-card-cell');
        ie_open('div', null, null, 'class', 'toggle-card-label');
        ie_open('span');
        itext(' ');
        var dyn2 = optionData64.label;
        if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
        ie_close('span');
        ie_close('div');
        ie_close('div');
        ie_close('div');
        ie_close('label');
        if (!inline) {
          ie_close('div');
        }
      }
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'DDMRadio.render';
    }

    exports.render.params = ["dir", "inline", "label", "name", "predefinedValue", "readOnly", "required", "showLabel", "tip", "value", "visible"];
    exports.render.types = { "dir": "string", "inline": "bool", "label": "string", "name": "string", "predefinedValue": "string", "readOnly": "bool", "required": "bool", "showLabel": "bool", "tip": "string", "value": "string", "visible": "bool" };
    exports.templates = templates = exports;
    return exports;
  });

  var DDMRadio = function (_Component) {
    _inherits(DDMRadio, _Component);

    function DDMRadio() {
      _classCallCheck(this, DDMRadio);

      return _possibleConstructorReturn(this, (DDMRadio.__proto__ || Object.getPrototypeOf(DDMRadio)).apply(this, arguments));
    }

    return DDMRadio;
  }(_component2.default);

  _Soy2.default.register(DDMRadio, templates);
  exports.DDMRadio = DDMRadio;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=radio.soy.js.map