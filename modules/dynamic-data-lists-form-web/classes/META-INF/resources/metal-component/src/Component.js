define(['exports', './events/events', 'metal/src/metal', './sync/sync', 'metal-dom/src/all/dom', './ComponentDataManager', './ComponentRenderer', 'metal-events/src/events'], function (exports, _events, _metal, _sync, _dom, _ComponentDataManager, _ComponentRenderer, _events2) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ComponentDataManager2 = _interopRequireDefault(_ComponentDataManager);

	var _ComponentRenderer2 = _interopRequireDefault(_ComponentRenderer);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

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

	var _get = function get(object, property, receiver) {
		if (object === null) object = Function.prototype;
		var desc = Object.getOwnPropertyDescriptor(object, property);

		if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);

			if (parent === null) {
				return undefined;
			} else {
				return get(parent, property, receiver);
			}
		} else if ("value" in desc) {
			return desc.value;
		} else {
			var getter = desc.get;

			if (getter === undefined) {
				return undefined;
			}

			return getter.call(receiver);
		}
	};

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

	var Component = function (_EventEmitter) {
		_inherits(Component, _EventEmitter);

		/**
   * Constructor function for `Component`.
   * @param {Object=} opt_config An object with the initial values for this
   *     component's state.
   * @param {boolean|string|Element=} opt_parentElement The element where the
   *     component should be rendered. Can be given as a selector or an element.
   *     If `false` is passed, the component won't be rendered automatically
   *     after created.
   * @constructor
   */
		function Component(opt_config, opt_parentElement) {
			_classCallCheck(this, Component);

			var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

			/**
    * Instance of `DomEventEmitterProxy` which proxies events from the component's
    * element to the component itself.
    * @type {!DomEventEmitterProxy}
    * @protected
    */
			_this.elementEventProxy_ = new _dom.DomEventEmitterProxy(null, _this, proxyBlackList_);

			/**
    * The `EventHandler` instance for events attached from the `events` state key.
    * @type {EventHandler}
    * @protected
    */
			_this.eventsStateKeyHandler_ = null;

			/**
    * Whether the element is in document.
    * @type {boolean}
    */
			_this.inDocument = false;

			/**
    * The initial config option passed to this constructor.
    * @type {!Object}
    * @protected
    */
			_this.initialConfig_ = opt_config || {};

			/**
    * Whether the element was rendered.
    * @type {boolean}
    */
			_this.wasRendered = false;

			/**
    * The component's element will be appended to the element this variable is
    * set to, unless the user specifies another parent when calling `render` or
    * `attach`.
    * @type {!Element}
    */
			_this.DEFAULT_ELEMENT_PARENT = document.body;

			_this.setShouldUseFacade(true);
			_this.element = _this.initialConfig_.element;

			_this.setUpRenderer_();
			_this.setUpDataManager_();
			_this.setUpSyncUpdates_();

			_this.on('stateChanged', _this.handleComponentStateChanged_);
			_this.on('eventsChanged', _this.onEventsChanged_);
			_this.addListenersFromObj_(_this.dataManager_.get(_this, 'events'));

			_this.created();
			_this.componentCreated_ = true;
			if (opt_parentElement !== false) {
				_this.renderComponent(opt_parentElement);
			}
			return _this;
		}

		/**
   * Getter logic for the element property.
   * @return {Element}
   */


		_createClass(Component, [{
			key: 'addListenersFromObj_',
			value: function addListenersFromObj_(obj) {
				var _eventsStateKeyHandle;

				if (!this.eventsStateKeyHandler_) {
					this.eventsStateKeyHandler_ = new _events2.EventHandler();
				}
				var handles = (0, _events.addListenersFromObj)(this, obj);
				(_eventsStateKeyHandle = this.eventsStateKeyHandler_).add.apply(_eventsStateKeyHandle, _toConsumableArray(handles));
			}
		}, {
			key: 'attach',
			value: function attach(opt_parentElement, opt_siblingElement) {
				if (!this.inDocument) {
					this.attachElement(opt_parentElement, opt_siblingElement);
					this.inDocument = true;
					this.attachData_ = {
						parent: opt_parentElement,
						sibling: opt_siblingElement
					};
					this.emit('attached', this.attachData_);
					this.attached();
				}
				return this;
			}
		}, {
			key: 'attached',
			value: function attached() {}
		}, {
			key: 'attachElement',
			value: function attachElement(opt_parentElement, opt_siblingElement) {
				var element = this.element;
				if (element && (opt_siblingElement || !element.parentNode)) {
					var parent = (0, _dom.toElement)(opt_parentElement) || this.DEFAULT_ELEMENT_PARENT;
					parent.insertBefore(element, (0, _dom.toElement)(opt_siblingElement));
				}
			}
		}, {
			key: 'created',
			value: function created() {}
		}, {
			key: 'delegate',
			value: function delegate(eventName, selector, callback) {
				return this.on('delegate:' + eventName + ':' + selector, callback);
			}
		}, {
			key: 'detach',
			value: function detach() {
				if (this.inDocument) {
					if (this.element && this.element.parentNode) {
						this.element.parentNode.removeChild(this.element);
					}
					this.inDocument = false;
					this.detached();
				}
				this.emit('detached');
				return this;
			}
		}, {
			key: 'detached',
			value: function detached() {}
		}, {
			key: 'disposed',
			value: function disposed() {}
		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.detach();
				this.disposed();

				this.elementEventProxy_.dispose();
				this.elementEventProxy_ = null;

				this.dataManager_.dispose(this);
				this.dataManager_ = null;

				this.renderer_.dispose(this);
				this.renderer_ = null;

				_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'disposeInternal', this).call(this);
			}
		}, {
			key: 'getAttachData',
			value: function getAttachData() {
				return this.attachData_;
			}
		}, {
			key: 'getDataManager',
			value: function getDataManager() {
				return this.dataManager_;
			}
		}, {
			key: 'getInitialConfig',
			value: function getInitialConfig() {
				return this.initialConfig_;
			}
		}, {
			key: 'getState',
			value: function getState() {
				return this.dataManager_.getState(this);
			}
		}, {
			key: 'getStateKeys',
			value: function getStateKeys() {
				return this.dataManager_.getStateKeys(this);
			}
		}, {
			key: 'getRenderer',
			value: function getRenderer() {
				return this.renderer_;
			}
		}, {
			key: 'handleComponentElementChanged_',
			value: function handleComponentElementChanged_(prevVal, newVal) {
				this.elementEventProxy_.setOriginEmitter(newVal);
				if (this.componentCreated_) {
					this.emit('elementChanged', {
						prevVal: prevVal,
						newVal: newVal
					});
					if (newVal && this.wasRendered) {
						this.syncVisible(this.dataManager_.get(this, 'visible'));
					}
				}
			}
		}, {
			key: 'handleComponentStateChanged_',
			value: function handleComponentStateChanged_(event) {
				if (!this.hasSyncUpdates()) {
					this.updateRenderer_(event);
				}
				(0, _sync.syncState)(this, event.changes);
				this.emit('stateSynced', event);
			}
		}, {
			key: 'handleComponentStateKeyChanged_',
			value: function handleComponentStateKeyChanged_(data) {
				this.updateRenderer_({
					changes: _defineProperty({}, data.key, data)
				});
			}
		}, {
			key: 'hasSyncUpdates',
			value: function hasSyncUpdates() {
				return this.syncUpdates_;
			}
		}, {
			key: 'informRendered',
			value: function informRendered() {
				var firstRender = !this.hasRendererRendered_;
				this.hasRendererRendered_ = true;
				this.rendered(firstRender);
				this.emit('rendered', firstRender);
			}
		}, {
			key: 'mergeElementClasses_',
			value: function mergeElementClasses_(class1, class2) {
				return class1 ? class1 + ' ' + (class2 || '') : class2;
			}
		}, {
			key: 'onEventsChanged_',
			value: function onEventsChanged_(event) {
				this.eventsStateKeyHandler_.removeAllListeners();
				this.addListenersFromObj_(event.newVal);
			}
		}, {
			key: 'renderComponent',
			value: function renderComponent(opt_parentElement) {
				if (!this.hasRendererRendered_) {
					if (window.__METAL_DEV_TOOLS_HOOK__) {
						window.__METAL_DEV_TOOLS_HOOK__(this);
					}
					this.getRenderer().render(this);
				}
				this.emit('render');
				(0, _sync.syncState)(this);
				this.attach(opt_parentElement);
				this.wasRendered = true;
			}
		}, {
			key: 'setState',
			value: function setState(state, opt_callback) {
				this.dataManager_.setState(this, state, opt_callback);
			}
		}, {
			key: 'setterElementClassesFn_',
			value: function setterElementClassesFn_(val) {
				var elementClasses = (0, _metal.getStaticProperty)(this.constructor, 'ELEMENT_CLASSES', this.mergeElementClasses_);
				if (elementClasses) {
					val += ' ' + elementClasses;
				}
				return val.trim();
			}
		}, {
			key: 'setUpDataManager_',
			value: function setUpDataManager_() {
				this.dataManager_ = (0, _metal.getStaticProperty)(this.constructor, 'DATA_MANAGER');
				this.dataManager_.setUp(this, _metal.object.mixin({}, this.renderer_.getExtraDataConfig(this), Component.DATA));
			}
		}, {
			key: 'setUpRenderer_',
			value: function setUpRenderer_() {
				this.renderer_ = (0, _metal.getStaticProperty)(this.constructor, 'RENDERER');
				this.renderer_.setUp(this);
			}
		}, {
			key: 'setUpSyncUpdates_',
			value: function setUpSyncUpdates_() {
				this.syncUpdates_ = (0, _metal.getStaticProperty)(this.constructor, 'SYNC_UPDATES');
				if (this.hasSyncUpdates()) {
					this.on('stateKeyChanged', this.handleComponentStateKeyChanged_.bind(this));
				}
			}
		}, {
			key: 'startSkipUpdates',
			value: function startSkipUpdates() {
				this.skipUpdates_ = true;
			}
		}, {
			key: 'stopSkipUpdates',
			value: function stopSkipUpdates() {
				this.skipUpdates_ = false;
			}
		}, {
			key: 'syncVisible',
			value: function syncVisible(newVal) {
				if (this.element) {
					this.element.style.display = newVal ? '' : 'none';
				}
			}
		}, {
			key: 'rendered',
			value: function rendered() {}
		}, {
			key: 'updateRenderer_',
			value: function updateRenderer_(data) {
				if (!this.skipUpdates_ && this.hasRendererRendered_) {
					this.getRenderer().update(this, data);
				}
			}
		}, {
			key: 'validatorEventsFn_',
			value: function validatorEventsFn_(val) {
				return !(0, _metal.isDefAndNotNull)(val) || (0, _metal.isObject)(val);
			}
		}, {
			key: 'element',
			get: function get() {
				return this.elementValue_;
			},
			set: function set(val) {
				if (!(0, _metal.isElement)(val) && !(0, _metal.isString)(val) && (0, _metal.isDefAndNotNull)(val)) {
					return;
				}

				if (val) {
					val = (0, _dom.toElement)(val) || this.elementValue_;
				}

				if (this.elementValue_ !== val) {
					var prev = this.elementValue_;
					this.elementValue_ = val;
					this.handleComponentElementChanged_(prev, val);
				}
			}
		}], [{
			key: 'isComponentCtor',
			value: function isComponentCtor(fn) {
				return fn.prototype && fn.prototype[Component.COMPONENT_FLAG];
			}
		}, {
			key: 'render',
			value: function render(Ctor, opt_configOrElement, opt_element) {
				var config = opt_configOrElement;
				var element = opt_element;
				if ((0, _metal.isElement)(opt_configOrElement)) {
					config = null;
					element = opt_configOrElement;
				}
				var instance = new Ctor(config, false);
				instance.renderComponent(element);
				return instance;
			}
		}, {
			key: 'renderToString',
			value: function renderToString(Ctor, opt_config) {
				var rendererName = Ctor.RENDERER && Ctor.RENDERER.RENDERER_NAME;
				switch (rendererName) {
					case 'jsx':
					case 'soy':
					case 'incremental-dom':
						{
							var _ret = function () {
								if (typeof IncrementalDOM === 'undefined') {
									throw new Error('Error. Trying to render incremental dom ' + 'based component to string requires IncrementalDOM ' + 'implementation to be loaded.');
								}
								// Incremental dom patches for components or nested components are
								// isolated inside the component element. The following code intercepts
								// incremental dom patches and collect results into temporary stack in
								// order to successfully collect the final string of the outermost
								// component after all nested components stack rendered.
								var interceptedComponentStrings = [];
								var patch = IncrementalDOM.patch;
								var patchInterceptor = function patchInterceptor() {
									var currentElement = patch.apply(null, arguments);
									interceptedComponentStrings.push(currentElement.innerHTML);
									IncrementalDOM.patch = patch;
								};
								IncrementalDOM.patch = patchInterceptor;
								Component.render(Ctor, opt_config).dispose();
								return {
									v: interceptedComponentStrings[0]
								};
							}();

							if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
						}
					default:
						throw new Error('Error. Trying to render non incremental dom ' + 'based component to string.');
				}
			}
		}]);

		return Component;
	}(_events2.EventEmitter);

	/**
  * Component data definition.
  * @type {Object}
  * @static
  */
	Component.DATA = {
		/**
   * Objects describing children elements that were passed to be rendered inside
   * this component.
   * @type {!Array<!Object>}
   */
		children: {
			validator: Array.isArray,
			value: []
		},

		/**
   * CSS classes to be applied to the element.
   * @type {string}
   */
		elementClasses: {
			setter: 'setterElementClassesFn_',
			validator: _metal.isString,
			value: ''
		},

		/**
   * Listeners that should be attached to this component. Should be provided as
   * an object, where the keys are event names and the values are the listener
   * functions (or function names).
   * @type {Object<string, (function()|string|{selector: string, fn: function()|string})>}
   */
		events: {
			validator: 'validatorEventsFn_',
			value: null
		},

		/**
   * Indicates if the component is visible or not.
   * @type {boolean}
   */
		visible: {
			validator: _metal.isBoolean,
			value: true
		}
	};

	/**
  * Name of the flag used to identify component constructors via their prototype.
  * @type {string}
  */
	Component.COMPONENT_FLAG = '__metal_component__';

	/**
  * The `ComponentDataManager` class that should be used. This class will be
  * responsible for handling the component's data. Each component may have its
  * own implementation.
  * @type {!ComponentDataManager}
  */
	Component.DATA_MANAGER = _ComponentDataManager2.default;

	/**
  * CSS classes to be applied to the element.
  * @type {string}
  */
	Component.ELEMENT_CLASSES = '';

	/**
  * The `ComponentRenderer` that should be used. Components need to set this
  * to a subclass of `ComponentRenderer` that has the rendering logic, like
  * `SoyRenderer`.
  * @type {!ComponentRenderer}
  */
	Component.RENDERER = _ComponentRenderer2.default;

	/**
  * Flag indicating if component updates will happen synchronously. Updates are
  * done asynchronously by default, which allows changes to be batched and
  * applied together.
  * @type {boolean}
  */
	Component.SYNC_UPDATES = false;

	/**
  * Sets a prototype flag to easily determine if a given constructor is for
  * a component or not.
  */
	Component.prototype[Component.COMPONENT_FLAG] = true;

	var proxyBlackList_ = {
		eventsChanged: true,
		stateChanged: true,
		stateKeyChanged: true
	};

	exports.default = Component;
});
//# sourceMappingURL=Component.js.map