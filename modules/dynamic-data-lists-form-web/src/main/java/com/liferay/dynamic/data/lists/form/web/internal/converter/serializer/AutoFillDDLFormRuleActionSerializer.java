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

package com.liferay.dynamic.data.lists.form.web.internal.converter.serializer;

import com.liferay.dynamic.data.lists.form.web.internal.converter.model.action.AutoFillDDLFormRuleAction;
import com.liferay.portal.kernel.util.CharPool;
import com.liferay.portal.kernel.util.MapUtil;
import com.liferay.portal.kernel.util.StringBundler;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;

import java.util.Map;
import java.util.Map.Entry;

/**
 * @author Leonardo Barros
 */
public class AutoFillDDLFormRuleActionSerializer
	implements DDLFormRuleActionSerializer {

	public AutoFillDDLFormRuleActionSerializer(
		AutoFillDDLFormRuleAction autoFillDDLFormRuleAction) {

		_autoFillDDLFormRuleAction = autoFillDDLFormRuleAction;
	}

	@Override
	public String serialize(
		DDLFormRuleSerializerContext ddlFormRuleSerializerContext) {

		return String.format(
			_functionCallTernaryExpressionFormat, "call",
			StringUtil.quote(
				_autoFillDDLFormRuleAction.getDDMDataProviderInstanceUUID()),
			convertAutoFillInputParameters(
				_autoFillDDLFormRuleAction.getInputParametersMapper()),
			convertAutoFillOutputParameters(
				_autoFillDDLFormRuleAction.getOutputParametersMapper()));
	}

	protected String convertAutoFillInputParameters(
		Map<String, String> inputParametersMapper) {

		if (MapUtil.isEmpty(inputParametersMapper)) {
			return StringUtil.quote(StringPool.BLANK);
		}

		StringBundler sb = new StringBundler(
			inputParametersMapper.size() * 4 - 1);

		for (Entry<String, String> inputParameterMapper :
				inputParametersMapper.entrySet()) {

			sb.append(inputParameterMapper.getKey());
			sb.append(CharPool.EQUAL);
			sb.append(inputParameterMapper.getValue());
			sb.append(CharPool.SEMICOLON);
		}

		sb.setIndex(sb.index() - 1);

		return StringUtil.quote(sb.toString());
	}

	protected String convertAutoFillOutputParameters(
		Map<String, String> outputParametersMapper) {

		if (MapUtil.isEmpty(outputParametersMapper)) {
			return StringUtil.quote(StringPool.BLANK);
		}

		StringBundler sb = new StringBundler(
			outputParametersMapper.size() * 4 - 1);

		for (Entry<String, String> outputParameterMapper :
				outputParametersMapper.entrySet()) {

			sb.append(outputParameterMapper.getValue());
			sb.append(CharPool.EQUAL);
			sb.append(outputParameterMapper.getKey());
			sb.append(CharPool.SEMICOLON);
		}

		sb.setIndex(sb.index() - 1);

		return StringUtil.quote(sb.toString());
	}

	private static final String _functionCallTernaryExpressionFormat =
		"%s(%s, %s, %s)";

	private final AutoFillDDLFormRuleAction _autoFillDDLFormRuleAction;

}