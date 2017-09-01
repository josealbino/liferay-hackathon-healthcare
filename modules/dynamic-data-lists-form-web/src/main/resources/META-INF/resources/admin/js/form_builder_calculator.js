AUI.add(
	'liferay-ddl-form-builder-calculator',
	function(A) {
		var CSS_CALCULATOR_ADD_FIELD = A.getClassName('calculator', 'add', 'field', 'button');

		var CSS_CALCULATOR_ADD_FIELD_CONTANIER = A.getClassName('calculator', 'add', 'field', 'button', 'container');

		var CSS_CALCULATOR_ADD_OPERATOR = A.getClassName('calculator', 'add', 'operator', 'button');

		var CSS_CALCULATOR_BUTTON = A.getClassName('calculator', 'button');

		var FormBuilderCalculator = A.Component.create(
			{
				ATTRS: {
					functions: {
						value: []
					},

					options: {
						value: []
					},

					strings: {
						value: {
							addField: Liferay.Language.get('add-field')
						}
					}
				},

				EXTENDS: A.Widget,

				NAME: 'liferay-ddl-form-builder-calculator',

				prototype: {
					renderUI: function() {
						var instance = this;

						var boundingBox = instance.get('boundingBox');

						boundingBox.setHTML(instance._getTemplate());
					},

					bindUI: function() {
						var instance = this;

						var boundingBox = instance.get('boundingBox');

						boundingBox.delegate('click', A.bind(instance._handleButtonClick, instance), '.' + CSS_CALCULATOR_BUTTON);

						boundingBox.one('.' + CSS_CALCULATOR_ADD_FIELD).after('click', A.bind(instance._onAddFieldClick, instance));

						boundingBox.one('.' + CSS_CALCULATOR_ADD_OPERATOR).after('click', A.bind(instance._onAddOperatorClick, instance));
					},

					_afterSelectValueChange: function(event) {
						var instance = this;

						instance.fire(
							'clickedKey',
							{
								key: '[' + event.newVal.join() + ']'
							}
						);
					},

					_createSelectFields: function() {
						var instance = this;

						var buttonContainer = instance.get('boundingBox').one('.' + CSS_CALCULATOR_ADD_FIELD_CONTANIER);

						var select = new Liferay.DDM.Field.Select(
							{
								after: {
									valueChange: A.bind(instance._afterSelectValueChange, instance)
								},
								context: {
									options: instance.get('options')
								},
								triggers: [
									instance.get('boundingBox').one('.' + CSS_CALCULATOR_ADD_FIELD)
								]
							}
						);

						select.render(buttonContainer);

						return select;
					},

					_createSelectFunction: function() {
						var instance = this;

						var operatorsListContainer = instance.get('boundingBox').one('.container-list-advanced-operators');

						var select = new Liferay.DDM.Field.Select(
							{
								after: {
									valueChange: A.bind(instance._afterSelectValueChange, instance)
								},
								context: {
									options: instance.get('advancedOperators')
								},
								triggers: [instance.get('boundingBox').one('.' + CSS_CALCULATOR_ADD_OPERATOR)]
							}
						);

						select.render(operatorsListContainer);

						return select;
					},

					_getSelectFields: function() {
						var instance = this;

						if (!instance._select) {
							instance._select = instance._createSelectFields();
						}

						return instance._select;
					},

					_getSelectFunctions: function() {
						var instance = this;

						if (!instance._selectOperators) {
							instance._selectOperators = instance._createSelectFunction();
						}

						return instance._selectOperators;
					},

					_getTemplate: function() {
						var instance = this;

						var strings = instance.get('strings');

						var calculatorTemplateRenderer = Liferay.DDM.SoyTemplateUtil.getTemplateRenderer('DDLCalculator.render');

						var container = document.createDocumentFragment();

						new calculatorTemplateRenderer(
							{
								calculatorAngleLeft: Liferay.Util.getLexiconIconTpl('angle-left', 'icon-monospaced'),
								calculatorEllipsis: Liferay.Util.getLexiconIconTpl('ellipsis-h', 'icon-monospaced'),
								strings: strings
							},
							container
						);

						return container.firstChild.outerHTML;
					},

					_handleButtonClick: function(event) {
						var instance = this;

						instance.fire(
							'clickedKey',
							{
								key: event.currentTarget.getData('calculator-key')
							}
						);
					},

					_onAddFieldClick: function() {
						var instance = this;

						instance._getSelectFields().toggleList();
					},

					_onAddOperatorClick: function() {
						var instance = this;

						instance._getSelectFunctions().toggleList();
					}
				}
			}
		);

		Liferay.namespace('DDL').FormBuilderCalculator = FormBuilderCalculator;
	},
	'',
	{
		requires: ['aui-component', 'liferay-ddm-form-field-select', 'liferay-ddm-soy-template-util']
	}
);