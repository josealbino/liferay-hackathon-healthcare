define(['exports', './data'], function (exports, _data) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.clearChanges = clearChanges;
  exports.getChanges = getChanges;
  exports.trackChanges = trackChanges;


  /**
   * Clears the changes tracked so far.
   * @param {!Object} data
   */
  function clearChanges(data) {
    data.changes = null;
  }

  /**
   * Handles the `stateKeyChanged` event from a component. Stores change data.
   * @param {!Object} data
   * @param {!Object} eventData
   * @private
   */
  function handleStateKeyChanged_(data, eventData) {
    data.changes = data.changes || {};
    var type = eventData.type || 'props';
    data.changes[type] = data.changes[type] || {};
    data.changes[type][eventData.key] = eventData;
  }

  /**
   * Returns an object with changes in the given component since the last time,
   * or null if there weren't any.
   * @param {!Component} component
   * @return {Object}
   */
  function getChanges(component) {
    return (0, _data.getData)(component).changes;
  }

  /**
   * Starts tracking changes for the given component
   * @param {!Component} component
   */
  function trackChanges(component) {
    var data = (0, _data.getData)(component);
    component.on('stateKeyChanged', handleStateKeyChanged_.bind(null, data));
  }
});
//# sourceMappingURL=changes.js.map