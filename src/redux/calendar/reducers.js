import {
	ADD_EVENT_MODAL_OPEN,
	SET_EVENTS_LIST,
	SET_DATA_FOR_ADDING_EVENT,
	DATE_CLICK_DATA,
	CITY_COORDINATES,
	SET_ORGANIZATIONS,
	CLEAR_ORGANIZATIONS,
	CALENDAR_IS_LOADING,
	SET_CONTACTS,
	SET_CONTACT_STATUS,
	SET_TAG_STATUS,
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
} from './constants';

const initialSate = {
	addEventData: {
		city: '',
		organization: '',
		organizationItem: {},
		contact: '',
		tags: '',
		dateStart: new Date(new Date().setHours(0,0,0,0)),
		dateEnd: new Date(new Date().setHours(0,0,0,0)),
		dateRepeat: null,
		periodRepeat: null,
		timeStart: new Date(),
		timeEnd: new Date(),
	},
	periodRepeatData: [
		{id: 0, value: 'daily', name: 'по дням', disabled: false},
		{id: 1, value: 'weekly', name: 'по неделям', disabled: false},
		{id: 2, value: 'monthly', name: 'по месяцам', disabled: false},
		{id: 3, value: 'yearly', name: 'по годам', disabled: false},
	],
	repeatUpdate: false,
	openModal: false,
	listsForAddingEvent: {},
	dataDateClick: {},
	cityCoordinates: {},
	cityStatus: true,
	organizations: [],
	isLoadingCalendar: false,
	addContactStatus: false,
	addTagStatus: false,
	addNewTagsData: {
		text: '',
		color: '#F17013'
	},
	events: []
};

const CalendarReducer = (state = initialSate, action) => {
	switch (action.type) {
		case ADD_EVENT_MODAL_OPEN:
			return {
				...state,
				openModal: !state.openModal
			};
		case SET_DATA_FOR_ADDING_EVENT:
			return {
				...state,
				listsForAddingEvent: action.lists
			};
		case DATE_CLICK_DATA:
			return {
				...state,
				dataDateClick: {...action.data}
			};
		case CITY_COORDINATES:
			return {
				...state,
				cityCoordinates: {...action.data},
				cityStatus: action.status
			};
		case SET_ORGANIZATIONS:
			return {
				...state,
				organizations: [...action.data]
			};
		case CLEAR_ORGANIZATIONS:
			return {
				...state,
				organizations: {}
			};
		case CALENDAR_IS_LOADING:
			return {
				...state,
				isLoadingCalendar: !state.isLoadingCalendar
			};
		case SET_CONTACTS:
			return {
				...state,
				addContactStatus: false,
				listsForAddingEvent: {...state.listsForAddingEvent, contacts: action.contacts},
				addEventData: {
					...state.addEventData,
					contact: {label: action.contacts[0].lastname, value:action.contacts[0].id}
				}
			};
		case SET_CONTACT_STATUS:
			return {
				...state,
				addContactStatus: action.status
			};
		case SET_TAG_STATUS:
			return {
				...state,
				addTagStatus: action.status
			};
		case SET_NEW_TAGS_COLOR:
			return {
				...state,
				addNewTagsData: {...state.addNewTagsData, color: action.color}
			};
		case SET_NEW_TAGS_DATA:
			return {
				...state,
				addTagStatus: false,
				listsForAddingEvent: {...state.listsForAddingEvent, tags: action.data}
			};
		case SET_DATE_START:
			return {
				...state,
				addEventData: {
					...state.addEventData,
					dateStart:action.data[0],
					dateEnd: new Date(action.data[0]) > new Date(state.addEventData.dateEnd) ? action.data[0] : state.addEventData.dateEnd
				}
			};
		case SET_DATE_END:
			return {
				...state,
				addEventData: {...state.addEventData, dateEnd:action.data[0]}
			};
		case SET_DATE_REPEAT:
			return {
				...state,
				addEventData: {...state.addEventData, dateRepeat:action.data[0]}
			};
		case SET_PERIOD_REPEAT:
			return {
				...state,
				addEventData: {...state.addEventData, periodRepeat:action.data}
			};
		case SET_TIME_START:
			return {
				...state,
				addEventData: {...state.addEventData, timeStart:action.data[0]}
			};
		case SET_TIME_END:
			return {
				...state,
				addEventData: {...state.addEventData, timeEnd:action.data[0]}
			};
		case DISABLED_DAILY:
			return {
				...state,
				periodRepeatData: state.periodRepeatData.map(item => {
					if(item.value === 'daily') {
						return {
							...item,
							disabled: action.status
						}
					}
					return item;
				}),
				repeatUpdate: true
			};
		case DISABLED_WEEKLY:
			return {
				...state,
				periodRepeatData: state.periodRepeatData.map(item => {
					if(item.value === 'weekly') {
						return {
							...item,
							disabled: action.status
						}
					}
					return item;
				}),
				repeatUpdate: true
			};
		case CITY_STATUS:
			return {
				...state,
				cityStatus: action.status
			};
		case SET_CITY_NAME:
			return {
				...state,
				addEventData: {...state.addEventData, city: action.data}
			};
		case SET_ORGANIZATION_NAME:
			return {
				...state,
				addEventData: {...state.addEventData, organization: action.data}
			};
		case SET_ORGANIZATION_ITEM:
			return {
				...state,
				addEventData: {...state.addEventData, organizationItem: action.data}
			};
		case SET_REPEAT_UPDATE:
			return {
				...state,
				repeatUpdate: false
			};
		case SET_SELECT_CONTACT:
			return {
				...state,
				addEventData: {
					...state.addEventData,
					contact: {label: action.name, value: action.id}
				}
			};
		case SET_SELECT_TAGS:
			return {
				...state,
				addEventData: {
					...state.addEventData,
					tags: {label: action.name, value: action.id}
				}
			};
		case SET_EVENTS_LIST:
			return {
				...state,
				events: action.data
			};
		default:
			return {
				...state
			}
	}
};

export default CalendarReducer;