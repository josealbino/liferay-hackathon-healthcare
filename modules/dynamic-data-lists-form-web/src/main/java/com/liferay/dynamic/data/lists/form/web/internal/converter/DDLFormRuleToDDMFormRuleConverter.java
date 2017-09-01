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

package com.liferay.dynamic.data.lists.form.web.internal.converter;

import com.liferay.dynamic.data.lists.form.web.internal.converter.model.DDLFormRule;
import com.liferay.dynamic.data.lists.form.web.internal.converter.model.DDLFormRuleAction;
import com.liferay.dynamic.data.lists.form.web.internal.converter.model.DDLFormRuleCondition;
import com.liferay.dynamic.data.lists.form.web.internal.converter.serializer.DDLFormRuleSerializerContext;
import com.liferay.dynamic.data.mapping.model.DDMFormRule;
import com.liferay.portal.kernel.util.StringBundler;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.osgi.service.component.annotations.Component;

/**
 * @author Leonardo Barros
 * @author Marcellus Tavares
 */
@Component(immediate = true, service = DDLFormRuleToDDMFormRuleConverter.class)
public class DDLFormRuleToDDMFormRuleConverter {

	public List<DDMFormRule> convert(
		List<DDLFormRule> ddlFormRules,
		DDLFormRuleSerializerContext ddlFormRuleSerializerContext) {

		List<DDMFormRule> ddmFormRules = new ArrayList<>();

		for (DDLFormRule ddlFormRule : ddlFormRules) {
			ddmFormRules.add(
				convertRule(ddlFormRule, ddlFormRuleSerializerContext));
		}

		return ddmFormRules;
	}

	protected String convertCondition(
		DDLFormRuleCondition ddlFormRuleCondition) {

		String operator = ddlFormRuleCondition.getOperator();

		String functionName = _operatorFunctionNameMap.get(operator);

		List<DDLFormRuleCondition.Operand> operands =
			ddlFormRuleCondition.getOperands();

		if (functionName == null) {
			return String.format(
				_comparisonExpressionFormat, convertOperand(operands.get(0)),
				_operatorMap.get(operator), convertOperand(operands.get(1)));
		}

		String condition = createCondition(functionName, operands);

		if (operator.startsWith("not")) {
			return String.format(_notExpressionFormat, condition);
		}

		return condition;
	}

	protected String convertConditions(
		String logicalOperator,
		List<DDLFormRuleCondition> ddlFormRuleConditions) {

		if (ddlFormRuleConditions.size() == 1) {
			return convertCondition(ddlFormRuleConditions.get(0));
		}

		StringBundler sb = new StringBundler(ddlFormRuleConditions.size() * 4);

		for (DDLFormRuleCondition ddlFormRuleCondition :
				ddlFormRuleConditions) {

			sb.append(convertCondition(ddlFormRuleCondition));
			sb.append(StringPool.SPACE);
			sb.append(logicalOperator);
			sb.append(StringPool.SPACE);
		}

		sb.setIndex(sb.index() - 3);

		return sb.toString();
	}

	protected String convertOperand(DDLFormRuleCondition.Operand operand) {
		if (Objects.equals("field", operand.getType())) {
			return String.format(
				_functionCallUnaryExpressionFormat, "getValue",
				StringUtil.quote(operand.getValue()));
		}

		String value = operand.getValue();

		if (isNumericConstant(operand.getType())) {
			return value;
		}

		String[] values = StringUtil.split(value);

		UnaryOperator<String> quoteOperation = StringUtil::quote;
		UnaryOperator<String> trimOperation = StringUtil::trim;

		Stream<String> valuesStream = Stream.of(values);

		Stream<String> valueStream = valuesStream.map(
			trimOperation.andThen(quoteOperation));

		return valueStream.collect(
			Collectors.joining(StringPool.COMMA_AND_SPACE));
	}

	protected String convertOperands(
		List<DDLFormRuleCondition.Operand> operands) {

		StringBundler sb = new StringBundler(operands.size());

		for (DDLFormRuleCondition.Operand operand : operands) {
			sb.append(convertOperand(operand));
			sb.append(StringPool.COMMA_AND_SPACE);
		}

		sb.setIndex(sb.index() - 1);

		return sb.toString();
	}

	protected DDMFormRule convertRule(
		DDLFormRule ddlFormRule,
		DDLFormRuleSerializerContext ddlFormRuleSerializerContext) {

		String condition = convertConditions(
			ddlFormRule.getLogicalOperator(),
			ddlFormRule.getDDLFormRuleConditions());

		List<String> actions = new ArrayList<>();

		for (DDLFormRuleAction ddlFormRuleAction :
				ddlFormRule.getDDLFormRuleActions()) {

			actions.add(
				ddlFormRuleAction.serialize(ddlFormRuleSerializerContext));
		}

		return new DDMFormRule(condition, actions);
	}

	protected String createCondition(
		String functionName, List<DDLFormRuleCondition.Operand> operands) {

		if (Objects.equals(functionName, "belongsTo")) {
			operands.remove(0);
		}

		return String.format(
			_functionCallUnaryExpressionFormat, functionName,
			convertOperands(operands));
	}

	protected boolean isNumericConstant(String operandType) {
		if (operandType.equals("integer") || operandType.equals("double")) {
			return true;
		}

		return false;
	}

	private static final String _comparisonExpressionFormat = "%s %s %s";
	private static final String _functionCallUnaryExpressionFormat = "%s(%s)";
	private static final String _notExpressionFormat = "not(%s)";
	private static final Map<String, String> _operatorFunctionNameMap =
		new HashMap<>();
	private static final Map<String, String> _operatorMap = new HashMap<>();

	static {
		_operatorFunctionNameMap.put("belongs-to", "belongsTo");
		_operatorFunctionNameMap.put("contains", "contains");
		_operatorFunctionNameMap.put("equals-to", "equals");
		_operatorFunctionNameMap.put("is-empty", "isEmpty");
		_operatorFunctionNameMap.put("not-contains", "contains");
		_operatorFunctionNameMap.put("not-equals-to", "equals");
		_operatorFunctionNameMap.put("not-is-empty", "isEmpty");

		_operatorMap.put("greater-than", ">");
		_operatorMap.put("greater-than-equals", ">=");
		_operatorMap.put("less-than", "<");
		_operatorMap.put("less-than-equals", "<=");
	}

}