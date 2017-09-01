Liferay.Loader.define("dynamic-data-lists-form-web@1.2.0/admin/templates/sidebar.soy", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.DDLSidebar = undefined;

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

    // This file was automatically generated from sidebar.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace DDLSidebar.
     * @public
     */

    goog.module('DDLSidebar.incrementaldom');

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

    var $templateAlias1 = _Soy2.default.getTemplate('DDLFieldSettingsToolbar.incrementaldom', 'render');

    /**
     * @param {{
     *    bodyContent: (?soydata.SanitizedHtml|string|undefined),
     *    closeButtonIcon: (!soydata.SanitizedHtml|string),
     *    description: (null|string|undefined),
     *    title: (null|string|undefined),
     *    toolbarButtonIcon: (!soydata.SanitizedHtml|string),
     *    toolbarTemplateContext: (null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>})
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.bodyContent == null || opt_data.bodyContent instanceof Function || opt_data.bodyContent instanceof soydata.UnsanitizedText || goog.isString(opt_data.bodyContent), 'bodyContent', opt_data.bodyContent, '?soydata.SanitizedHtml|string|undefined');
      var bodyContent = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.bodyContent;
      soy.asserts.assertType(opt_data.closeButtonIcon instanceof Function || opt_data.closeButtonIcon instanceof soydata.UnsanitizedText || goog.isString(opt_data.closeButtonIcon), 'closeButtonIcon', opt_data.closeButtonIcon, 'Function');
      var closeButtonIcon = /** @type {Function} */opt_data.closeButtonIcon;
      soy.asserts.assertType(opt_data.description == null || opt_data.description instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.description), 'description', opt_data.description, 'null|string|undefined');
      var description = /** @type {null|string|undefined} */opt_data.description;
      soy.asserts.assertType(opt_data.title == null || opt_data.title instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.title), 'title', opt_data.title, 'null|string|undefined');
      var title = /** @type {null|string|undefined} */opt_data.title;
      soy.asserts.assertType(opt_data.toolbarButtonIcon instanceof Function || opt_data.toolbarButtonIcon instanceof soydata.UnsanitizedText || goog.isString(opt_data.toolbarButtonIcon), 'toolbarButtonIcon', opt_data.toolbarButtonIcon, 'Function');
      var toolbarButtonIcon = /** @type {Function} */opt_data.toolbarButtonIcon;
      soy.asserts.assertType(opt_data.toolbarTemplateContext == null || goog.isObject(opt_data.toolbarTemplateContext), 'toolbarTemplateContext', opt_data.toolbarTemplateContext, 'null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>}');
      var toolbarTemplateContext = /** @type {null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>}} */opt_data.toolbarTemplateContext;
      ie_open('div');
      $header(opt_data, null, opt_ijData);
      $body(opt_data, null, opt_ijData);
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'DDLSidebar.render';
    }

    /**
     * @param {{
     *    bodyContent: (?soydata.SanitizedHtml|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $body(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.bodyContent == null || opt_data.bodyContent instanceof Function || opt_data.bodyContent instanceof soydata.UnsanitizedText || goog.isString(opt_data.bodyContent), 'bodyContent', opt_data.bodyContent, '?soydata.SanitizedHtml|string|undefined');
      var bodyContent = /** @type {?soydata.SanitizedHtml|string|undefined} */opt_data.bodyContent;
      ie_open('div', null, null, 'class', 'sidebar-body');
      var dyn44 = bodyContent;
      if (typeof dyn44 == 'function') dyn44();else if (dyn44 != null) itext(dyn44);
      ie_close('div');
    }
    exports.body = $body;
    if (goog.DEBUG) {
      $body.soyTemplateName = 'DDLSidebar.body';
    }

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
    function $field_options_toolbar(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.toolbarButtonIcon instanceof Function || opt_data.toolbarButtonIcon instanceof soydata.UnsanitizedText || goog.isString(opt_data.toolbarButtonIcon), 'toolbarButtonIcon', opt_data.toolbarButtonIcon, 'Function');
      var toolbarButtonIcon = /** @type {Function} */opt_data.toolbarButtonIcon;
      soy.asserts.assertType(opt_data.toolbarTemplateContext == null || goog.isObject(opt_data.toolbarTemplateContext), 'toolbarTemplateContext', opt_data.toolbarTemplateContext, 'null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>}');
      var toolbarTemplateContext = /** @type {null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>}} */opt_data.toolbarTemplateContext;
      $templateAlias1(opt_data, null, opt_ijData);
    }
    exports.field_options_toolbar = $field_options_toolbar;
    if (goog.DEBUG) {
      $field_options_toolbar.soyTemplateName = 'DDLSidebar.field_options_toolbar';
    }

    /**
     * @param {{
     *    closeButtonIcon: (!soydata.SanitizedHtml|string),
     *    description: (null|string|undefined),
     *    title: (null|string|undefined),
     *    toolbarButtonIcon: (!soydata.SanitizedHtml|string),
     *    toolbarTemplateContext: (null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>})
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $header(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.closeButtonIcon instanceof Function || opt_data.closeButtonIcon instanceof soydata.UnsanitizedText || goog.isString(opt_data.closeButtonIcon), 'closeButtonIcon', opt_data.closeButtonIcon, 'Function');
      var closeButtonIcon = /** @type {Function} */opt_data.closeButtonIcon;
      soy.asserts.assertType(opt_data.description == null || opt_data.description instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.description), 'description', opt_data.description, 'null|string|undefined');
      var description = /** @type {null|string|undefined} */opt_data.description;
      soy.asserts.assertType(opt_data.title == null || opt_data.title instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.title), 'title', opt_data.title, 'null|string|undefined');
      var title = /** @type {null|string|undefined} */opt_data.title;
      soy.asserts.assertType(opt_data.toolbarButtonIcon instanceof Function || opt_data.toolbarButtonIcon instanceof soydata.UnsanitizedText || goog.isString(opt_data.toolbarButtonIcon), 'toolbarButtonIcon', opt_data.toolbarButtonIcon, 'Function');
      var toolbarButtonIcon = /** @type {Function} */opt_data.toolbarButtonIcon;
      soy.asserts.assertType(opt_data.toolbarTemplateContext == null || goog.isObject(opt_data.toolbarTemplateContext), 'toolbarTemplateContext', opt_data.toolbarTemplateContext, 'null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>}');
      var toolbarTemplateContext = /** @type {null|undefined|{options: !Array<{buttonClass: string, handler: string, label: string}>}} */opt_data.toolbarTemplateContext;
      ie_open('div', null, null, 'class', 'sidebar-header');
      ie_open('ul', null, null, 'class', 'sidebar-header-actions');
      if (toolbarTemplateContext) {
        ie_open('li');
        $field_options_toolbar(opt_data, null, opt_ijData);
        ie_close('li');
      }
      ie_open('li');
      ie_open('a', null, null, 'class', 'form-builder-sidebar-close', 'href', 'javascript:;');
      closeButtonIcon();
      ie_close('a');
      ie_close('li');
      ie_close('ul');
      ie_open('h4', null, null, 'class', 'form-builder-sidebar-title truncate-text', 'title', title);
      var dyn45 = title || '';
      if (typeof dyn45 == 'function') dyn45();else if (dyn45 != null) itext(dyn45);
      ie_close('h4');
      ie_open('h5', null, null, 'class', 'form-builder-sidebar-description', 'title', description);
      var dyn46 = description || '';
      if (typeof dyn46 == 'function') dyn46();else if (dyn46 != null) itext(dyn46);
      ie_close('h5');
      ie_close('div');
    }
    exports.header = $header;
    if (goog.DEBUG) {
      $header.soyTemplateName = 'DDLSidebar.header';
    }

    exports.render.params = ["bodyContent", "closeButtonIcon", "description", "title", "toolbarButtonIcon"];
    exports.render.types = { "bodyContent": "html", "closeButtonIcon": "html", "description": "string", "title": "string", "toolbarButtonIcon": "html" };
    exports.body.params = ["bodyContent"];
    exports.body.types = { "bodyContent": "html" };
    exports.field_options_toolbar.params = ["toolbarButtonIcon"];
    exports.field_options_toolbar.types = { "toolbarButtonIcon": "html" };
    exports.header.params = ["closeButtonIcon", "description", "title", "toolbarButtonIcon"];
    exports.header.types = { "closeButtonIcon": "html", "description": "string", "title": "string", "toolbarButtonIcon": "html" };
    exports.templates = templates = exports;
    return exports;
  });

  var DDLSidebar = function (_Component) {
    _inherits(DDLSidebar, _Component);

    function DDLSidebar() {
      _classCallCheck(this, DDLSidebar);

      return _possibleConstructorReturn(this, (DDLSidebar.__proto__ || Object.getPrototypeOf(DDLSidebar)).apply(this, arguments));
    }

    return DDLSidebar;
  }(_component2.default);

  _Soy2.default.register(DDLSidebar, templates);
  exports.DDLSidebar = DDLSidebar;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=sidebar.soy.js.map