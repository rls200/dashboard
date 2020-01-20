import {
	ADD_EVENT_MODAL_OPEN,
	ADD_EVENT,
	GET_DATA_FOR_ADDING_EVENT,
	SET_DATA_FOR_ADDING_EVENT,
	GET_CITIES,
	DATE_CLICK_DATA,
	CITY_COORDINATES,
	GET_ORGANIZATION,
	SET_ORGANIZATIONS,
	CLEAR_ORGANIZATIONS,
	CALENDAR_IS_LOADING,
	ADD_CONTACTS,
	SET_CONTACTS,
	SET_CONTACT_STATUS,
	SET_TAG_STATUS,
	ADD_TAG,
	SET_NEW_TAGS_COLOR,
	SET_NEW_TAGS_DATA,
	SET_DATE_START,
	SET_DATE_END,
	SET_DATE_REPEAT,
	SET_TIME_START,
	SET_TIME_END,
	SET_PERIOD_REPEAT,
	DISABLED_DAILY,
	DISABLED_WEEKLY,
	CITY_STATUS,
	SET_CITY_NAME,
	SET_ORGANIZATION_NAME,
	SET_REPEAT_UPDATE,
	SET_ORGANIZATION_ITEM,
	SET_SELECT_CONTACT,
	SET_SELECT_TAGS,
	GET_EVENTS,
	SET_EVENTS_LIST,
} from './constants';

export const getDataForAddingEvent = () => ({
	type: GET_DATA_FOR_ADDING_EVENT,
});
export const setDataForAddingEvent = lists => ({
	type: SET_DATA_FOR_ADDING_EVENT,
	lists
});
export const addEventModalOpen = () => ({
	type: ADD_EVENT_MODAL_OPEN
});
export const addEvent = (data) => ({
	type: ADD_EVENT,
	payload: data,
});
export const getCities = (ymaps, value) => ({
	type: GET_CITIES,
	payload: { ymaps, value }
});
export const addDataDateClick = data => ({
	type: DATE_CLICK_DATA,
	data
});
export const addCityCoordinates = (data, status) => ({
	type: CITY_COORDINATES,
	data,
	status
});
export const getOrganization = (input, coordinates, boundedBy) => ({
	type: GET_ORGANIZATION,
	payload: { input, coordinates, boundedBy }
});
export const setOrganizationData = data => ({
	type: SET_ORGANIZATIONS,
	data
});
export const clearOrganizationData = () => ({
	type: CLEAR_ORGANIZATIONS
});
export const calendarIsLoading = () => ({
	type: CALENDAR_IS_LOADING,
});
export const addContacts = (firstname, phone, email, lastname, place, notes) => ({
	type: ADD_CONTACTS,
	payload: { firstname, phone, email, lastname, place, notes },
});
export const setContacts = contacts => ({
	type: SET_CONTACTS,
	contacts
});
export const setContactStatus = status => ({
	type: SET_CONTACT_STATUS,
	status
});
export const setTagStatus = status => ({
	type: SET_TAG_STATUS,
	status
});
export const addTag = (name, color) => ({
	type: ADD_TAG,
	payload: {name, color}
});
export const setNewTagsColor = color => ({
	type: SET_NEW_TAGS_COLOR,
	color
});
export const setNewTagsData = data => ({
	type: SET_NEW_TAGS_DATA,
	data
});
export const setDateStart = data => ({
	type: SET_DATE_START,
	data
});
export const setDateEnd = (data) => ({
	type: SET_DATE_END,
	data
});
export const setDateRepeat = data => ({
	type: SET_DATE_REPEAT,
	data
});
export const setTimeStart = data => ({
	type: SET_TIME_START,
	data
});
export const setTimeEnd = data => ({
	type: SET_TIME_END,
	data
});
export const setPeriodRepeat = data => ({
	type: SET_PERIOD_REPEAT,
	data
});
export const setDisabledDaily = status => ({
	type: DISABLED_DAILY,
	status
});
export const setDisabledWeekly = status => ({
	type: DISABLED_WEEKLY,
	status
});
export const setCityStatus = status => ({
	type: CITY_STATUS,
	status
});
export const setCityName = data => ({
	type: SET_CITY_NAME,
	data
});
export const setOraganizationName = data => ({
	type: SET_ORGANIZATION_NAME,
	data
});
export const setRepeatUpdate = () => ({
	type: SET_REPEAT_UPDATE,
});
export const setOrganizationItem = data => ({
	type: SET_ORGANIZATION_ITEM,
	data
});
export const setSelectContact = (id, name) => ({
	type: SET_SELECT_CONTACT,
	id,
	name
});
export const setSelectTags = (id, name) => ({
	type: SET_SELECT_TAGS,
	id,
	name
});
export const getEventsList = () => ({
	type: GET_EVENTS
});
export const setEventsList = data => ({
	type: SET_EVENTS_LIST,
	data
});

