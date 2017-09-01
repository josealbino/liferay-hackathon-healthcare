Liferay.Loader.define("dynamic-data-lists-form-web@1.2.0/admin/templates/field-options-toolbar.soy", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.DDLFieldSettingsToolbar = undefined;

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

    // This file was automatically generated from field-options-toolbar.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace DDLFieldSettingsToolbar.
     * @public
     */

    goog.module('DDLFieldSettingsToolbar.incrementaldom');

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
     *    toolbarButtonIcon: (!soydata.SanitizedHtml|string),
     *    toolbarTemplateContext: (null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>})
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.toolbarButtonIcon instanceof Function || opt_data.toolbarButtonIcon instanceof soydata.UnsanitizedText || goog.isString(opt_data.toolbarButtonIcon), 'toolbarButtonIcon', opt_data.toolbarButtonIcon, 'Function');
      var toolbarButtonIcon = /** @type {Function} */opt_data.toolbarButtonIcon;
      soy.asserts.assertType(opt_data.toolbarTemplateContext == null || goog.isObject(opt_data.toolbarTemplateContext), 'toolbarTemplateContext', opt_data.toolbarTemplateContext, 'null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>}');
      var toolbarTemplateContext = /** @type {null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>}} */opt_data.toolbarTemplateContext;
      ie_open('div', null, null, 'class', 'dropdown open');
      ie_open('a', null, null, 'class', 'dropdown-toggle icon-monospaced', 'data-toggle', 'dropdown', 'href', 'javascript:;');
      toolbarButtonIcon();
      ie_close('a');
      $field_settings_toolbar_list({ options: toolbarTemplateContext.options }, null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'DDLFieldSettingsToolbar.render';
    }

    /**
     * @param {{
     *    options: !Array<{buttonClass: string, handler: string, label: string}>
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $field_settings_toolbar_list(opt_data, opt_ignored, opt_ijData) {
      var options = goog.asserts.assertArray(opt_data.options, "expected parameter 'options' of type list<[buttonClass: string, handler: string, label: string]>.");
      ie_open('ul', null, null, 'class', 'dropdown-menu dropdown-menu-right');
      var optionList107 = options;
      var optionListLen107 = optionList107.length;
      for (var optionIndex107 = 0; optionIndex107 < optionListLen107; optionIndex107++) {
        var optionData107 = optionList107[optionIndex107];
        $field_settings_toolbar_item({ option: optionData107 }, null, opt_ijData);
      }
      ie_close('ul');
    }
    exports.field_settings_toolbar_list = $field_settings_toolbar_list;
    if (goog.DEBUG) {
      $field_settings_toolbar_list.soyTemplateName = 'DDLFieldSettingsToolbar.field_settings_toolbar_list';
    }

    /**
     * @param {{
     *    option: {buttonClass: string, handler: string, label: string}
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $field_settings_toolbar_item(opt_data, opt_ignored, opt_ijData) {
      var option = goog.asserts.assertObject(opt_data.option, "expected parameter 'option' of type [buttonClass: string, handler: string, label: string].");
      ie_open('li');
      ie_open('a', null, null, 'class', option.buttonClass || '', 'data-handler', option.handler, 'href', 'javascript:;', 'title', option.label);
      var dyn18 = option.label;
      if (typeof dyn18 == 'function') dyn18();else if (dyn18 != null) itext(dyn18);
      ie_close('a');
      ie_close('li');
    }
    exports.field_settings_toolbar_item = $field_settings_toolbar_item;
    if (goog.DEBUG) {
      $field_settings_toolbar_item.soyTemplateName = 'DDLFieldSettingsToolbar.field_settings_toolbar_item';
    }

    exports.render.params = ["toolbarButtonIcon"];
    exports.render.types = { "toolbarButtonIcon": "html" };
    exports.field_settings_toolbar_list.params = [];
    exports.field_settings_toolbar_list.types = {};
    exports.field_settings_toolbar_item.params = [];
    exports.field_settings_toolbar_item.types = {};
    exports.templates = templates = exports;
    return exports;
  });

  var DDLFieldSettingsToolbar = function (_Component) {
    _inherits(DDLFieldSettingsToolbar, _Component);

    function DDLFieldSettingsToolbar() {
      _classCallCheck(this, DDLFieldSettingsToolbar);

      return _possibleConstructorReturn(this, (DDLFieldSettingsToolbar.__proto__ || Object.getPrototypeOf(DDLFieldSettingsToolbar)).apply(this, arguments));
    }

    return DDLFieldSettingsToolbar;
  }(_component2.default);

  _Soy2.default.register(DDLFieldSettingsToolbar, templates);
  exports.DDLFieldSettingsToolbar = DDLFieldSettingsToolbar;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=field-options-toolbar.soy.js.map