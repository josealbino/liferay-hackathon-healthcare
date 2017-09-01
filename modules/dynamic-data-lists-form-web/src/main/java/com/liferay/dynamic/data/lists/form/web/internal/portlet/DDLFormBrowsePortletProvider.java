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

package com.liferay.dynamic.data.lists.form.web.internal.portlet;

import com.liferay.dynamic.data.lists.form.web.constants.DDLFormPortletKeys;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.BasePortletProvider;
import com.liferay.portal.kernel.portlet.BrowsePortletProvider;

import javax.portlet.Portlet;
import javax.portlet.PortletURL;

import javax.servlet.http.HttpServletRequest;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Jürgen Kappler
 */
@Component(
	immediate = true,
	property = {
		"model.class.name=com.liferay.dynamic.data.lists.model.DDLRecordSet",
		"service.ranking:Integer=" + Integer.MAX_VALUE
	},
	service = BrowsePortletProvider.class
)
public class DDLFormBrowsePortletProvider
	extends BasePortletProvider implements BrowsePortletProvider {

	@Override
	public String getPortletName() {
		return DDLFormPortletKeys.DYNAMIC_DATA_LISTS_FORM_BROWSER;
	}

	@Override
	public PortletURL getPortletURL(HttpServletRequest request)
		throws PortalException {

		PortletURL portletURL = super.getPortletURL(request);

		portletURL.setParameter("mvcPath", "/browser/view.jsp");

		return portletURL;
	}

	@Reference(
		target = "(javax.portlet.name=" + DDLFormPortletKeys.DYNAMIC_DATA_LISTS_FORM_BROWSER + ")",
		unbind = "-"
	)
	protected void setPortlet(Portlet portlet) {
	}

	private static final Log _log = LogFactoryUtil.getLog(
		DDLFormBrowsePortletProvider.class);

}