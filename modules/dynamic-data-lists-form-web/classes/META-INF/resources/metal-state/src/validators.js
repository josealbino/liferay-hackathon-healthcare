define(['exports', 'metal/src/metal'], function (exports, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var ERROR_ARRAY_OF_TYPE = 'Expected an array of single type.';
	var ERROR_OBJECT_OF_TYPE = 'Expected object of one type.';
	var ERROR_ONE_OF = 'Expected one of given values.';
	var ERROR_ONE_OF_TYPE = 'Expected one of given types.';
	var ERROR_SHAPE_OF = 'Expected object with a specific shape.';

	/**
  * Provides access to various type validators that will return an
  * instance of Error when validation fails. Note that all type validators
  * will also accept null or undefined values. To not accept these you should
  * instead make your state property required.
  */
	var validators = {
		any: function any() {
			return function () {
				return true;
			};
		},
		array: buildTypeValidator('array'),
		bool: buildTypeValidator('boolean'),
		func: buildTypeValidator('function'),
		number: buildTypeValidator('number'),
		object: buildTypeValidator('object'),
		string: buildTypeValidator('string'),

		/**
   * Creates a validator that checks that the value it receives is an array
   * of items, and that all of the items pass the given validator.
   * @param {!function()} validator Validator to check each item against.
   * @return {!function()}
   */
		arrayOf: function arrayOf(validator) {
			return maybe(function (value, name, context) {
				var result = validators.array(value, name, context);
				if (isInvalid(result)) {
					return result;
				}
				return validateArrayItems(validator, value, name, context);
			});
		},

		/**
   * Creates a validator that checks if a value is an instance of a given class.
   * @param {!function()} expectedClass Class to check value against.
   * @return {!function()}
   */
		instanceOf: function instanceOf(expectedClass) {
			return maybe(function (value, name, context) {
				if (value instanceof expectedClass) {
					return true;
				}
				var msg = 'Expected instance of ' + expectedClass;
				return composeError(msg, name, context);
			});
		},

		/**
   * Creates a validator that checks that the value it receives is an object,
   * and that all values within that object pass the given validator.
   * @param {!function()} validator Validator to check each object value against.
   * @return {!function()}
   */
		objectOf: function objectOf(validator) {
			return maybe(function (value, name, context) {
				for (var key in value) {
					if (isInvalid(validator(value[key]))) {
						return composeError(ERROR_OBJECT_OF_TYPE, name, context);
					}
				}
				return true;
			});
		},

		/**
   * Creates a validator that checks if the received value matches one of the
   * given values.
   * @param {!Array} arrayOfValues Array of values to check equality against.
   * @return {!function()}
   */
		oneOf: function oneOf(arrayOfValues) {
			return maybe(function (value, name, context) {
				var result = validators.array(arrayOfValues, name, context);
				if (isInvalid(result)) {
					return result;
				}
				return arrayOfValues.indexOf(value) === -1 ? composeError(ERROR_ONE_OF, name, context) : true;
			});
		},

		/**
   * Creates a validator that checks if the received value matches one of the
   * given types.
   * @param {!Array} arrayOfTypeValidators Array of validators to check value
   *     against.
   * @return {!function()}
   */
		oneOfType: function oneOfType(arrayOfTypeValidators) {
			return maybe(function (value, name, context) {
				var result = validators.array(arrayOfTypeValidators, name, context);
				if (isInvalid(result)) {
					return result;
				}

				for (var i = 0; i < arrayOfTypeValidators.length; i++) {
					if (!isInvalid(arrayOfTypeValidators[i](value, name, context))) {
						return true;
					}
				}
				return composeError(ERROR_ONE_OF_TYPE, name, context);
			});
		},

		/**
   * Creates a validator that checks if the received value is an object, and
   * that its contents match the given shape.
   * @param {!Object} shape An object containing validators for each key.
   * @return {!function()}
   */
		shapeOf: function shapeOf(shape) {
			return maybe(function (value, name, context) {
				var result = validators.object(shape, name, context);
				if (isInvalid(result)) {
					return result;
				}

				for (var key in shape) {
					var validator = shape[key];
					var required = false;
					if (validator.config) {
						required = validator.config.required;
						validator = validator.config.validator;
					}
					if (required && !(0, _metal.isDefAndNotNull)(value[key]) || isInvalid(validator(value[key]))) {
						return composeError(ERROR_SHAPE_OF, name, context);
					}
				}
				return true;
			});
		}
	};

	/**
  * Creates a validator that checks against a specific primitive type.
  * @param {string} expectedType Type to check against.
  * @return {!function()} Function that runs the validator if called with
  *     arguments, or just returns it otherwise. This means that when using a
  *     type validator in `State` it may be just passed directly (like
  *     `validators.bool`), or called with no args (like `validators.bool()`).
  *     That's done to allow all validators to be used consistently, since some
  *     (like `arrayOf`) always require that you call the function before
  *     receiving the actual validator. Type validators don't need the call, but
  *     work if it's made anyway.
  */
	function buildTypeValidator(expectedType) {
		var validatorFn = maybe(validateType.bind(null, expectedType));
		return function () {
			if (arguments.length === 0) {
				return validatorFn;
			} else {
				return validatorFn.apply(undefined, arguments);
			}
		};
	}

	/**
  * Composes a warning a warning message.
  * @param {string} error Error message to display to console.
  * @param {?string} name Name of state property that is giving the error.
  * @param {Object} context The property's owner.
  * @return {!Error}
  */
	function composeError(error, name, context) {
		var compName = context ? (0, _metal.getFunctionName)(context.constructor) : null;
		var renderer = context && context.getRenderer && context.getRenderer();
		var parent = renderer && renderer.getParent && renderer.getParent();
		var parentName = parent ? (0, _metal.getFunctionName)(parent.constructor) : null;
		var location = parentName ? 'Check render method of \'' + parentName + '\'.' : '';
		return new Error('Warning: Invalid state passed to \'' + name + '\'. ' + (error + ' Passed to \'' + compName + '\'. ' + location));
	}

	/**
  * Returns the type of the given value.
  * @param {*} value Any value.
  * @return {string} Type of value.
  */
	function getType(value) {
		return Array.isArray(value) ? 'array' : typeof value === 'undefined' ? 'undefined' : _typeof(value);
	}

	/**
  * Checks if the given validator result says that the value is invalid.
  * @param {boolean|!Error} result
  * @return {boolean}
  */
	function isInvalid(result) {
		return result instanceof Error;
	}

	/**
  * Wraps the given validator so that it also accepts null/undefined values.
  *   a validator that checks a value against a single type, null, or
  * undefined.
  * @param {!function()} typeValidator Validator to wrap.
  * @return {!function()} Wrapped validator.
  */
	function maybe(typeValidator) {
		return function (value, name, context) {
			return (0, _metal.isDefAndNotNull)(value) ? typeValidator(value, name, context) : true;
		};
	}

	/**
  * Checks if all the items of the given array pass the given validator.
  * @param {!function()} validator
  * @param {*} value The array to validate items for.
  * @param {string} name The name of the array property being checked.
  * @param {!Object} context Owner of the array property being checked.
  * @return {!Error|boolean} `true` if the type matches, or an error otherwise.
  */
	function validateArrayItems(validator, value, name, context) {
		for (var i = 0; i < value.length; i++) {
			if (isInvalid(validator(value[i], name, context))) {
				return composeError(ERROR_ARRAY_OF_TYPE, name, context);
			}
		}
		return true;
	}

	/**
  * Checks if the given value matches the expected type.
  * @param {string} expectedType String representing the expected type.
  * @param {*} value The value to match the type of.
  * @param {string} name The name of the property being checked.
  * @param {!Object} context Owner of the property being checked.
  * @return {!Error|boolean} `true` if the type matches, or an error otherwise.
  */
	function validateType(expectedType, value, name, context) {
		var type = getType(value);
		if (type !== expectedType) {
			var msg = 'Expected type \'' + expectedType + '\', but received type \'' + type + '\'.';
			return composeError(msg, name, context);
		}
		return true;
	}

	exports.default = validators;
});
//# sourceMappingURL=validators.js.map