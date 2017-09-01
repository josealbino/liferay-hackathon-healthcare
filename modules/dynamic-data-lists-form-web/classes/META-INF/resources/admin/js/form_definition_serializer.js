AUI.add(
	'liferay-ddl-form-builder-definition-serializer',
	function(A) {
		var DefinitionSerializer = A.Component.create(
			{
				ATTRS: {
					availableLanguageIds: {
						value: [
							themeDisplay.getDefaultLanguageId()
						]
					},

					defaultLanguageId: {
						value: themeDisplay.getDefaultLanguageId()
					},

					fieldHandler: {
						valueFn: '_valueFieldHandler'
					},

					fields: {
						validator: Array.isArray,
						value: []
					},

					fieldTypesDefinitions: {
						value: {}
					},

					successPage: {
						value: {}
					}
				},

				EXTENDS: Liferay.DDL.LayoutVisitor,

				NAME: 'liferay-ddl-form-builder-definition-serializer',

				prototype: {
					serialize: function() {
						var instance = this;

						instance.visit();

						var definition = A.JSON.stringify(
							{
								availableLanguageIds: instance.get('availableLanguageIds'),
								defaultLanguageId: instance.get('defaultLanguageId'),
								fields: instance.get('fields'),
								successPage: instance.get('successPage')
							}
						);

						instance.set('fields', []);

						return definition;
					},

					_serializeField: function(field) {
						var instance = this;

						var config = {};

						var fieldTypesDefinitions = instance.get('fieldTypesDefinitions');

						var definitionFields = fieldTypesDefinitions[field.get('type')];

						var languageId = instance.get('defaultLanguageId');

						definitionFields.forEach(
							function(fieldSetting) {
								var name = fieldSetting.name;
								var type = fieldSetting.type;

								var value = field.get(name);

								if (name === 'name') {
									config[name] = field.get('fieldName');
								}
								else if (type === 'options' && value) {
									config[name] = value.slice().map(
										function(option) {
											var label = {};

											label[languageId] = option.label;

											return {
												label: label,
												value: option.value
											};
										}
									);
								}
								else if (fieldSetting.localizable) {
									config[name] = {};

									config[name][languageId] = value;
								}
								else {
									config[name] = value;
								}
							}
						);

						instance.get('fields').push(
							A.merge(
								config,
								{
									dataType: field.get('dataType'),
									readOnly: false,
									type: field.get('type')
								}
							)
						);
					},

					_valueFieldHandler: function() {
						var instance = this;

						return instance._serializeField;
					}
				}
			}
		);

		Liferay.namespace('DDL').DefinitionSerializer = DefinitionSerializer;
	},
	'',
	{
		requires: ['json', 'liferay-ddl-form-builder-layout-visitor', 'liferay-ddm-form-field-types']
	}
);