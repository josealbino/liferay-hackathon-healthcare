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

package com.liferay.dynamic.data.lists.form.web.internal.util;

import com.liferay.dynamic.data.mapping.model.DDMForm;
import com.liferay.dynamic.data.mapping.model.DDMFormField;
import com.liferay.dynamic.data.mapping.model.LocalizedValue;
import com.liferay.dynamic.data.mapping.model.UnlocalizedValue;
import com.liferay.dynamic.data.mapping.model.Value;
import com.liferay.dynamic.data.mapping.storage.DDMFormFieldValue;
import com.liferay.dynamic.data.mapping.storage.DDMFormValues;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactory;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.util.LocaleThreadLocal;
import com.liferay.portal.kernel.util.LocaleUtil;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.function.Consumer;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author Marcellus Tavares
 */
@Component(
	immediate = true, service = DDMFormTemplateContextToDDMFormValues.class
)
public class DDMFormTemplateContextToDDMFormValues {

	public DDMFormValues deserialize(
			DDMForm ddmForm, String serializedFormContext)
		throws PortalException {

		JSONObject jsonObject = jsonFactory.createJSONObject(
			serializedFormContext);

		DDMFormValues ddmFormValues = new DDMFormValues(ddmForm);

		Locale defaultLocale = LocaleThreadLocal.getSiteDefaultLocale();

		ddmFormValues.addAvailableLocale(defaultLocale);
		ddmFormValues.setDefaultLocale(defaultLocale);

		setDDMFormValuesDDMFormFieldValues(
			jsonObject.getJSONArray("pages"), ddmFormValues);

		return ddmFormValues;
	}

	protected List<DDMFormFieldValue> getDDMFormFieldValues(
		JSONArray jsonArray, DDMForm ddmForm) {

		List<DDMFormFieldValue> ddmFormFieldValues = new ArrayList<>();

		Map<String, DDMFormField> ddmFormFieldsMap =
			ddmForm.getDDMFormFieldsMap(true);

		DDMFormTemplateContextVisitor ddmFormTemplateContextVisitor =
			new DDMFormTemplateContextVisitor(jsonArray);

		ddmFormTemplateContextVisitor.onVisitField(
			new Consumer<JSONObject>() {

				@Override
				public void accept(JSONObject fieldJSONObject) {
					DDMFormFieldValue ddmFormFieldValue =
						new DDMFormFieldValue();

					String name = fieldJSONObject.getString("fieldName");

					ddmFormFieldValue.setName(name);

					setDDMFormFieldValueValue(
						fieldJSONObject, ddmFormFieldsMap.get(name),
						ddmFormFieldValue);

					ddmFormFieldValues.add(ddmFormFieldValue);
				}

			});

		ddmFormTemplateContextVisitor.visit();

		return ddmFormFieldValues;
	}

	protected Value getLocalizedValue(JSONObject jsonObject) {
		Value value = new LocalizedValue(
			LocaleThreadLocal.getSiteDefaultLocale());

		Iterator<String> itr = jsonObject.keys();

		while (itr.hasNext()) {
			String languageId = itr.next();

			value.addString(
				LocaleUtil.fromLanguageId(languageId),
				jsonObject.getString(languageId));
		}

		return value;
	}

	protected void setDDMFormFieldValueValue(
		JSONObject fieldJSONObject, DDMFormField ddmFormField,
		DDMFormFieldValue ddmFormFieldValue) {

		String type = ddmFormField.getType();

		if (ddmFormField.isLocalizable()) {
			Value value = getLocalizedValue(
				fieldJSONObject.getJSONObject("value"));

			ddmFormFieldValue.setValue(value);
		}
		else if (Objects.equals(type, "checkbox")) {
			ddmFormFieldValue.setValue(
				new UnlocalizedValue(
					String.valueOf(fieldJSONObject.getBoolean("value"))));
		}
		else {
			ddmFormFieldValue.setValue(
				new UnlocalizedValue(fieldJSONObject.getString("value")));
		}
	}

	protected void setDDMFormValuesDDMFormFieldValues(
		JSONArray jsonArray, DDMFormValues ddmFormValues) {

		List<DDMFormFieldValue> ddmFormFieldValues = getDDMFormFieldValues(
			jsonArray, ddmFormValues.getDDMForm());

		ddmFormValues.setDDMFormFieldValues(ddmFormFieldValues);
	}

	@Reference
	protected JSONFactory jsonFactory;

}