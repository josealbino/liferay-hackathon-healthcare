Liferay.Loader.define("dynamic-data-lists-form-web@1.2.0/notification/form-entry-add-body.soy", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = undefined;

  var _component2 = _interopRequireDefault(_component);

  var _Soy2 = _interopRequireDefault(_Soy);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* jshint ignore:start */
  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from form_entry_add_body.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace form.
     * @public
     */

    goog.module('form.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
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
    function $field(opt_data, opt_ignored, opt_ijData) {
      if (opt_data.field != null) {
        ie_open('p', null, null, 'style', 'color: #9aa2a6; font-size: 18px; margin: 32px 0 16px 0;');
        var dyn0 = opt_data.field.label;
        if (typeof dyn0 == 'function') dyn0();else if (dyn0 != null) itext(dyn0);
        ie_close('p');
        ie_open('p', null, null, 'style', 'font-size: 16px; margin: 0;');
        var dyn1 = opt_data.field.value;
        if (typeof dyn1 == 'function') dyn1();else if (dyn1 != null) itext(dyn1);
        ie_close('p');
      }
    }
    exports.field = $field;
    if (goog.DEBUG) {
      $field.soyTemplateName = 'form.field';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $fields(opt_data, opt_ignored, opt_ijData) {
      var fieldList13 = opt_data.fields;
      var fieldListLen13 = fieldList13.length;
      for (var fieldIndex13 = 0; fieldIndex13 < fieldListLen13; fieldIndex13++) {
        var fieldData13 = fieldList13[fieldIndex13];
        $field(soy.$$assignDefaults({ field: fieldData13 }, opt_data), null, opt_ijData);
      }
    }
    exports.fields = $fields;
    if (goog.DEBUG) {
      $fields.soyTemplateName = 'form.fields';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $form_entry(opt_data, opt_ignored, opt_ijData) {
      ie_open('!DOCTYPE', null, null, 'html', '');
      ie_open('html');
      ie_open('head');
      ie_open('meta', null, null, 'charset', 'UTF-8');
      ie_close('meta');
      ie_open('title');
      var dyn2 = opt_data.formName;
      if (typeof dyn2 == 'function') dyn2();else if (dyn2 != null) itext(dyn2);
      ie_close('title');
      ie_close('head');
      ie_open('body', null, null, 'style', 'margin: 0; overflow: visible; padding: 0;');
      ie_open('div', null, null, 'id', 'container', 'style', 'font-family: helvetica, \'open sans\', arial; margin: 0 auto 40px auto; width: 660px;');
      ie_open('table', null, null, 'style', 'background-color: #e4e9ec; padding: 40px;');
      ie_open('tr');
      ie_open('td');
      ie_open('div', null, null, 'id', 'introduction', 'style', 'background-color: #fff; border-radius: 4px; margin: 0 auto 24px auto; padding: 40px;');
      ie_open('h1', null, null, 'align', 'center', 'style', 'margin-bottom: 24px; margin-top: 0;');
      var dyn3 = opt_data.siteName;
      if (typeof dyn3 == 'function') dyn3();else if (dyn3 != null) itext(dyn3);
      ie_close('h1');
      ie_open('h2', null, null, 'align', 'center', 'style', 'margin-bottom: 24px; margin-top: 0;');
      itext('Hi, ');
      var dyn4 = opt_data.authorName;
      if (typeof dyn4 == 'function') dyn4();else if (dyn4 != null) itext(dyn4);
      ie_close('h2');
      ie_open('p', null, null, 'style', 'line-height: 30px; margin-bottom: 24px; margin-top: 0;');
      ie_open('b');
      var dyn5 = opt_data.userName;
      if (typeof dyn5 == 'function') dyn5();else if (dyn5 != null) itext(dyn5);
      ie_close('b');
      itext(' submitted an entry for the ');
      var dyn6 = opt_data.formName;
      if (typeof dyn6 == 'function') dyn6();else if (dyn6 != null) itext(dyn6);
      itext(' form in the ');
      var dyn7 = opt_data.siteName;
      if (typeof dyn7 == 'function') dyn7();else if (dyn7 != null) itext(dyn7);
      itext(' site. View all the form\'s entries by clicking ');
      ie_open('a', null, null, 'href', opt_data.viewFormEntriesURL, 'style', 'color: #7bc4f4; text-decoration: none;', 'target', '_blank');
      itext('here');
      ie_close('a');
      itext('.');
      ie_close('p');
      ie_open('a', null, null, 'href', opt_data.viewFormURL, 'style', 'background: #65b4f1; border-radius: 4px; color: #fff; display: block; padding: 18px; text-align: center; text-decoration: none;', 'target', '_blank');
      itext('Click here to access the form');
      ie_close('a');
      ie_close('div');
      ie_close('td');
      ie_close('tr');
      ie_open('tr');
      ie_open('td');
      ie_open('h3', null, null, 'style', 'color: #9aa2a6; font-weight: 300; margin: 8px 0 8px; text-align: center;');
      itext('Here\'s what ');
      ie_open('b');
      var dyn8 = opt_data.userName;
      if (typeof dyn8 == 'function') dyn8();else if (dyn8 != null) itext(dyn8);
      ie_close('b');
      itext(' entered into the form:');
      ie_close('h3');
      $pages(opt_data, null, opt_ijData);
      ie_open('a', null, null, 'href', opt_data.viewFormURL, 'style', 'background: #65b4f1; border-radius: 4px; color: #fff; display: block; padding: 18px; text-align: center; text-decoration: none;', 'target', '_blank');
      itext('Click here to access the form');
      ie_close('a');
      ie_close('td');
      ie_close('tr');
      ie_close('table');
      ie_close('div');
      ie_close('body');
      ie_close('html');
    }
    exports.form_entry = $form_entry;
    if (goog.DEBUG) {
      $form_entry.soyTemplateName = 'form.form_entry';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $pages(opt_data, opt_ignored, opt_ijData) {
      var pageList47 = opt_data.pages;
      var pageListLen47 = pageList47.length;
      for (var pageIndex47 = 0; pageIndex47 < pageListLen47; pageIndex47++) {
        var pageData47 = pageList47[pageIndex47];
        ie_open('div', null, null, 'style', 'background-color: #fff; border-radius: 4px; margin: 0 auto 24px auto; padding: 40px;');
        ie_open('h4', null, null, 'style', 'color: #9aa2a6; font-size: 21px; font-weight: 500; margin: 0;');
        var dyn9 = pageData47.title;
        if (typeof dyn9 == 'function') dyn9();else if (dyn9 != null) itext(dyn9);
        ie_close('h4');
        $fields(soy.$$assignDefaults({ fields: pageData47.fields }, opt_data), null, opt_ijData);
        ie_close('div');
      }
    }
    exports.pages = $pages;
    if (goog.DEBUG) {
      $pages.soyTemplateName = 'form.pages';
    }

    exports.field.params = ["field"];
    exports.field.types = { "field": "any" };
    exports.fields.params = ["fields"];
    exports.fields.types = { "fields": "any" };
    exports.form_entry.params = ["authorName", "formName", "pages", "siteName", "userName", "viewFormEntriesURL", "viewFormURL"];
    exports.form_entry.types = { "authorName": "any", "formName": "any", "pages": "any", "siteName": "any", "userName": "any", "viewFormEntriesURL": "any", "viewFormURL": "any" };
    exports.pages.params = ["pages"];
    exports.pages.types = { "pages": "any" };
    exports.templates = templates = exports;
    return exports;
  });

  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=form_entry_add_body.soy.js.map