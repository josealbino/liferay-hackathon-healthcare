define(['exports', 'metal/src/metal', './validators'], function (exports, _metal, _validators) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _validators2 = _interopRequireDefault(_validators);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Sugar api that can be used as an alternative for manually building `State`
  * configuration in the expected format. For example, instead of having
  * something like this:
  *
  * ```js
  * MyClass.STATE = {
  *   foo: {
  *     required: true,
  *     validator: validators.number,
  *     value: 13
  *   }
  * };
  * ```
  *
  * You could instead do:
  *
  * ```js
  * MyClass.STATE = {
  *   foo: Config.required().number().value(13)
  * };
  * ```
  */
	var Config = {
		/**
  * An object that contains a validator function.
  * @typedef {!Object} ConfigWithValidator
  */

		/**
   * Function that creates `State` object with an `any` validator.
   * @return {ConfigWithValidator} `State` configuration object.
   */
		any: setPrimitiveValidators('any'),

		/**
   * Function that creates `State` object with an `array` validator.
   * @return {ConfigWithValidator} `State` configuration object.
   */
		array: setPrimitiveValidators('array'),

		/**
   * Function that creates `State` object with an `arrayOf` validator.
   * @param {ConfigWithValidator} stateConfig `State` configuration object
   * @return {ConfigWithValidator} `State` configuration object.
   */
		arrayOf: setNestedValidators('arrayOf'),

		/**
   * Function that creates `State` object with a `bool` validator.
   * @return {ConfigWithValidator} `State` configuration object.
   */
		bool: setPrimitiveValidators('bool'),

		/**
   * Function that creates `State` object with a `func` validator.
   * @return {ConfigWithValidator} `State` configuration object.
   */
		func: setPrimitiveValidators('func'),

		/**
   * Function that creates `State` object with an `instanceOf` validator.
   * @return {ConfigWithValidator} `State` configuration object.
   */
		instanceOf: setExplicitValueValidators('instanceOf'),

		/**
   * Function that creates `State` object with a `number` validator.
   * @return {ConfigWithValidator} `State` configuration object.
   */
		number: setPrimitiveValidators('number'),

		/**
   * Function that creates `State` object with an `object` validator.
   * @return {ConfigWithValidator} `State` configuration object.
   */
		object: setPrimitiveValidators('object'),

		/**
   * Function that creates `State` object with an `objectOf` validator.
   * @param {ConfigWithValidator} stateConfig `State` configuration object
   * @return {ConfigWithValidator} `State` configuration object.
   */
		objectOf: setNestedValidators('objectOf'),

		/**
   * Function that creates `State` object with an `oneOf` validator.
   * @param {!Array} values `State` configuration object
   * @return {ConfigWithValidator} `State` configuration object.
   */
		oneOf: setExplicitValueValidators('oneOf'),

		oneOfType: function oneOfType(validatorArray) {
			validatorArray = validatorArray.map(function (configObj) {
				return configObj.config.validator;
			});

			return this.validator(_validators2.default.oneOfType(validatorArray));
		},
		shapeOf: function shapeOf(shapeObj) {
			shapeObj = destructShapeOfConfigs(shapeObj);

			return this.validator(_validators2.default.shapeOf(shapeObj));
		},


		/**
   * Function that creates `State` object with an `string` validator.
   * @return {ConfigWithValidator} `State` configuration object.
   */
		string: setPrimitiveValidators('string'),

		internal: function internal() {
			var _internal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			return mergeConfig(this, {
				internal: _internal
			});
		},
		required: function required() {
			var _required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			return mergeConfig(this, {
				required: _required
			});
		},
		setter: function setter(_setter) {
			return mergeConfig(this, {
				setter: _setter
			});
		},
		validator: function validator(_validator) {
			return mergeConfig(this, {
				validator: _validator
			});
		},
		value: function value(_value) {
			return mergeConfig(this, {
				value: _value
			});
		},
		valueFn: function valueFn(_valueFn) {
			return mergeConfig(this, {
				valueFn: _valueFn
			});
		}
	};

	/**
  * Recursively sets validators for shapeOf.
  * @param {!Object} shape The shape of specific types.
  * @return {!Object} Shape object with validators as values.
  */
	function destructShapeOfConfigs(shape) {
		var keys = Object.keys(shape);

		var retShape = {};

		keys.forEach(function (key) {
			var value = shape[key];

			retShape[key] = value.config && value.config.validator ? value.config.validator : destructShapeOfConfigs(value);
		});

		return retShape;
	}

	/**
  * Merges the given config object into the one that has been built so far.
  * @param {!Object} context The object calling this function.
  * @param {!Object} config The object to merge to the built config.
  * @return {!Object} The final object containing the built config.
  */
	function mergeConfig(context, config) {
		var obj = context;
		if (obj === Config) {
			obj = Object.create(Config);
			obj.config = {};
		}
		_metal.object.mixin(obj.config, config);
		return obj;
	}

	/**
 * Calls validators with provided argument.
 * @param {string} name The name of the validator.
 * @param {!function()}
 */
	function setExplicitValueValidators(name) {
		return function (arg) {
			return this.validator(_validators2.default[name](arg));
		};
	}

	/**
 * Calls validators with a single nested config.
 * @param {string} name The name of the validator.
 * @return {!function()}
 */
	function setNestedValidators(name) {
		return function (arg) {
			return this.validator(_validators2.default[name](arg.config.validator));
		};
	}

	/**
 * Adds primitive type validators to the config object.
 * @param {string} name The name of the validator.
 * @return {!function()}
 */
	function setPrimitiveValidators(name) {
		return function () {
			return this.validator(_validators2.default[name]);
		};
	}

	exports.default = Config;
});
//# sourceMappingURL=Config.js.map