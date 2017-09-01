define(['exports', '../callArgs', 'metal/src/metal', '../incremental-dom-aop'], function (exports, _callArgs, _metal, _incrementalDomAop) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.CHILD_OWNER = undefined;
	exports.captureChildren = captureChildren;
	exports.isChildTag = isChildTag;
	exports.getOwner = getOwner;
	exports.renderChildTree = renderChildTree;

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

	/**
  * Property identifying a specific object as a Metal.js child node, and
  * pointing to the component instance that created it.
  * @type {string}
  */
	var CHILD_OWNER = exports.CHILD_OWNER = '__metalChildOwner';

	/**
  * Captures all child elements from incremental dom calls.
  * @param {!Component} component The component that is capturing children.
  * @param {!function()} callback Function to be called when children have all
  *     been captured.
  * @param {Object} data Data to pass to the callback function when calling it.
  */
	function captureChildren(component, callback, data) {
		owner_ = component;
		callback_ = callback;
		callbackData_ = data;
		tree_ = {
			props: {
				children: []
			}
		};
		tree_.config = tree_.props;
		currentParent_ = tree_;
		isCapturing_ = true;
		(0, _incrementalDomAop.startInterception)({
			elementClose: handleInterceptedCloseCall_,
			elementOpen: handleInterceptedOpenCall_,
			text: handleInterceptedTextCall_
		});
	}

	/**
  * Checks if the given tag was built from a component's children.
  * @param {*} tag
  * @return {boolean}
  */
	function isChildTag(tag) {
		return (0, _metal.isDef)(tag.tag);
	}

	/**
  * Gets the node's original owner.
  * @param {!Object} node
  * @return {Component}
  */
	function getOwner(node) {
		return node[CHILD_OWNER];
	}

	/**
  * Renders a children tree through incremental dom.
  * @param {!{args: Array, children: !Array, isText: ?boolean}}
  * @param {function()=} opt_skipNode Optional function that is called for
  *     each node to be rendered. If it returns true, the node will be skipped.
  * @protected
  */
	function renderChildTree(tree, opt_skipNode) {
		if (isCapturing_) {
			// If capturing, just add the node directly to the captured tree.
			addChildToTree(tree);
			return;
		}

		if (opt_skipNode && opt_skipNode.call(null, tree)) {
			return;
		}

		if ((0, _metal.isDef)(tree.text)) {
			var args = tree.args ? tree.args : [];
			args[0] = tree.text;
			IncrementalDOM.text.apply(null, args);
		} else {
			var _args = (0, _callArgs.buildCallFromConfig)(tree.tag, tree.props);
			_args[0] = {
				tag: _args[0],
				owner: getOwner(tree)
			};
			IncrementalDOM.elementOpen.apply(null, _args);
			if (tree.props.children) {
				for (var i = 0; i < tree.props.children.length; i++) {
					renderChildTree(tree.props.children[i], opt_skipNode);
				}
			}
			IncrementalDOM.elementClose(tree.tag);
		}
	}

	var callbackData_ = void 0;
	var callback_ = void 0;
	var currentParent_ = void 0;
	var isCapturing_ = false;
	var owner_ = void 0;
	var tree_ = void 0;

	/**
  * Adds a child element to the tree.
  * @param {!Array} args The arguments passed to the incremental dom call.
  * @param {boolean=} opt_isText Optional flag indicating if the child is a
  *     text element.
  * @protected
  */
	function addChildCallToTree_(args, opt_isText) {
		var child = _defineProperty({
			parent: currentParent_
		}, CHILD_OWNER, owner_);

		if (opt_isText) {
			child.text = args[0];
			if (args.length > 1) {
				child.args = args;
			}
		} else {
			child.tag = args[0];
			child.props = (0, _callArgs.buildConfigFromCall)(args);
			child.props.children = [];
			child.config = child.props;
		}

		addChildToTree(child);
		return child;
	}

	function addChildToTree(child) {
		currentParent_.props.children.push(child);
	}

	/**
  * Handles an intercepted call to the `elementClose` function from incremental
  * dom.
  * @protected
  */
	function handleInterceptedCloseCall_() {
		if (currentParent_ === tree_) {
			(0, _incrementalDomAop.stopInterception)();
			isCapturing_ = false;
			var node = callback_.call(owner_, tree_, callbackData_);
			callback_ = null;
			callbackData_ = null;
			currentParent_ = null;
			owner_ = null;
			tree_ = null;
			return node;
		} else {
			currentParent_ = currentParent_.parent;
			return true;
		}
	}

	/**
  * Handles an intercepted call to the `elementOpen` function from incremental
  * dom.
  * @param {!function()} originalFn The original function before interception.
  * @protected
  */
	function handleInterceptedOpenCall_() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		currentParent_ = addChildCallToTree_(args);
	}

	/**
  * Handles an intercepted call to the `text` function from incremental dom.
  * @param {!function()} originalFn The original function before interception.
  * @protected
  */
	function handleInterceptedTextCall_() {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		addChildCallToTree_(args, true);
	}
});
//# sourceMappingURL=children.js.map