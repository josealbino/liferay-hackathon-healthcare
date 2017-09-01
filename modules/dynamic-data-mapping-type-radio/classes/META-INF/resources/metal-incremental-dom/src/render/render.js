define(['exports', './attributes', '../callArgs', '../children/children', '../changes', 'metal-dom/src/all/dom', '../data', 'metal/src/metal', '../cleanup/unused', '../incremental-dom-aop', 'metal-component/src/all/component'], function (exports, _attributes, _callArgs, _children, _changes, _dom, _data, _metal, _unused, _incrementalDomAop, _component) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getComponentBeingRendered = getComponentBeingRendered;
	exports.isComponentTag_ = isComponentTag_;
	exports.render = render;
	exports.renderChild = renderChild;
	exports.renderFunction = renderFunction;

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

	var renderingComponents_ = [];
	var emptyChildren_ = [];

	/**
  * Adds the given css classes to the specified arguments for an incremental
  * dom call, merging with the existing value if there is one.
  * @param {string} elementClasses
  * @param {!Object} config
  * @private
  */
	function addElementClasses_(elementClasses, config) {
		if (config.class) {
			config.class += ' ' + elementClasses;
			config.class = removeDuplicateClasses_(config.class);
		} else {
			config.class = elementClasses;
		}
	}

	/**
  * Builds the "children" array to be passed to the current component.
  * @param {!Array<!Object>} children
  * @return {!Array<!Object>}
  * @private
  */
	function buildChildren_(children) {
		return children.length === 0 ? emptyChildren_ : children;
	}

	/**
  * Finishes the render operation, doing some cleaups.
  * @param {!Component} component
  * @private
  */
	function cleanUpRender_(component) {
		(0, _incrementalDomAop.stopInterception)();
		if (!(0, _data.getData)(component).rootElementReached) {
			component.element = null;
		}
		component.informRendered();
		finishedRenderingComponent_();
	}

	/**
  * Removes the most recent component from the queue of rendering components.
  * @private
  */
	function finishedRenderingComponent_() {
		renderingComponents_.pop();
		if (renderingComponents_.length === 0) {
			(0, _unused.disposeUnused)();
		}
	}

	/**
  * Generates a key for the next element to be rendered.
  * @param {!Component} component
  * @param {?string} key The key originally passed to the element.
  * @return {?string}
  * @private
  */
	function generateKey_(component, key) {
		var data = (0, _data.getData)(component);
		if (!data.rootElementReached && data.config.key) {
			key = data.config.key;
		}
		return component.getRenderer().generateKey(component, key);
	}

	/**
  * Gets the child components stored in the given object.
  * @param {!Object} data
  * @return {!Array<!Component>}
  * @private
  */
	function getChildComponents_(data) {
		data.childComponents = data.childComponents || [];
		return data.childComponents;
	}

	/**
  * Gets the component being currently rendered.
  * @return {Component}
  */
	function getComponentBeingRendered() {
		return renderingComponents_[renderingComponents_.length - 1];
	}

	/**
  * Gets the data object that should be currently used. This object will either
  * come from the current element being rendered by incremental dom or from
  * the component instance being rendered (only when the current element is the
  * component's direct parent).
  * @return {!Object}
  * @private
  */
	function getCurrentData() {
		var element = IncrementalDOM.currentElement();
		var comp = getComponentBeingRendered();
		var obj = (0, _data.getData)(comp);
		if (obj.rootElementReached && element !== comp.element.parentNode) {
			obj = _dom.domData.get(element);
		}
		obj.icComponentsData = obj.icComponentsData || {};
		return obj.icComponentsData;
	}

	/**
  * Returns the "ref" to be used for a component. Uses "key" as "ref" when
  * compatibility mode is on for the current renderer.
  * @param {!Component} owner
  * @param {!Object} config
  * @return {?string}
  * @private
  */
	function getRef_(owner, config) {
		var compatData = (0, _metal.getCompatibilityModeData)();
		if (compatData) {
			var ownerRenderer = owner.getRenderer();
			var renderers = compatData.renderers;
			var useKey = !renderers || renderers.indexOf(ownerRenderer) !== -1 || renderers.indexOf(ownerRenderer.RENDERER_NAME) !== -1;
			if (useKey && config.key && !config.ref) {
				return config.key;
			}
		}
		return config.ref;
	}

	/**
  * Gets the sub component referenced by the given tag and config data,
  * creating it if it doesn't yet exist.
  * @param {string|!Function} tagOrCtor The tag name.
  * @param {!Object} config The config object for the sub component.
  * @param {!Component} owner
  * @return {!Component} The sub component.
  * @protected
  */
	function getSubComponent_(tagOrCtor, config, owner) {
		var Ctor = tagOrCtor;
		if ((0, _metal.isString)(Ctor)) {
			Ctor = _component.ComponentRegistry.getConstructor(tagOrCtor);
		}

		var ref = getRef_(owner, config);
		var comp = void 0;
		if ((0, _metal.isDef)(ref)) {
			comp = match_(owner.components[ref], Ctor, config, owner);
			owner.components[ref] = comp;
			owner.refs[ref] = comp;
		} else {
			var data = getCurrentData();
			var key = config.key;
			if (!(0, _metal.isDef)(key)) {
				var type = (0, _metal.getUid)(Ctor, true);
				data.currCount = data.currCount || {};
				data.currCount[type] = data.currCount[type] || 0;
				key = '__METAL_IC__' + type + '_' + data.currCount[type]++;
			}
			comp = match_(data.prevComps ? data.prevComps[key] : null, Ctor, config, owner);
			data.currComps = data.currComps || {};
			data.currComps[key] = comp;
		}

		return comp;
	}

	/**
  * Handles the event of children having finished being captured.
  * @param {!Object} tree The captured children in tree format.
  * @private
  */
	function handleChildrenCaptured_(tree, _ref) {
		var props = _ref.props;
		var tag = _ref.tag;

		props.children = buildChildren_(tree.props.children);
		return renderFromTag_(tag, props);
	}

	/**
  * Handles a child being rendered via `IncrementalDomChildren.render`. Skips
  * component nodes so that they can be rendered the correct way without
  * having to recapture both them and their children via incremental dom.
  * @param {!Object} node
  * @return {boolean}
  * @private
  */
	function handleChildRender_(node) {
		if (node.tag && isComponentTag_(node.tag)) {
			node.props.children = buildChildren_(node.props.children);
			renderFromTag_(node.tag, node.props, (0, _children.getOwner)(node));
			return true;
		}
	}

	/**
  * Handles an intercepted call to the attributes default handler from
  * incremental dom.
  * @param {!Element} element
  * @param {string} name
  * @param {*} value
  * @private
  */
	function handleInterceptedAttributesCall_(element, name, value) {
		(0, _attributes.applyAttribute)(getComponentBeingRendered(), element, name, value);
	}

	/**
  * Handles an intercepted call to the `elementOpen` function from incremental
  * dom.
  * @param {string} tag
  * @private
  */
	function handleInterceptedOpenCall_(tag) {
		if (isComponentTag_(tag)) {
			return handleSubComponentCall_.apply(null, arguments);
		} else {
			return handleRegularCall_.apply(null, arguments);
		}
	}

	/**
  * Handles an intercepted call to the `elementOpen` function from incremental
  * dom, done for a regular element. Among other things, adds any inline
  * listeners found on the first render and makes sure that component root
  * elements are always reused.
  * @param {!Component} owner
  * @param {!Array} args
  * @return {!Element} The rendered element.
  * @private
  */
	function handleRegularCall_() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var config = (0, _callArgs.buildConfigFromCall)(args);
		var tag = args[0];

		var comp = getComponentBeingRendered();
		var owner = comp;
		if ((0, _children.isChildTag)(tag)) {
			owner = tag.owner;
			tag = tag.tag;
		}
		config.key = generateKey_(comp, config.key);

		if (!(0, _data.getData)(comp).rootElementReached) {
			var elementClasses = comp.getDataManager().get(comp, 'elementClasses');
			if (elementClasses) {
				addElementClasses_(elementClasses, config);
			}
		}
		(0, _attributes.convertListenerNamesToFns)(comp, config);

		var call = (0, _callArgs.buildCallFromConfig)(tag, config);
		var node = (0, _incrementalDomAop.getOriginalFn)('elementOpen').apply(null, call);
		resetNodeData_(node);
		updateElementIfNotReached_(comp, node);

		if ((0, _metal.isDefAndNotNull)(config.ref)) {
			owner.refs[config.ref] = node;
		}
		owner.getRenderer().handleNodeRendered(node);

		return node;
	}

	/**
  * Handles an intercepted call to the `elementOpen` function from incremental
  * dom, done for a sub component element. Creates and updates the appropriate
  * sub component.
  * @private
  */
	function handleSubComponentCall_() {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		(0, _children.captureChildren)(getComponentBeingRendered(), handleChildrenCaptured_, {
			props: (0, _callArgs.buildConfigFromCall)(args),
			tag: args[0]
		});
	}

	/**
  * Passes down elementClasses to a child component if the parent component
  * returns another component at the top level (HOC).
  * @param {*} parent The parent component
  * @param {*} config The config of the subcomponent
  */
	function inheritElementClasses_(parent, config) {
		var parentData = (0, _data.getData)(parent);
		var parentConfig = parentData.config;

		if (!parentData.rootElementReached && parentConfig && (0, _metal.isString)(parentConfig.elementClasses)) {
			var currentClasses = '';
			if ((0, _metal.isString)(config.elementClasses)) {
				currentClasses = config.elementClasses + ' ';
			}

			config.elementClasses = currentClasses + parentConfig.elementClasses;
		}
	}

	/**
  * Checks if the given tag represents a metal component.
  * @param {string} tag
  * @return {boolean}
  * @private
  */
	function isComponentTag_(tag) {
		return (0, _metal.isFunction)(tag) || (0, _metal.isString)(tag) && tag[0] === tag[0].toUpperCase();
	}

	/**
  * Checks if the given component can be a match for a constructor.
  * @param {!Component} comp
  * @param {!function()} Ctor
  * @param {!Component} owner
  * @return {boolean}
  * @private
  */
	function isMatch_(comp, Ctor, owner) {
		if (!comp || comp.constructor !== Ctor || comp.isDisposed()) {
			return false;
		}
		return (0, _data.getData)(comp).owner === owner;
	}

	/**
  * Returns the given component if it matches the specified constructor
  * function. Otherwise, returns a new instance of the given constructor. On
  * both cases the component's state and config will be updated.
  * @param {Component} comp
  * @param {!function()} Ctor
  * @param {!Object} config
  * @param {!Component} owner
  * @return {!Component}
  * @private
  */
	function match_(comp, Ctor, config, owner) {
		if (isMatch_(comp, Ctor, owner)) {
			comp.startSkipUpdates();
			comp.getDataManager().replaceNonInternal(comp, config);
			comp.stopSkipUpdates();
		} else {
			comp = new Ctor(config, false);
		}
		(0, _data.getData)(comp).config = config;
		return comp;
	}

	/**
  * Prepares the render operation, resetting the component's data and starting
  * the incremental dom interception.
  * @param {!Component} component
  * @private
  */
	function prepareRender_(component) {
		renderingComponents_.push(component);

		var data = (0, _data.getData)(component);
		resetComponentsData_(data.icComponentsData);
		(0, _changes.clearChanges)(data);
		data.rootElementReached = false;
		component.refs = {};

		if (data.childComponents) {
			(0, _unused.schedule)(data.childComponents);
			data.childComponents = null;
		}

		(0, _incrementalDomAop.startInterception)({
			attributes: handleInterceptedAttributesCall_,
			elementOpen: handleInterceptedOpenCall_
		});
	}

	/**
  * Removes duplicate css classes from the given string.
  * @param {string} classString
  * @return {string}
  * @private
  */
	function removeDuplicateClasses_(classString) {
		var classes = [];
		var all = classString.split(/\s+/);
		var used = {};
		for (var i = 0; i < all.length; i++) {
			if (!used[all[i]]) {
				used[all[i]] = true;
				classes.push(all[i]);
			}
		}
		return classes.join(' ');
	}

	/**
  * Renders the component with incremental dom function calls. This assumes that
  * an incremental dom `patch` is already running, and that this function has
  * been called inside it.
  * @param {!Component} component
  */
	function render(component) {
		prepareRender_(component);
		component.getRenderer().renderIncDom(component);
		cleanUpRender_(component);
	}

	/**
  * Renders the given child node.
  * @param {!Object} child
  */
	function renderChild(child) {
		(0, _children.renderChildTree)(child, handleChildRender_);
	}

	/**
  * Renders the contents for the given tag.
  * @param {!function()|string} tag
  * @param {!Object} config
  * @param {Component=} opt_owner
  * @private
  */
	function renderFromTag_(tag, config, opt_owner) {
		if ((0, _metal.isString)(tag) || tag.prototype.getRenderer) {
			var comp = renderSubComponent_(tag, config, opt_owner);
			updateElementIfNotReached_(getComponentBeingRendered(), comp.element);
			return comp.element;
		} else {
			return tag(config);
		}
	}

	/**
  * Creates and renders the given function, which can either be a simple
  * incremental dom function or a component constructor.
  * @param {!IncrementalDomRenderer} renderer
  * @param {!function()} fnOrCtor Either a simple incremental dom function or a
  *     component constructor.
  * @param {Object|Element=} opt_dataOrElement Optional config data for the
  *     function or parent for the rendered content.
  * @param {Element=} opt_parent Optional parent for the rendered content.
  * @return {!Component} The rendered component's instance.
  */
	function renderFunction(renderer, fnOrCtor, opt_dataOrElement, opt_parent) {
		if (!_component.Component.isComponentCtor(fnOrCtor)) {
			(function () {
				var fn = fnOrCtor;

				var TempComponent = function (_Component) {
					_inherits(TempComponent, _Component);

					function TempComponent() {
						_classCallCheck(this, TempComponent);

						return _possibleConstructorReturn(this, (TempComponent.__proto__ || Object.getPrototypeOf(TempComponent)).apply(this, arguments));
					}

					_createClass(TempComponent, [{
						key: 'created',
						value: function created() {
							var parent = getComponentBeingRendered();
							if (parent) {
								updateContext_(this, parent);
							}
						}
					}, {
						key: 'render',
						value: function render() {
							fn(this.getInitialConfig());
						}
					}]);

					return TempComponent;
				}(_component.Component);

				TempComponent.RENDERER = renderer;
				fnOrCtor = TempComponent;
			})();
		}
		return _component.Component.render(fnOrCtor, opt_dataOrElement, opt_parent);
	}

	/**
  * This updates the sub component that is represented by the given data.
  * The sub component is created, added to its parent and rendered. If it
  * had already been rendered before though, it will only have its state
  * updated instead.
  * @param {string|!function()} tagOrCtor The tag name or constructor function.
  * @param {!Object} config The config object for the sub component.
  * @param {ComponentRenderer=} opt_owner
  * @return {!Component} The updated sub component.
  * @private
  */
	function renderSubComponent_(tagOrCtor, config, opt_owner) {
		var parent = getComponentBeingRendered();
		var owner = opt_owner || parent;

		inheritElementClasses_(parent, config);

		var comp = getSubComponent_(tagOrCtor, config, owner);
		updateContext_(comp, parent);

		var data = (0, _data.getData)(comp);
		data.parent = parent;
		data.owner = owner;

		var parentData = (0, _data.getData)(parent);
		getChildComponents_(parentData).push(comp);
		if (!config.key && !parentData.rootElementReached) {
			config.key = parentData.config.key;
		}

		comp.getRenderer().renderInsidePatch(comp);
		if (!comp.wasRendered) {
			comp.renderComponent();
		}
		return comp;
	}

	/**
  * Resets the given incremental dom data object, preparing it for the next pass.
  * @param {Object} data
  * @private
  */
	function resetComponentsData_(data) {
		if (data) {
			data.prevComps = data.currComps;
			data.currComps = null;
			data.currCount = null;
		}
	}
	/**
  * Resets all data stored in the given node.
  * @param {!Element} node
  * @private
  */
	function resetNodeData_(node) {
		if (_dom.domData.has(node)) {
			resetComponentsData_(_dom.domData.get(node).icComponentsData);
		}
	}

	/**
  * Updates the given component's context according to the data from the
  * component that is currently being rendered.
  * @param {!Component} comp
  * @protected
  */
	function updateContext_(comp, parent) {
		var context = comp.context;
		var childContext = parent.getChildContext ? parent.getChildContext() : null;
		_metal.object.mixin(context, parent.context, childContext);
		comp.context = context;
	}

	/**
  * Updates this renderer's component's element with the given values, unless
  * it has already been reached by an earlier call.
  * @param {!Component} component
  * @param {!Element} node
  * @private
  */
	function updateElementIfNotReached_(component, node) {
		var data = (0, _data.getData)(component);
		if (!data.rootElementReached) {
			data.rootElementReached = true;
			if (component.element !== node) {
				component.element = node;
			}
		}
	}
});
//# sourceMappingURL=render.js.map