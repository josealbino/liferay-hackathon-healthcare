package com.liferay.hackathon.healthcare.modellistener;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.liferay.calendar.model.Calendar;
import com.liferay.calendar.model.CalendarBooking;
import com.liferay.calendar.model.CalendarBookingConstants;
import com.liferay.calendar.model.CalendarResource;
import com.liferay.calendar.service.CalendarBookingLocalServiceUtil;
import com.liferay.calendar.service.CalendarResourceLocalService;
import com.liferay.dynamic.data.lists.model.DDLRecord;
import com.liferay.dynamic.data.mapping.storage.DDMFormFieldValue;
import com.liferay.portal.kernel.exception.ModelListenerException;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.model.BaseModelListener;
import com.liferay.portal.kernel.model.ModelListener;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.ServiceContextFactory;
import com.liferay.portal.kernel.service.ServiceContextThreadLocal;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.util.CalendarFactoryUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.LocalizationUtil;
import com.liferay.portal.kernel.util.PortalUtil;
import com.liferay.portal.kernel.util.Time;

/**
 * @author albinoneto
 */
@Component(immediate = true, service = ModelListener.class)
public class HackathonHealthcareModelListener extends BaseModelListener<DDLRecord> {
	
	private static final Log _log = LogFactoryUtil.getLog(HackathonHealthcareModelListener.class);

	@Override
	public void onAfterAddAssociation(Object classPK, String associationClassName, Object associationClassPK)
			throws ModelListenerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onAfterCreate(DDLRecord model) throws ModelListenerException {
		 try {
			List<DDMFormFieldValue> ddmFormFieldValues = model.getDDMFormFieldValues("Data");
			
			for (DDMFormFieldValue ddmFormFieldValue : ddmFormFieldValues) {
				_log.error(ddmFormFieldValue.getName() + " " + ddmFormFieldValue.getValue());
			}
			
			String date = ddmFormFieldValues.get(0).getValue().getValues().values().iterator().next();
			String[] parts = date.split("-");
			
			long userId = model.getUserId();
			User user = userLocalService.fetchUser(userId);
			CalendarResource cr = calendarRLS.fetchCalendarResource(PortalUtil.getClassNameId(User.class), user.getUserId());
			Calendar defaultCalendar = cr.getDefaultCalendar();
			
			java.util.Calendar jCAlendar = CalendarFactoryUtil.getCalendar(
					Integer.parseInt(parts[0]) , Integer.parseInt(parts[1])-1, Integer.parseInt(parts[2]), 12, 0);
			
			HashMap<Locale, String> title = new HashMap<Locale, String>();
			title.put(LocaleUtil.getDefault(), "Agendamento"); // TODO pegar infor
			ServiceContext servicecontext = ServiceContextThreadLocal.getServiceContext();
			CalendarBooking addCalendarBooking = CalendarBookingLocalServiceUtil.addCalendarBooking(
					userId, defaultCalendar.getCalendarId(),
					new long[0], 
					CalendarBookingConstants.PARENT_CALENDAR_BOOKING_ID_DEFAULT,
					title, title, null, jCAlendar.getTimeInMillis(), jCAlendar.getTimeInMillis()+Time.HOUR, false, null,
					2*Time.MINUTE, "email", 1*Time.MINUTE, "email", servicecontext);
			addCalendarBooking.getAllDay();
			
		} catch (PortalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
			_log.error(" ¯\\_(ツ)_/¯");
		}

	}
	
	private UserLocalService userLocalService;
	
	@Reference
	public void setU(UserLocalService u) {
		userLocalService = u;
	}

	CalendarResourceLocalService calendarRLS;
	@Reference
	public void setCalendarRLS(CalendarResourceLocalService calendarRLS) {
		this.calendarRLS = calendarRLS;
	}
	
	@Override
	public void onAfterRemove(DDLRecord model) throws ModelListenerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onAfterRemoveAssociation(Object classPK, String associationClassName, Object associationClassPK)
			throws ModelListenerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onAfterUpdate(DDLRecord model) throws ModelListenerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onBeforeAddAssociation(Object classPK, String associationClassName, Object associationClassPK)
			throws ModelListenerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onBeforeCreate(DDLRecord model) throws ModelListenerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onBeforeRemove(DDLRecord model) throws ModelListenerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onBeforeRemoveAssociation(Object classPK, String associationClassName, Object associationClassPK)
			throws ModelListenerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void onBeforeUpdate(DDLRecord model) throws ModelListenerException {
		// TODO Auto-generated method stub

	}

	// TODO enter required service methods

}