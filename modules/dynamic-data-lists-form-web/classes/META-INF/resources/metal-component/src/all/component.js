define(['exports', '../events/events', '../Component', '../ComponentDataManager', '../ComponentRegistry', '../ComponentRenderer'], function (exports, _events, _Component, _ComponentDataManager, _ComponentRegistry, _ComponentRenderer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ComponentRenderer = exports.ComponentRegistry = exports.ComponentDataManager = exports.Component = undefined;
  Object.keys(_events).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _events[key];
      }
    });
  });

  var _Component2 = _interopRequireDefault(_Component);

  var _ComponentDataManager2 = _interopRequireDefault(_ComponentDataManager);

  var _ComponentRegistry2 = _interopRequireDefault(_ComponentRegistry);

  var _ComponentRenderer2 = _interopRequireDefault(_ComponentRenderer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _Component2.default;
  exports.Component = _Component2.default;
  exports.ComponentDataManager = _ComponentDataManager2.default;
  exports.ComponentRegistry = _ComponentRegistry2.default;
  exports.ComponentRenderer = _ComponentRenderer2.default;
});
//# sourceMappingURL=component.js.map