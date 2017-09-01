Liferay.Loader.define("dynamic-data-lists-form-web@1.2.0/admin/templates/rule-builder.soy", ['exports', 'metal-component/src/all/component', 'metal-soy/src/Soy'], function (exports, _component, _Soy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.templates = exports.DDLRuleBuilder = undefined;

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

    // This file was automatically generated from rule-builder.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace DDLRuleBuilder.
     * @hassoydeltemplate {DDLRuleBuilder.action.idom}
     * @hassoydelcall {DDLRuleBuilder.action.idom}
     * @public
     */

    goog.module('DDLRuleBuilder.incrementaldom');

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
     *    plusIcon: (!soydata.SanitizedHtml|string),
     *    strings: {ruleBuilder: string}
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.plusIcon instanceof Function || opt_data.plusIcon instanceof soydata.UnsanitizedText || goog.isString(opt_data.plusIcon), 'plusIcon', opt_data.plusIcon, 'Function');
      var plusIcon = /** @type {Function} */opt_data.plusIcon;
      var strings = goog.asserts.assertObject(opt_data.strings, "expected parameter 'strings' of type [ruleBuilder: string].");
      ie_open('div', null, null, 'class', 'form-builder-rule-builder-container');
      ie_open('h1', null, null, 'class', 'form-builder-section-title text-default');
      var dyn19 = strings.ruleBuilder;
      if (typeof dyn19 == 'function') dyn19();else if (dyn19 != null) itext(dyn19);
      ie_close('h1');
      ie_void('div', null, null, 'class', 'liferay-ddl-form-rule-rules-list-container');
      ie_open('div', null, null, 'class', 'form-builder-rule-builder-add-rule-container');
      ie_open('div', null, null, 'class', 'btn-action-secondary btn-bottom-right dropdown form-builder-rule-builder-add-rule-button');
      ie_open('button', null, null, 'class', 'btn btn-primary form-builder-rule-builder-add-rule-button-icon', 'type', 'button');
      plusIcon();
      ie_close('button');
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'DDLRuleBuilder.render';
    }

    /**
     * @param {{
     *    kebab: (!soydata.SanitizedHtml|string),
     *    rules: !Array<{actions: !Array<(?)>, conditions: !Array<{operandType: string, operandValue: string, operands: !Array<{label: string, type: string, value: string}>, operator: string, strings: *}>, logicOperator: string}>,
     *    strings: (?)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $rule_list(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(opt_data.kebab instanceof Function || opt_data.kebab instanceof soydata.UnsanitizedText || goog.isString(opt_data.kebab), 'kebab', opt_data.kebab, 'Function');
      var kebab = /** @type {Function} */opt_data.kebab;
      var rules = goog.asserts.assertArray(opt_data.rules, "expected parameter 'rules' of type list<[actions: list<?>, conditions: list<[operandType: string, operandValue: string, operands: list<[label: string, type: string, value: string]>, operator: string, strings: any]>, logicOperator: string]>.");
      ie_open('div');
      if (rules.length > 0) {
        ie_open('ul', null, null, 'class', 'ddl-form-body-content form-builder-rule-builder-rules-list tabular-list-group');
        var ruleList176 = rules;
        var ruleListLen176 = ruleList176.length;
        for (var ruleIndex176 = 0; ruleIndex176 < ruleListLen176; ruleIndex176++) {
          var ruleData176 = ruleList176[ruleIndex176];
          ie_open('li', null, null, 'class', 'list-group-item');
          ie_open('div', null, null, 'class', 'clamp-horizontal list-group-item-content');
          ie_open('p', null, null, 'class', 'form-builder-rule-builder-rule-description text-default');
          ie_open('b');
          var dyn20 = opt_data.strings['if'];
          if (typeof dyn20 == 'function') dyn20();else if (dyn20 != null) itext(dyn20);
          itext(' ');
          ie_close('b');
          var conditionList153 = ruleData176.conditions;
          var conditionListLen153 = conditionList153.length;
          for (var conditionIndex153 = 0; conditionIndex153 < conditionListLen153; conditionIndex153++) {
            var conditionData153 = conditionList153[conditionIndex153];
            $condition({ operandType: conditionData153.operands[0].type, operandValue: conditionData153.operands[0].label, strings: opt_data.strings }, null, opt_ijData);
            ie_open('b', null, null, 'class', 'text-lowercase');
            ie_open('em');
            itext(' ');
            var dyn21 = opt_data.strings[conditionData153.operator];
            if (typeof dyn21 == 'function') dyn21();else if (dyn21 != null) itext(dyn21);
            itext(' ');
            ie_close('em');
            ie_close('b');
            if (conditionData153.operands[1]) {
              $condition({ operandType: conditionData153.operands[1].type, operandValue: conditionData153.operands[1].label != null ? conditionData153.operands[1].label : conditionData153.operands[1].value, strings: opt_data.strings }, null, opt_ijData);
            }
            if (!(conditionIndex153 == conditionListLen153 - 1)) {
              ie_open('br');
              ie_close('br');
              ie_open('b');
              itext(' ');
              var dyn22 = opt_data.strings[ruleData176.logicOperator];
              if (typeof dyn22 == 'function') dyn22();else if (dyn22 != null) itext(dyn22);
              itext(' ');
              ie_close('b');
            }
          }
          ie_open('br');
          ie_close('br');
          var actionList163 = ruleData176.actions;
          var actionListLen163 = actionList163.length;
          for (var actionIndex163 = 0; actionIndex163 < actionListLen163; actionIndex163++) {
            var actionData163 = actionList163[actionIndex163];
            soy.$$getDelegateFn(soy.$$getDelTemplateId('DDLRuleBuilder.action.idom'), actionData163.type, false)({ action: actionData163 }, null, opt_ijData);
            if (!(actionIndex163 == actionListLen163 - 1)) {
              itext(', ');
              ie_open('br');
              ie_close('br');
              ie_open('b');
              itext(' ');
              var dyn23 = opt_data.strings.and;
              if (typeof dyn23 == 'function') dyn23();else if (dyn23 != null) itext(dyn23);
              itext(' ');
              ie_close('b');
            }
          }
          ie_close('p');
          ie_close('div');
          ie_open('div', null, null, 'class', 'list-group-item-field');
          ie_open('div', null, null, 'class', 'card-col-field');
          ie_open('div', null, null, 'class', 'dropdown');
          ie_open('ul', null, null, 'class', 'dropdown-menu dropdown-menu-right');
          ie_open('li', null, null, 'class', 'rule-card-edit', 'data-card-id', ruleIndex176);
          ie_open('a', null, null, 'href', 'javascript:;');
          var dyn24 = opt_data.strings.edit;
          if (typeof dyn24 == 'function') dyn24();else if (dyn24 != null) itext(dyn24);
          ie_close('a');
          ie_close('li');
          ie_open('li', null, null, 'class', 'rule-card-delete', 'data-card-id', ruleIndex176);
          ie_open('a', null, null, 'href', 'javascript:;');
          var dyn25 = opt_data.strings['delete'];
          if (typeof dyn25 == 'function') dyn25();else if (dyn25 != null) itext(dyn25);
          ie_close('a');
          ie_close('li');
          ie_close('ul');
          ie_open('a', null, null, 'class', 'dropdown-toggle icon-monospaced', 'data-toggle', 'dropdown', 'href', '#1');
          kebab();
          ie_close('a');
          ie_close('div');
          ie_close('div');
          ie_close('div');
          ie_close('li');
        }
        ie_close('ul');
      } else {
        $empty_list({ message: opt_data.strings.emptyListText }, null, opt_ijData);
      }
      ie_close('div');
    }
    exports.rule_list = $rule_list;
    if (goog.DEBUG) {
      $rule_list.soyTemplateName = 'DDLRuleBuilder.rule_list';
    }

    /**
     * @param {{
     *    message: (null|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $empty_list(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.message == null || opt_data.message instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.message), 'message', opt_data.message, 'null|string|undefined');
      var message = /** @type {null|string|undefined} */opt_data.message;
      ie_open('div', null, null, 'class', 'main-content-body');
      ie_open('div', null, null, 'class', 'card main-content-card taglib-empty-result-message');
      ie_open('div', null, null, 'class', 'card-row card-row-padded');
      ie_void('div', null, null, 'class', 'taglib-empty-result-message-header-has-plus-btn');
      if (message) {
        ie_open('div', null, null, 'class', 'text-center text-muted');
        ie_open('p', null, null, 'class', 'text-default');
        var dyn26 = message;
        if (typeof dyn26 == 'function') dyn26();else if (dyn26 != null) itext(dyn26);
        ie_close('p');
        ie_close('div');
      }
      ie_close('div');
      ie_close('div');
      ie_close('div');
    }
    exports.empty_list = $empty_list;
    if (goog.DEBUG) {
      $empty_list.soyTemplateName = 'DDLRuleBuilder.empty_list';
    }

    /**
     * @param {{
     *    strings: {enableDisable: string, require: string, showHide: string}
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $rule_types(opt_data, opt_ignored, opt_ijData) {
      var strings = goog.asserts.assertObject(opt_data.strings, "expected parameter 'strings' of type [enableDisable: string, require: string, showHide: string].");
      ie_open('ul', null, null, 'class', 'dropdown-menu');
      ie_open('li');
      ie_open('a', null, null, 'data-rule-type', 'visibility', 'href', 'javascript:;');
      var dyn27 = strings.showHide;
      if (typeof dyn27 == 'function') dyn27();else if (dyn27 != null) itext(dyn27);
      ie_close('a');
      ie_open('a', null, null, 'data-rule-type', 'readonly', 'href', 'javascript:;');
      var dyn28 = strings.enableDisable;
      if (typeof dyn28 == 'function') dyn28();else if (dyn28 != null) itext(dyn28);
      ie_close('a');
      ie_open('a', null, null, 'data-rule-type', 'require', 'href', 'javascript:;');
      var dyn29 = strings.require;
      if (typeof dyn29 == 'function') dyn29();else if (dyn29 != null) itext(dyn29);
      ie_close('a');
      ie_close('li');
      ie_close('ul');
    }
    exports.rule_types = $rule_types;
    if (goog.DEBUG) {
      $rule_types.soyTemplateName = 'DDLRuleBuilder.rule_types';
    }

    /**
     * @param {{
     *    content: (null|string|undefined)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $badge(opt_data, opt_ignored, opt_ijData) {
      opt_data = opt_data || {};
      soy.asserts.assertType(opt_data.content == null || opt_data.content instanceof goog.soy.data.SanitizedContent || goog.isString(opt_data.content), 'content', opt_data.content, 'null|string|undefined');
      var content = /** @type {null|string|undefined} */opt_data.content;
      ie_open('span', null, null, 'class', 'badge badge-default badge-sm');
      var dyn30 = content;
      if (typeof dyn30 == 'function') dyn30();else if (dyn30 != null) itext(dyn30);
      ie_close('span');
    }
    exports.badge = $badge;
    if (goog.DEBUG) {
      $badge.soyTemplateName = 'DDLRuleBuilder.badge';
    }

    /**
     * @param {{
     *    operandType: string,
     *    operandValue: string,
     *    strings: (?)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $condition(opt_data, opt_ignored, opt_ijData) {
      soy.asserts.assertType(goog.isString(opt_data.operandType) || opt_data.operandType instanceof goog.soy.data.SanitizedContent, 'operandType', opt_data.operandType, 'string|goog.soy.data.SanitizedContent');
      var operandType = /** @type {string|goog.soy.data.SanitizedContent} */opt_data.operandType;
      soy.asserts.assertType(goog.isString(opt_data.operandValue) || opt_data.operandValue instanceof goog.soy.data.SanitizedContent, 'operandValue', opt_data.operandValue, 'string|goog.soy.data.SanitizedContent');
      var operandValue = /** @type {string|goog.soy.data.SanitizedContent} */opt_data.operandValue;
      if (operandType == 'double' || operandType == 'integer' || operandType == 'string') {
        ie_open('span');
        var dyn31 = opt_data.strings.value;
        if (typeof dyn31 == 'function') dyn31();else if (dyn31 != null) itext(dyn31);
        itext(' ');
        ie_close('span');
      } else {
        if (operandType != 'user' && operandType != 'list') {
          ie_open('span');
          var dyn32 = opt_data.strings[operandType];
          if (typeof dyn32 == 'function') dyn32();else if (dyn32 != null) itext(dyn32);
          itext(' ');
          ie_close('span');
        }
      }
      $badge({ content: operandValue }, null, opt_ijData);
    }
    exports.condition = $condition;
    if (goog.DEBUG) {
      $condition.soyTemplateName = 'DDLRuleBuilder.condition';
    }

    /**
     * @param {{
     *    outputs: !Array<(?)>
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $autofill_outputs(opt_data, opt_ignored, opt_ijData) {
      var outputs = goog.asserts.assertArray(opt_data.outputs, "expected parameter 'outputs' of type list<?>.");
      var outputList223 = outputs;
      var outputListLen223 = outputList223.length;
      for (var outputIndex223 = 0; outputIndex223 < outputListLen223; outputIndex223++) {
        var outputData223 = outputList223[outputIndex223];
        $badge({ content: outputData223 }, null, opt_ijData);
        if (!(outputIndex223 == outputListLen223 - 1)) {
          itext(',');
        }
      }
    }
    exports.autofill_outputs = $autofill_outputs;
    if (goog.DEBUG) {
      $autofill_outputs.soyTemplateName = 'DDLRuleBuilder.autofill_outputs';
    }

    /**
     * @param {{
     *    action: (?)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s225_b992d708(opt_data, opt_ignored, opt_ijData) {
      ie_open('b');
      /** @desc show-x */
      var MSG_EXTERNAL_6763821615557154 = Liferay.Language.get('show-x');
MSG_EXTERNAL_6763821615557154 = MSG_EXTERNAL_6763821615557154.replace(/{(\d+)}/g, '\x01$1\x01')
      var lastIndex_227 = 0,
          partRe_227 = /\x01\d+\x01/g,
          match_227;
      do {
        match_227 = partRe_227.exec(MSG_EXTERNAL_6763821615557154) || undefined;
        itext(goog.string.unescapeEntities(MSG_EXTERNAL_6763821615557154.substring(lastIndex_227, match_227 && match_227.index)));
        lastIndex_227 = partRe_227.lastIndex;
        switch (match_227 && match_227[0]) {
          case '\x010\x01':
            $badge({ content: opt_data.action.param0 }, null, opt_ijData);
            break;
        }
      } while (match_227);
      ie_close('b');
    }
    exports.__deltemplate_s225_b992d708 = __deltemplate_s225_b992d708;
    if (goog.DEBUG) {
      __deltemplate_s225_b992d708.soyTemplateName = 'DDLRuleBuilder.__deltemplate_s225_b992d708';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('DDLRuleBuilder.action.idom'), 'show', 0, __deltemplate_s225_b992d708);

    /**
     * @param {{
     *    action: (?)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s234_30f3a8b7(opt_data, opt_ignored, opt_ijData) {
      ie_open('b');
      /** @desc enable-x */
      var MSG_EXTERNAL_1991085455776803984 = Liferay.Language.get('enable-x');
MSG_EXTERNAL_1991085455776803984 = MSG_EXTERNAL_1991085455776803984.replace(/{(\d+)}/g, '\x01$1\x01')
      var lastIndex_236 = 0,
          partRe_236 = /\x01\d+\x01/g,
          match_236;
      do {
        match_236 = partRe_236.exec(MSG_EXTERNAL_1991085455776803984) || undefined;
        itext(goog.string.unescapeEntities(MSG_EXTERNAL_1991085455776803984.substring(lastIndex_236, match_236 && match_236.index)));
        lastIndex_236 = partRe_236.lastIndex;
        switch (match_236 && match_236[0]) {
          case '\x010\x01':
            $badge({ content: opt_data.action.param0 }, null, opt_ijData);
            break;
        }
      } while (match_236);
      ie_close('b');
    }
    exports.__deltemplate_s234_30f3a8b7 = __deltemplate_s234_30f3a8b7;
    if (goog.DEBUG) {
      __deltemplate_s234_30f3a8b7.soyTemplateName = 'DDLRuleBuilder.__deltemplate_s234_30f3a8b7';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('DDLRuleBuilder.action.idom'), 'enable', 0, __deltemplate_s234_30f3a8b7);

    /**
     * @param {{
     *    action: (?)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s243_dbc93319(opt_data, opt_ignored, opt_ijData) {
      ie_open('b');
      /** @desc calculate-field-x-as-x */
      var MSG_EXTERNAL_5511274467569914026 = Liferay.Language.get('calculate-field-x-as-x');
MSG_EXTERNAL_5511274467569914026 = MSG_EXTERNAL_5511274467569914026.replace(/{(\d+)}/g, '\x01$1\x01')
      var lastIndex_245 = 0,
          partRe_245 = /\x01\d+\x01/g,
          match_245;
      do {
        match_245 = partRe_245.exec(MSG_EXTERNAL_5511274467569914026) || undefined;
        itext(goog.string.unescapeEntities(MSG_EXTERNAL_5511274467569914026.substring(lastIndex_245, match_245 && match_245.index)));
        lastIndex_245 = partRe_245.lastIndex;
        switch (match_245 && match_245[0]) {
          case '\x011\x01':
            $badge({ content: opt_data.action.param1 }, null, opt_ijData);
            break;
          case '\x010\x01':
            $badge({ content: opt_data.action.param0 }, null, opt_ijData);
            break;
        }
      } while (match_245);
      ie_close('b');
    }
    exports.__deltemplate_s243_dbc93319 = __deltemplate_s243_dbc93319;
    if (goog.DEBUG) {
      __deltemplate_s243_dbc93319.soyTemplateName = 'DDLRuleBuilder.__deltemplate_s243_dbc93319';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('DDLRuleBuilder.action.idom'), 'calculate', 0, __deltemplate_s243_dbc93319);

    /**
     * @param {{
     *    action: (?)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s256_549eb7e4(opt_data, opt_ignored, opt_ijData) {
      ie_open('b');
      /** @desc autofill-x-from-data-provider-x */
      var MSG_EXTERNAL_7333391118384881260 = Liferay.Language.get('autofill-x-from-data-provider-x');
MSG_EXTERNAL_7333391118384881260 = MSG_EXTERNAL_7333391118384881260.replace(/{(\d+)}/g, '\x01$1\x01')
      var lastIndex_258 = 0,
          partRe_258 = /\x01\d+\x01/g,
          match_258;
      do {
        match_258 = partRe_258.exec(MSG_EXTERNAL_7333391118384881260) || undefined;
        itext(goog.string.unescapeEntities(MSG_EXTERNAL_7333391118384881260.substring(lastIndex_258, match_258 && match_258.index)));
        lastIndex_258 = partRe_258.lastIndex;
        switch (match_258 && match_258[0]) {
          case '\x011\x01':
            $badge({ content: opt_data.action.param1 }, null, opt_ijData);
            break;
          case '\x010\x01':
            $autofill_outputs({ outputs: opt_data.action.param0 }, null, opt_ijData);
            break;
        }
      } while (match_258);
      ie_close('b');
    }
    exports.__deltemplate_s256_549eb7e4 = __deltemplate_s256_549eb7e4;
    if (goog.DEBUG) {
      __deltemplate_s256_549eb7e4.soyTemplateName = 'DDLRuleBuilder.__deltemplate_s256_549eb7e4';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('DDLRuleBuilder.action.idom'), 'autofill', 0, __deltemplate_s256_549eb7e4);

    /**
     * @param {{
     *    action: (?)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s269_d0600d88(opt_data, opt_ignored, opt_ijData) {
      ie_open('b');
      /** @desc jump-to-page-x */
      var MSG_EXTERNAL_7070892870969211427 = Liferay.Language.get('jump-to-page-x');
MSG_EXTERNAL_7070892870969211427 = MSG_EXTERNAL_7070892870969211427.replace(/{(\d+)}/g, '\x01$1\x01')
      var lastIndex_271 = 0,
          partRe_271 = /\x01\d+\x01/g,
          match_271;
      do {
        match_271 = partRe_271.exec(MSG_EXTERNAL_7070892870969211427) || undefined;
        itext(goog.string.unescapeEntities(MSG_EXTERNAL_7070892870969211427.substring(lastIndex_271, match_271 && match_271.index)));
        lastIndex_271 = partRe_271.lastIndex;
        switch (match_271 && match_271[0]) {
          case '\x010\x01':
            $badge({ content: opt_data.action.param0 }, null, opt_ijData);
            break;
        }
      } while (match_271);
      ie_close('b');
    }
    exports.__deltemplate_s269_d0600d88 = __deltemplate_s269_d0600d88;
    if (goog.DEBUG) {
      __deltemplate_s269_d0600d88.soyTemplateName = 'DDLRuleBuilder.__deltemplate_s269_d0600d88';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('DDLRuleBuilder.action.idom'), 'jumptopage', 0, __deltemplate_s269_d0600d88);

    /**
     * @param {{
     *    action: (?)
     * }} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function __deltemplate_s278_705ffc7d(opt_data, opt_ignored, opt_ijData) {
      ie_open('b');
      /** @desc require-x */
      var MSG_EXTERNAL_3017347163412966732 = Liferay.Language.get('require-x');
MSG_EXTERNAL_3017347163412966732 = MSG_EXTERNAL_3017347163412966732.replace(/{(\d+)}/g, '\x01$1\x01')
      var lastIndex_280 = 0,
          partRe_280 = /\x01\d+\x01/g,
          match_280;
      do {
        match_280 = partRe_280.exec(MSG_EXTERNAL_3017347163412966732) || undefined;
        itext(goog.string.unescapeEntities(MSG_EXTERNAL_3017347163412966732.substring(lastIndex_280, match_280 && match_280.index)));
        lastIndex_280 = partRe_280.lastIndex;
        switch (match_280 && match_280[0]) {
          case '\x010\x01':
            $badge({ content: opt_data.action.param0 }, null, opt_ijData);
            break;
        }
      } while (match_280);
      ie_close('b');
    }
    exports.__deltemplate_s278_705ffc7d = __deltemplate_s278_705ffc7d;
    if (goog.DEBUG) {
      __deltemplate_s278_705ffc7d.soyTemplateName = 'DDLRuleBuilder.__deltemplate_s278_705ffc7d';
    }
    soy.$$registerDelegateFn(soy.$$getDelTemplateId('DDLRuleBuilder.action.idom'), 'require', 0, __deltemplate_s278_705ffc7d);

    exports.render.params = ["plusIcon"];
    exports.render.types = { "plusIcon": "html" };
    exports.rule_list.params = ["kebab", "strings"];
    exports.rule_list.types = { "kebab": "html", "strings": "?" };
    exports.empty_list.params = ["message"];
    exports.empty_list.types = { "message": "string" };
    exports.rule_types.params = [];
    exports.rule_types.types = {};
    exports.badge.params = ["content"];
    exports.badge.types = { "content": "string" };
    exports.condition.params = ["operandType", "operandValue", "strings"];
    exports.condition.types = { "operandType": "string", "operandValue": "string", "strings": "?" };
    exports.autofill_outputs.params = ["outputs"];
    exports.autofill_outputs.types = { "outputs": "list<?>" };
    exports.templates = templates = exports;
    return exports;
  });

  var DDLRuleBuilder = function (_Component) {
    _inherits(DDLRuleBuilder, _Component);

    function DDLRuleBuilder() {
      _classCallCheck(this, DDLRuleBuilder);

      return _possibleConstructorReturn(this, (DDLRuleBuilder.__proto__ || Object.getPrototypeOf(DDLRuleBuilder)).apply(this, arguments));
    }

    return DDLRuleBuilder;
  }(_component2.default);

  _Soy2.default.register(DDLRuleBuilder, templates);
  exports.DDLRuleBuilder = DDLRuleBuilder;
  exports.templates = templates;
  exports.default = templates;
});
//# sourceMappingURL=rule-builder.soy.js.map