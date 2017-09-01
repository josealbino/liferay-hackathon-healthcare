/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.dynamic.data.lists.form.web.internal.display.context;

import com.liferay.dynamic.data.lists.model.DDLRecordConstants;
import com.liferay.dynamic.data.lists.model.DDLRecordSet;
import com.liferay.dynamic.data.lists.model.DDLRecordSetSettings;
import com.liferay.dynamic.data.lists.model.DDLRecordVersion;
import com.liferay.dynamic.data.lists.service.DDLRecordSetService;
import com.liferay.dynamic.data.lists.service.DDLRecordVersionLocalService;
import com.liferay.dynamic.data.lists.service.permission.DDLRecordSetPermission;
import com.liferay.dynamic.data.mapping.form.renderer.DDMFormRenderer;
import com.liferay.dynamic.data.mapping.form.renderer.DDMFormRenderingContext;
import com.liferay.dynamic.data.mapping.form.values.factory.DDMFormValuesFactory;
import com.liferay.dynamic.data.mapping.model.DDMForm;
import com.liferay.dynamic.data.mapping.model.DDMFormField;
import com.liferay.dynamic.data.mapping.model.DDMFormLayout;
import com.liferay.dynamic.data.mapping.model.DDMFormLayoutColumn;
import com.liferay.dynamic.data.mapping.model.DDMFormLayoutPage;
import com.liferay.dynamic.data.mapping.model.DDMFormLayoutRow;
import com.liferay.dynamic.data.mapping.model.DDMFormSuccessPageSettings;
import com.liferay.dynamic.data.mapping.model.DDMStructure;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.security.permission.ActionKeys;
import com.liferay.portal.kernel.service.WorkflowDefinitionLinkLocalService;
import com.liferay.portal.kernel.service.permission.PortletPermissionUtil;
import com.liferay.portal.kernel.servlet.SessionMessages;
import com.liferay.portal.kernel.theme.PortletDisplay;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.util.PrefsParamUtil;
import com.liferay.portal.kernel.util.SessionParamUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.kernel.workflow.WorkflowConstants;

import java.util.List;

import javax.portlet.PortletSession;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import javax.portlet.ResourceURL;

/**
 * @author Marcellus Tavares
 */
public class DDLFormDisplayContext {

	public DDLFormDisplayContext(
			RenderRequest renderRequest, RenderResponse renderResponse,
			DDLRecordSetService ddlRecordSetService,
			DDLRecordVersionLocalService ddlRecordVersionLocalService,
			DDMFormRenderer ddmFormRenderer,
			DDMFormValuesFactory ddmFormValuesFactory,
			WorkflowDefinitionLinkLocalService
				workflowDefinitionLinkLocalService)
		throws PortalException {

		_renderRequest = renderRequest;
		_renderResponse = renderResponse;
		_ddlRecordSetService = ddlRecordSetService;
		_ddlRecordVersionLocalService = ddlRecordVersionLocalService;
		_ddmFormRenderer = ddmFormRenderer;
		_ddmFormValuesFactory = ddmFormValuesFactory;
		_workflowDefinitionLinkLocalService =
			workflowDefinitionLinkLocalService;
		_containerId = StringUtil.randomString();

		if (Validator.isNotNull(getPortletResource())) {
			return;
		}

		DDLRecordSet recordSet = getRecordSet();

		if ((recordSet == null) || !hasViewPermission()) {
			renderRequest.setAttribute(
				WebKeys.PORTLET_CONFIGURATOR_VISIBILITY, Boolean.TRUE);
		}
	}

	public String getContainerId() {
		return _containerId;
	}

	public String getDDMFormHTML() throws PortalException {
		DDLRecordSet recordSet = getRecordSet();

		if (recordSet == null) {
			return StringPool.BLANK;
		}

		DDMStructure ddmStructure = recordSet.getDDMStructure();
		boolean requireCaptcha = isCaptchaRequired(recordSet);

		DDMForm ddmForm = getDDMForm(ddmStructure, requireCaptcha);

		DDMFormLayout ddmFormLayout = getDDMFormLayout(
			ddmStructure, requireCaptcha);

		DDMFormRenderingContext ddmFormRenderingContext =
			createDDMFormRenderingContext(ddmForm);

		ddmFormRenderingContext.setGroupId(recordSet.getGroupId());

		DDLRecordVersion ddlRecordVersion =
			_ddlRecordVersionLocalService.fetchLatestRecordVersion(
				getUserId(), getRecordSetId(), getRecordSetVersion(),
				WorkflowConstants.STATUS_DRAFT);

		if (ddlRecordVersion != null) {
			ddmFormRenderingContext.setDDMFormValues(
				ddlRecordVersion.getDDMFormValues());
		}

		boolean showSubmitButton = isShowSubmitButton();

		ddmFormRenderingContext.setShowSubmitButton(showSubmitButton);

		String submitLabel = getSubmitLabel(recordSet);

		ddmFormRenderingContext.setSubmitLabel(submitLabel);

		return _ddmFormRenderer.render(
			ddmForm, ddmFormLayout, ddmFormRenderingContext);
	}

	public DDMFormSuccessPageSettings getDDMFormSuccessPageSettings()
		throws PortalException {

		DDMForm ddmForm = getDDMForm();

		return ddmForm.getDDMFormSuccessPageSettings();
	}

	public DDLRecordSet getRecordSet() {
		if (_recordSet != null) {
			return _recordSet;
		}

		try {
			_recordSet = _ddlRecordSetService.fetchRecordSet(getRecordSetId());
		}
		catch (PortalException pe) {

			// LPS-52675

			if (_log.isDebugEnabled()) {
				_log.debug(pe, pe);
			}

			return null;
		}

		return _recordSet;
	}

	public long getRecordSetId() {
		if (_recordSetId != 0) {
			return _recordSetId;
		}

		_recordSetId = PrefsParamUtil.getLong(
			_renderRequest.getPreferences(), _renderRequest, "recordSetId");

		if (_recordSetId == 0) {
			_recordSetId = getRecordSetIdFromSession();
		}

		return _recordSetId;
	}

	public String getRedirectURL() throws PortalException {
		DDLRecordSet recordSet = getRecordSet();

		if (recordSet == null) {
			return null;
		}

		DDLRecordSetSettings recordSetSettings = recordSet.getSettingsModel();

		return recordSetSettings.redirectURL();
	}

	public boolean isAutosaveEnabled() {
		if (_autosaveEnabled != null) {
			return _autosaveEnabled;
		}

		if (isDefaultUser()) {
			_autosaveEnabled = Boolean.FALSE;
		}
		else {
			_autosaveEnabled = Boolean.TRUE;
		}

		return _autosaveEnabled;
	}

	public boolean isFormAvailable() throws PortalException {
		if (isPreview()) {
			return true;
		}

		if (isSharedURL()) {
			if (isFormPublished() && isFormShared()) {
				return true;
			}

			return false;
		}

		if (getRecordSet() != null) {
			return true;
		}

		return false;
	}

	public boolean isShowConfigurationIcon() throws PortalException {
		if (_showConfigurationIcon != null) {
			return _showConfigurationIcon;
		}

		if (isPreview() || (isSharedURL() && isFormShared())) {
			_showConfigurationIcon = false;

			return _showConfigurationIcon;
		}

		ThemeDisplay themeDisplay = getThemeDisplay();

		_showConfigurationIcon = PortletPermissionUtil.contains(
			themeDisplay.getPermissionChecker(), themeDisplay.getLayout(),
			getPortletId(), ActionKeys.CONFIGURATION);

		return _showConfigurationIcon;
	}

	public boolean isShowSuccessPage() throws PortalException {
		if (SessionMessages.isEmpty(_renderRequest)) {
			return false;
		}

		DDMFormSuccessPageSettings ddmFormSuccessPageSettings =
			getDDMFormSuccessPageSettings();

		return ddmFormSuccessPageSettings.isEnabled();
	}

	protected String createCaptchaResourceURL() {
		ResourceURL resourceURL = _renderResponse.createResourceURL();

		resourceURL.setResourceID("captcha");

		return resourceURL.toString();
	}

	protected DDMFormRenderingContext createDDMFormRenderingContext(
		DDMForm ddmForm) {

		DDMFormRenderingContext ddmFormRenderingContext =
			new DDMFormRenderingContext();

		ddmFormRenderingContext.setContainerId(_containerId);
		ddmFormRenderingContext.setDDMFormValues(
			_ddmFormValuesFactory.create(_renderRequest, ddmForm));
		ddmFormRenderingContext.setHttpServletRequest(
			PortalUtil.getHttpServletRequest(_renderRequest));
		ddmFormRenderingContext.setHttpServletResponse(
			PortalUtil.getHttpServletResponse(_renderResponse));

		ThemeDisplay themeDisplay = getThemeDisplay();

		ddmFormRenderingContext.setLocale(themeDisplay.getLocale());

		ddmFormRenderingContext.setPortletNamespace(
			_renderResponse.getNamespace());

		return ddmFormRenderingContext;
	}

	protected DDMFormLayoutRow createFullColumnDDMFormLayoutRow(
		String ddmFormFieldName) {

		DDMFormLayoutRow ddmFormLayoutRow = new DDMFormLayoutRow();

		DDMFormLayoutColumn ddmFormLayoutColumn = new DDMFormLayoutColumn(
			DDMFormLayoutColumn.FULL, ddmFormFieldName);

		ddmFormLayoutRow.addDDMFormLayoutColumn(ddmFormLayoutColumn);

		return ddmFormLayoutRow;
	}

	protected DDMForm getDDMForm() throws PortalException {
		DDLRecordSet recordSet = getRecordSet();

		DDMStructure ddmStructure = recordSet.getDDMStructure();

		return ddmStructure.getDDMForm();
	}

	protected DDMForm getDDMForm(
		DDMStructure ddmStructure, boolean requireCaptcha) {

		DDMForm ddmForm = ddmStructure.getDDMForm();

		if (requireCaptcha) {
			DDMFormField captchaDDMFormField = new DDMFormField(
				_DDM_FORM_FIELD_NAME_CAPTCHA, "captcha");

			captchaDDMFormField.setDataType("string");
			captchaDDMFormField.setProperty("url", createCaptchaResourceURL());

			ddmForm.addDDMFormField(captchaDDMFormField);
		}

		return ddmForm;
	}

	protected DDMFormLayout getDDMFormLayout(
			DDMStructure ddmStructure, boolean requireCaptcha)
		throws PortalException {

		DDMFormLayout ddmFormLayout = ddmStructure.getDDMFormLayout();

		if (requireCaptcha) {
			DDMFormLayoutPage lastDDMFormLayoutPage = getLastDDMFormLayoutPage(
				ddmFormLayout);

			DDMFormLayoutRow ddmFormLayoutRow =
				createFullColumnDDMFormLayoutRow(_DDM_FORM_FIELD_NAME_CAPTCHA);

			lastDDMFormLayoutPage.addDDMFormLayoutRow(ddmFormLayoutRow);
		}

		return ddmFormLayout;
	}

	protected DDMFormLayoutPage getLastDDMFormLayoutPage(
		DDMFormLayout ddmFormLayout) {

		List<DDMFormLayoutPage> ddmFormLayoutPages =
			ddmFormLayout.getDDMFormLayoutPages();

		return ddmFormLayoutPages.get(ddmFormLayoutPages.size() - 1);
	}

	protected String getPortletId() {
		ThemeDisplay themeDisplay = getThemeDisplay();

		PortletDisplay portletDisplay = themeDisplay.getPortletDisplay();

		return portletDisplay.getId();
	}

	protected String getPortletResource() {
		ThemeDisplay themeDisplay = getThemeDisplay();

		PortletDisplay portletDisplay = themeDisplay.getPortletDisplay();

		return portletDisplay.getPortletResource();
	}

	protected long getRecordSetIdFromSession() {
		PortletSession portletSession = _renderRequest.getPortletSession();

		return GetterUtil.getLong(portletSession.getAttribute("recordSetId"));
	}

	protected String getRecordSetVersion() {
		DDLRecordSet ddlRecordSet = getRecordSet();

		if (ddlRecordSet == null) {
			return DDLRecordConstants.VERSION_DEFAULT;
		}

		return ddlRecordSet.getVersion();
	}

	protected String getSubmitLabel(DDLRecordSet recordSet) {
		ThemeDisplay themeDisplay = getThemeDisplay();

		boolean workflowEnabled = hasWorkflowEnabled(recordSet, themeDisplay);

		if (workflowEnabled) {
			return LanguageUtil.get(
				themeDisplay.getRequest(), "submit-for-publication");
		}
		else {
			return LanguageUtil.get(themeDisplay.getRequest(), "submit");
		}
	}

	protected ThemeDisplay getThemeDisplay() {
		ThemeDisplay themeDisplay = (ThemeDisplay)_renderRequest.getAttribute(
			WebKeys.THEME_DISPLAY);

		return themeDisplay;
	}

	protected User getUser() {
		ThemeDisplay themeDisplay = getThemeDisplay();

		return themeDisplay.getUser();
	}

	protected long getUserId() {
		ThemeDisplay themeDisplay = getThemeDisplay();

		return themeDisplay.getUserId();
	}

	protected boolean hasViewPermission() throws PortalException {
		if (_hasViewPermission != null) {
			return _hasViewPermission;
		}

		_hasViewPermission = true;

		DDLRecordSet recordSet = getRecordSet();

		if (recordSet != null) {
			ThemeDisplay themeDisplay = getThemeDisplay();

			_hasViewPermission = DDLRecordSetPermission.contains(
				themeDisplay.getPermissionChecker(), recordSet,
				ActionKeys.VIEW);
		}

		return _hasViewPermission;
	}

	protected boolean hasWorkflowEnabled(
		DDLRecordSet recordSet, ThemeDisplay themeDisplay) {

		return _workflowDefinitionLinkLocalService.hasWorkflowDefinitionLink(
			themeDisplay.getCompanyId(), recordSet.getGroupId(),
			DDLRecordSet.class.getName(), recordSet.getRecordSetId());
	}

	protected boolean isCaptchaRequired(DDLRecordSet recordSet)
		throws PortalException {

		DDLRecordSetSettings recordSetSettings = recordSet.getSettingsModel();

		return recordSetSettings.requireCaptcha();
	}

	protected boolean isDefaultUser() {
		User user = getUser();

		return user.isDefaultUser();
	}

	protected boolean isFormPublished() throws PortalException {
		DDLRecordSet recordSet = getRecordSet();

		if (recordSet == null) {
			return false;
		}

		DDLRecordSetSettings recordSetSettings = recordSet.getSettingsModel();

		return recordSetSettings.published();
	}

	protected boolean isFormShared() {
		return SessionParamUtil.getBoolean(_renderRequest, "shared");
	}

	protected boolean isPreview() {
		return ParamUtil.getBoolean(_renderRequest, "preview");
	}

	protected boolean isSharedURL() {
		ThemeDisplay themeDisplay = getThemeDisplay();

		String urlCurrent = themeDisplay.getURLCurrent();

		return urlCurrent.contains("/shared");
	}

	protected boolean isShowSubmitButton() {
		boolean preview = ParamUtil.getBoolean(_renderRequest, "preview");

		if (preview) {
			return false;
		}

		return true;
	}

	private static final String _DDM_FORM_FIELD_NAME_CAPTCHA = "_CAPTCHA_";

	private static final Log _log = LogFactoryUtil.getLog(
		DDLFormDisplayContext.class);

	private Boolean _autosaveEnabled;
	private final String _containerId;
	private final DDLRecordSetService _ddlRecordSetService;
	private final DDLRecordVersionLocalService _ddlRecordVersionLocalService;
	private final DDMFormRenderer _ddmFormRenderer;
	private final DDMFormValuesFactory _ddmFormValuesFactory;
	private Boolean _hasViewPermission;
	private DDLRecordSet _recordSet;
	private long _recordSetId;
	private final RenderRequest _renderRequest;
	private final RenderResponse _renderResponse;
	private Boolean _showConfigurationIcon;
	private final WorkflowDefinitionLinkLocalService
		_workflowDefinitionLinkLocalService;

}