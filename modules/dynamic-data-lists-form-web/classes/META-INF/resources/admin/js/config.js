;(function() {
	var LiferayAUI = Liferay.AUI;

	AUI().applyConfig(
		{
			groups: {
				ddl: {
					base: MODULE_PATH + '/admin/js/',
					combine: Liferay.AUI.getCombine(),
					filter: LiferayAUI.getFilterConfig(),
					modules: {
						'liferay-ddl-form-builder': {
							path: 'form_builder.js',
							requires: [
								'aui-form-builder',
								'aui-form-builder-pages',
								'liferay-ddl-form-builder-confirmation-dialog',
								'liferay-ddl-form-builder-field-list',
								'liferay-ddl-form-builder-field-options-toolbar',
								'liferay-ddl-form-builder-field-settings-sidebar',
								'liferay-ddl-form-builder-field-support',
								'liferay-ddl-form-builder-field-types-modal',
								'liferay-ddl-form-builder-layout-builder-support',
								'liferay-ddl-form-builder-layout-deserializer',
								'liferay-ddl-form-builder-layout-visitor',
								'liferay-ddl-form-builder-pages-manager',
								'liferay-ddl-form-builder-rule',
								'liferay-ddl-form-builder-rule-builder',
								'liferay-ddl-form-builder-util',
								'liferay-ddm-form-field-types',
								'liferay-ddm-form-renderer'
							]
						},
						'liferay-ddl-form-builder-action': {
							path: 'form_builder_action.js',
							requires: ['liferay-ddl-form-builder-action-template', 'liferay-ddm-form-renderer-field']
						},
						'liferay-ddl-form-builder-action-autofill': {
							path: 'form_builder_action_autofill.js',
							requires: [
								'aui-component',
								'aui-io-request',
								'liferay-ddl-form-builder-action',
								'liferay-ddl-form-builder-data-provider-parameter-template'
							]
						},
						'liferay-ddl-form-builder-action-calculate': {
							path: 'form_builder_action_calculate.js',
							requires: [
								'liferay-ddl-form-builder-action',
								'liferay-ddl-form-builder-calculate-template',
								'liferay-ddl-form-builder-calculator'
							]
						},
						'liferay-ddl-form-builder-action-factory': {
							path: 'form_builder_action_factory.js',
							requires: [
								'liferay-ddl-form-builder-action-autofill',
								'liferay-ddl-form-builder-action-calculate',
								'liferay-ddl-form-builder-action-jump-to-page',
								'liferay-ddl-form-builder-action-property'
							]
						},
						'liferay-ddl-form-builder-action-jump-to-page': {
							path: 'form_builder_action_jump_to_page.js',
							requires: ['liferay-ddl-form-builder-action']
						},
						'liferay-ddl-form-builder-action-property': {
							path: 'form_builder_action_property.js',
							requires: ['liferay-ddl-form-builder-action']
						},
						'liferay-ddl-form-builder-autocomplete-template': {
							path: '../templates/autocomplete.js'
						},
						'liferay-ddl-form-builder-calculate-template': {
							path: '../templates/calculate.js'
						},
						'liferay-ddl-form-builder-calculator': {
							path: 'form_builder_calculator.js',
							requires: [
								'liferay-ddl-form-builder-calculator-template',
								'liferay-ddm-form-field-select'
							]
						},
						'liferay-ddl-form-builder-calculator-template': {
							path: '../templates/calculator.js'
						},
						'liferay-ddl-form-builder-confirmation-dialog': {
							path: 'form_builder_confirmation_dialog.js',
							requires: []
						},
						'liferay-ddl-form-builder-copy-publish-form-url-popover': {
							path: 'form_builder_copy_publish_form_url_popover.js',
							requires: [
								'aui-popover'
							]
						},
						'liferay-ddl-form-builder-data-provider-parameter-template': {
							path: '../templates/data-provider-parameter.js'
						},
						'liferay-ddl-form-builder-definition-serializer': {
							path: 'form_definition_serializer.js',
							requires: [
								'json',
								'liferay-ddl-form-builder-layout-visitor'
							]
						},
						'liferay-ddl-form-builder-field-list': {
							path: 'form_builder_field_list.js',
							requires: [
								'aui-form-builder-field-list'
							]
						},
						'liferay-ddl-form-builder-field-options-toolbar': {
							path: 'form_builder_field_options_toolbar.js',
							requires: ['liferay-ddl-form-builder-field-options-toolbar-template']
						},
						'liferay-ddl-form-builder-field-options-toolbar-template': {
							path: '../templates/field-options-toolbar.js'
						},
						'liferay-ddl-form-builder-field-settings-form': {
							path: 'form_builder_field_settings_form.js',
							requires: [
								'liferay-ddl-form-builder-autocomplete-template',
								'liferay-ddm-form-renderer',
								'liferay-ddm-soy-template-util',
								'liferay-form'
							]
						},
						'liferay-ddl-form-builder-field-settings-sidebar': {
							path: 'form_builder_field_settings_sidebar.js',
							requires: ['aui-tabview', 'liferay-ddl-form-builder-sidebar', 'liferay-ddm-form-renderer-types']
						},
						'liferay-ddl-form-builder-field-support': {
							path: 'form_builder_field_support.js',
							requires: [
								'liferay-ddl-form-builder-field-settings-form',
								'liferay-ddl-form-builder-settings-retriever'
							]
						},
						'liferay-ddl-form-builder-field-types-modal': {
							path: 'form_builder_field_types_modal.js',
							requires: [
								'aui-form-builder-field-types-modal',
								'liferay-ddl-form-builder-modal-support'
							]
						},
						'liferay-ddl-form-builder-layout-builder-support': {
							path: 'form_builder_layout_builder_support.js',
							requires: []
						},
						'liferay-ddl-form-builder-layout-deserializer': {
							path: 'form_layout_deserializer.js',
							requires: [
								'aui-form-builder-field-list',
								'aui-layout',
								'liferay-ddl-form-builder-field-support',
								'liferay-ddm-form-field-types'
							]
						},
						'liferay-ddl-form-builder-layout-serializer': {
							path: 'form_layout_serializer.js',
							requires: [
								'json',
								'liferay-ddl-form-builder-layout-visitor'
							]
						},
						'liferay-ddl-form-builder-layout-visitor': {
							path: 'form_layout_visitor.js',
							requires: [
								'aui-form-builder-field-list',
								'aui-layout'
							]
						},
						'liferay-ddl-form-builder-modal-support': {
							path: 'form_builder_modal_support.js',
							requires: [
								'aui-modal'
							]
						},
						'liferay-ddl-form-builder-pages-manager': {
							path: 'form_builder_pages_manager.js',
							requires: [
								'aui-form-builder-page-manager',
								'liferay-ddl-form-builder-pagination',
								'liferay-ddl-form-builder-wizard'
							]
						},
						'liferay-ddl-form-builder-pagination': {
							path: 'form_builder_pagination.js',
							requires: [
								'aui-pagination'
							]
						},
						'liferay-ddl-form-builder-render-rule': {
							path: 'form_builder_render_rule.js',
							requires: ['liferay-ddl-form-builder-action-factory', 'liferay-ddl-form-builder-rule-template', 'liferay-ddl-form-builder-rule-validator', 'liferay-ddm-form-renderer-field']
						},
						'liferay-ddl-form-builder-render-rule-condition': {
							path: 'form_builder_render_rule_condition.js',
							requires: [
								'liferay-ddm-form-renderer-field'
							]
						},
						'liferay-ddl-form-builder-rule-builder': {
							path: 'form_builder_rule_builder.js',
							requires: [
								'liferay-ddl-form-builder-render-rule',
								'liferay-ddl-form-builder-render-rule-condition',
								'liferay-ddl-form-builder-rule-builder-template'
							]
						},
						'liferay-ddl-form-builder-rule-builder-template': {
							path: '../templates/rule-builder.js'
						},
						'liferay-ddl-form-builder-rule-template': {
							path: '../templates/rule.js'
						},
						'liferay-ddl-form-builder-rule-validator': {
							path: 'form_builder_rule_validator.js',
							requires: []
						},
						'liferay-ddl-form-builder-settings-retriever': {
							path: 'form_builder_settings_retriever.js',
							requires: [
								'aui-request'
							]
						},
						'liferay-ddl-form-builder-sidebar': {
							path: 'form_builder_sidebar.js',
							requires: ['aui-tabview', 'liferay-ddl-form-builder-field-options-toolbar', 'liferay-ddl-form-builder-sidebar-template']
						},
						'liferay-ddl-form-builder-sidebar-template': {
							path: '../templates/sidebar.js'
						},
						'liferay-ddl-form-builder-util': {
							path: 'form_builder_util.js',
							requires: [
								'liferay-ddl-form-builder-field-support',
								'liferay-ddm-form-renderer-util'
							]
						},
						'liferay-ddl-form-builder-wizard': {
							path: 'form_builder_wizard.js',
							requires: [
								'liferay-ddm-form-renderer-wizard'
							]
						},
						'liferay-ddl-portlet': {
							path: 'form_portlet.js',
							requires: [
								'liferay-ddl-form-builder',
								'liferay-ddl-form-builder-definition-serializer',
								'liferay-ddl-form-builder-layout-serializer',
								'liferay-ddl-form-builder-rule-builder',
								'liferay-portlet-base',
								'liferay-util-window'
							]
						}
					},
					root: MODULE_PATH + '/admin/js/'
				}
			}
		}
	);
})();