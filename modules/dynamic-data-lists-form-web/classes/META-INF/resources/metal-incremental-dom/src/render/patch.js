define(['exports', 'metal-dom/src/all/dom', '../data', './render'], function (exports, _dom, _data, _render) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getPatchingComponent = getPatchingComponent;
	exports.patch = patch;


	var patchingComponents_ = [];

	/**
  * Guarantees that the component's element has a parent. That's necessary
  * when calling incremental dom's `patchOuter` for now, as otherwise it will
  * throw an error if the element needs to be replaced.
  * @return {Element} The parent, in case it was added.
  * @private
  */
	function buildParentIfNecessary_(element) {
		if (!element || !element.parentNode) {
			var parent = document.createElement('div');
			if (element) {
				(0, _dom.append)(parent, element);
			}
			return parent;
		}
	}

	/**
  * Calls incremental dom's patch function.
  * @param {!Component} component The component to patch.
  * @param {!Element} element The element the component should be patched on.
  * @param {boolean=} opt_outer Flag indicating if `patchOuter` should be used
  *     instead of `patch`.
  * @private
  */
	function callPatch_(component, element, opt_outer) {
		patchingComponents_.push(component);

		var data = (0, _data.getData)(component);
		if (!data.render) {
			// Store reference to avoid binds on every patch.
			data.render = _render.render.bind(null, component);
		}

		var patchFn = opt_outer ? IncrementalDOM.patchOuter : IncrementalDOM.patch;
		patchFn(element, data.render);

		patchingComponents_.pop();
	}

	/**
  * Gets the component that triggered the current patch operation.
  * @return {Component}
  */
	function getPatchingComponent() {
		return patchingComponents_[patchingComponents_.length - 1];
	}

	/**
  * Patches the component with incremental dom function calls.
  * @param {!Component} component
  */
	function patch(component) {
		if (!tryPatchEmptyWithParent_(component)) {
			if (!tryPatchWithNoParent_(component)) {
				var element = component.element;
				callPatch_(component, element, true);
			}
		}
	}

	/**
  * Checks if the component has no content but was rendered from another
  * component. If so, we'll need to patch this parent to make sure that any new
  * content will be added in the right position.
  * @param {!Component} component
  * @return {?boolean} True if the patch happened. Nothing otherwise.
  * @private
  */
	function tryPatchEmptyWithParent_(component) {
		var data = (0, _data.getData)(component);
		if (!component.element && data.parent) {
			data.parent.getRenderer().patch(data.parent);
			return true;
		}
	}

	/**
  * Checks if the component's element exists and has a parent. If that's not the
  * case, a temporary parent will be created and passed to the `patch` function,
  * since incremental dom requires it. Once the patch is done the temporary
  * parent is removed and the component's content is reattached to the correct
  * final position.
  * @param {!Component} component
  * @return {?boolean} True if the patch happened. Nothing otherwise.
  * @private
  */
	function tryPatchWithNoParent_(component) {
		var tempParent = buildParentIfNecessary_(component.element);
		if (tempParent) {
			callPatch_(component, tempParent);
			(0, _dom.exitDocument)(component.element);
			if (component.element && component.inDocument) {
				var attach = component.getAttachData();
				component.attachElement(attach.parent, attach.sibling);
			}
			return true;
		}
	}
});
//# sourceMappingURL=patch.js.map