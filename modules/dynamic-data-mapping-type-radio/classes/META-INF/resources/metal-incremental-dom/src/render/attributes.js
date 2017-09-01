define(['exports', 'metal/src/metal', 'metal-dom/src/all/dom', 'metal-component/src/all/component', '../incremental-dom-aop'], function (exports, _metal, _dom, _component, _incrementalDomAop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.applyAttribute = applyAttribute;
  exports.convertListenerNamesToFns = convertListenerNamesToFns;


  var HANDLE_SUFFIX = '__handle__';
  var LISTENER_REGEX = /^(?:on([A-Z].+))|(?:data-on(.+))$/;

  /**
   * Applies an attribute to a specified element owned by the given component.
   * @param {!Component} component
   * @param {!Element} element
   * @param {string} name
   * @param {*} value
   */
  function applyAttribute(component, element, name, value) {
    var eventName = getEventFromListenerAttr_(name);
    if (eventName) {
      attachEvent_(component, element, name, eventName, value);
      return;
    }

    value = fixCheckedAttr_(name, value);
    setValueAttrAsProperty_(element, name, value);

    if ((0, _metal.isBoolean)(value)) {
      setBooleanAttr_(element, name, value);
    } else {
      (0, _incrementalDomAop.getOriginalFn)('attributes')(element, name, value);
    }
  }

  /**
   * Listens to the specified event, attached via incremental dom calls.
   * @param {!Component} component
   * @param {!Element} element
   * @param {string} attr
   * @param {string} eventName
   * @param {function()} fn
   * @private
   */
  function attachEvent_(component, element, attr, eventName, fn) {
    if ((0, _metal.isServerSide)()) {
      return;
    }
    var handleKey = eventName + HANDLE_SUFFIX;
    if (element[handleKey]) {
      element[handleKey].removeListener();
      element[handleKey] = null;
    }
    if (fn) {
      element[attr] = fn;
      element[handleKey] = (0, _dom.delegate)(document, eventName, element, fn);
    }
  }

  /**
   * Converts all event listener attributes given as function names to actual
   * function references. It's important to do this before calling the real
   * incremental dom `elementOpen` function, otherwise if a component passes
   * the same function name that an element was already using for another
   * component, that event won't be reattached as incremental dom will think that
   * the value hasn't changed. Passing the function references as the value will
   * guarantee that different functions will cause events to be reattached,
   * regardless of their original names.
   * @param {!Component} component
   * @param {!Object} config
   */
  function convertListenerNamesToFns(component, config) {
    var keys = Object.keys(config);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      config[key] = convertListenerNameToFn_(component, key, config[key]);
    }
  }

  /**
   * Converts the given attribute's value to a function reference, if it's
   * currently a listener name. It also register the listener name for
   * further usage.
   * @param {!Component} component
   * @param {string} name
   * @param {*} value
   * @return {*}
   * @private
   */
  function convertListenerNameToFn_(component, name, value) {
    if ((0, _metal.isString)(value)) {
      var eventName = getEventFromListenerAttr_(name);
      if (eventName) {
        var fn = (0, _component.getComponentFn)(component, value);
        if (fn) {
          return fn;
        }
      }
    }
    return value;
  }

  /**
   * Changes the value of the `checked` attribute to be a boolean.
   * NOTE: This is a temporary fix to account for incremental dom setting
   * "checked" as an attribute only, which can cause bugs since that won't
   * necessarily check/uncheck the element it's set on. See
   * https://github.com/google/incremental-dom/issues/198 for more details.
   * @param {string} name
   * @param {*} value
   * @return {*}
   * @private
   */
  function fixCheckedAttr_(name, value) {
    if (name === 'checked') {
      value = (0, _metal.isDefAndNotNull)(value) && value !== false;
    }
    return value;
  }

  /**
   * Returns the event name if the given attribute is a listener (matching the
   * `LISTENER_REGEX` regex), or null if it isn't.
   * @param {string} attr
   * @return {?string}
   * @private
   */
  function getEventFromListenerAttr_(attr) {
    var matches = LISTENER_REGEX.exec(attr);
    var eventName = matches ? matches[1] ? matches[1] : matches[2] : null;
    return eventName ? eventName.toLowerCase() : null;
  }

  /**
   * Sets boolean attributes manually. This is done because incremental dom sets
   * boolean values as string data attributes by default, which is counter
   * intuitive. This changes the behavior to use the actual boolean value.
   * @param {!Element} element
   * @param {string} name
   * @param {*} value
   * @private
   */
  function setBooleanAttr_(element, name, value) {
    if ((0, _metal.isServerSide)()) {
      return;
    }
    element[name] = value;
    if (value) {
      element.setAttribute(name, '');
    } else {
      element.removeAttribute(name);
    }
  }

  /**
   * Sets the value of the `value` attribute directly in the element.
   * NOTE: This is a temporary fix to account for incremental dom setting "value"
   * as an attribute only, which can cause bugs since that won't necessarily
   * update the input's content it's set on. See
   * https://github.com/google/incremental-dom/issues/239 for more details. We
   * only do this if the new value is different though, as otherwise the browser
   * will automatically move the typing cursor to the end of the field.
   * @param {!Element} element
   * @param {string} name
   * @param {*} value
   * @private
   */
  function setValueAttrAsProperty_(element, name, value) {
    if ((0, _metal.isServerSide)()) {
      return;
    }
    if (name === 'value' && element.value !== value) {
      element[name] = value;
    }
  }
});
//# sourceMappingURL=attributes.js.map