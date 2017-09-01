define(['exports', './changes', './data', './children/children', './render/patch', './render/render', 'metal-component/src/all/component', './incremental-dom'], function (exports, _changes, _data, _children, _patch2, _render, _component) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

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

	var IncrementalDomRenderer = function (_ComponentRenderer$co) {
		_inherits(IncrementalDomRenderer, _ComponentRenderer$co);

		function IncrementalDomRenderer() {
			_classCallCheck(this, IncrementalDomRenderer);

			return _possibleConstructorReturn(this, (IncrementalDomRenderer.__proto__ || Object.getPrototypeOf(IncrementalDomRenderer)).apply(this, arguments));
		}

		_createClass(IncrementalDomRenderer, [{
			key: 'buildShouldUpdateArgs',
			value: function buildShouldUpdateArgs(changes) {
				return [changes.props];
			}
		}, {
			key: 'dispose',
			value: function dispose(component) {
				var data = (0, _data.getData)(component);
				var ref = data.config.ref;
				var owner = data.owner;
				if (owner && owner.components && owner.components[ref] === component) {
					delete owner.components[ref];
				}

				if (data.childComponents) {
					for (var i = 0; i < data.childComponents.length; i++) {
						var child = data.childComponents[i];
						if (!child.isDisposed()) {
							child.element = null;
							child.dispose();
						}
					}
				}

				(0, _data.clearData)(component);
			}
		}, {
			key: 'generateKey',
			value: function generateKey(component, key) {
				return key;
			}
		}, {
			key: 'getConfig',
			value: function getConfig(component) {
				return (0, _data.getData)(component).config;
			}
		}, {
			key: 'getData',
			value: function getData(component) {
				return (0, _data.getData)(component);
			}
		}, {
			key: 'getPatchingComponent',
			value: function getPatchingComponent() {
				return (0, _patch2.getPatchingComponent)();
			}
		}, {
			key: 'handleNodeRendered',
			value: function handleNodeRendered() {}
		}, {
			key: 'isIncDomNode',
			value: function isIncDomNode(node) {
				return !!(0, _children.getOwner)(node);
			}
		}, {
			key: 'patch',
			value: function patch(component) {
				(0, _patch2.patch)(component);
			}
		}, {
			key: 'render',
			value: function render(component, opt_dataOrElement, opt_parent) {
				if (component instanceof _component.Component) {
					this.patch(component);
				} else {
					return (0, _render.renderFunction)(this, component, opt_dataOrElement, opt_parent);
				}
			}
		}, {
			key: 'renderChild',
			value: function renderChild(child) {
				(0, _render.renderChild)(child);
			}
		}, {
			key: 'renderIncDom',
			value: function renderIncDom(component) {
				if (component.render) {
					component.render();
				} else {
					IncrementalDOM.elementVoid('div');
				}
			}
		}, {
			key: 'renderInsidePatch',
			value: function renderInsidePatch(component) {
				var shouldRender = !component.wasRendered || this.shouldUpdate(component, (0, _changes.getChanges)(component)) || IncrementalDOM.currentPointer() !== component.element;
				if (shouldRender) {
					(0, _render.render)(component);
				} else if (component.element) {
					this.skipRender();
				}
			}
		}, {
			key: 'setUp',
			value: function setUp(component) {
				component.context = {};
				component.components = {};
				component.refs = {};

				var data = (0, _data.getData)(component);
				data.config = component.getInitialConfig();
				(0, _changes.trackChanges)(component);
			}
		}, {
			key: 'shouldUpdate',
			value: function shouldUpdate(component, changes) {
				if (!changes) {
					return false;
				}
				if (component.shouldUpdate) {
					return component.shouldUpdate.apply(component, _toConsumableArray(this.buildShouldUpdateArgs(changes)));
				}
				return true;
			}
		}, {
			key: 'skipNextChildrenDisposal',
			value: function skipNextChildrenDisposal(component) {
				(0, _data.getData)(component).childComponents = null;
			}
		}, {
			key: 'skipRender',
			value: function skipRender() {
				IncrementalDOM.skipNode();
			}
		}, {
			key: 'update',
			value: function update(component) {
				if (this.shouldUpdate(component, (0, _changes.getChanges)(component))) {
					this.patch(component);
				}
			}
		}]);

		return IncrementalDomRenderer;
	}(_component.ComponentRenderer.constructor);

	var renderer = new IncrementalDomRenderer();

	// Name of this renderer. Renderers should provide this as a way to identify
	// them via a simple string (when calling enableCompatibilityMode to add
	// support to old features for specific renderers for example).
	renderer.RENDERER_NAME = 'incremental-dom';

	exports.default = renderer;
});
//# sourceMappingURL=IncrementalDomRenderer.js.map