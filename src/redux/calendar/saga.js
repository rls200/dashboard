import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchJSON, fetchYandexAPI } from '../../helpers/api';

import {
	setDataForAddingEvent,
	addCityCoordinates,
	setOrganizationData,
	calendarIsLoading,
	setContacts,
	setNewTagsData,
	setEventsList,
	addEventModalOpen
} from './action';
import {
	GET_DATA_FOR_ADDING_EVENT,
	GET_CITIES,
	GET_ORGANIZATION,
	ADD_CONTACTS, ADD_TAG,
	ADD_EVENT,
	GET_EVENTS
} from './constants';
import {fetchProjectsError, setProjectStatus} from '../projects/actions'
import { apiOptions } from '../../helpers/authUtils';
import { refreshToken } from '../auth/saga';


const API_KEY_SEARCH_YANDEX = '49c6204f-1bc7-4b89-a192-72c691cfefba';
/**
 * Get data for adding event
 */

function* getDataListForAddingEvent() {
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		const response = yield call(
			fetchJSON, 'events/lists',
			apiOptions('get')
		);
		if (response.error === null) {
			yield put(setDataForAddingEvent(response.data));
		} else {
			yield put(fetchProjectsError(response.error));
		}

	} catch (error) {
		let message;
		switch (error.status) {
			case 500:
				message = 'Internal Server Error';
				break;
			case 401:
				message = 'Invalid credentials';
				break;
			default:
				message = error;
		}
		yield put(fetchProjectsError(message));
	}
}
/**
 * Get city coordinates
 */

function* getCityCoordinates({ payload: { ymaps, value } }) {
	let coords = '';
	let bounds = '';
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		const firstGeoObject = yield call(
			() => ymaps.geocode(value).then((res) => res.geoObjects.get(0))
		);
		if (firstGeoObject) {
			coords = firstGeoObject.geometry.getCoordinates();
			bounds = firstGeoObject.properties.get('boundedBy');
			yield put(addCityCoordinates({
				name: value,
				coordinates: coords,
				boundedBy: bounds
			}, false))
		} else {
			yield put(fetchProjectsError('Не удалось получить координаты'));
		}
	} catch (error) {
		let message;
		switch (error.status) {
			case 500:
				message = 'Internal Server Error';
				break;
			case 401:
				message = 'Invalid credentials';
				break;
			default:
				message = error;
		}
		yield put(fetchProjectsError(message));
	}
}
/**
 * GET_ORGANIZATION
 */

function* getOrganization({ payload: { input, coordinates, boundedBy } }) {
	const boundOne = Math.abs(boundedBy[0][1] - boundedBy[0][0]);
	const boundTwo = Math.abs(boundedBy[1][1] - boundedBy[1][0]);
	const coordinatesLL = `${coordinates[1]},${coordinates[0]}`;
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		const response = yield call(
			fetchYandexAPI, `?text=${input}&rspn=1&ll=${coordinatesLL}&spn=${boundOne}, ${boundTwo}&lang=ru_RU&apikey=${API_KEY_SEARCH_YANDEX}`
		);
		if (!response.error) {
			yield put(setOrganizationData(response.data.features))
		} else {
			yield put(fetchProjectsError({message:response.error}));
		}

	} catch (error) {
		let message;
		switch (error.status) {
			case 500:
				message = 'Internal Server Error';
				break;
			case 401:
				message = 'Invalid credentials';
				break;
			case 403:
				message = 'Invalid key';
				break;
			default:
				message = error;
		}
		yield put(fetchProjectsError(message));
	}
}


/**
 * Add contact
 */
function* addContact({ payload: { firstname, phone, email, lastname, place, notes } }) {
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		yield put(calendarIsLoading());
		const response = yield call(
			fetchJSON, 'contacts',
			apiOptions('POST', JSON.stringify({ firstname, phone, email, lastname, place, notes }))
		);
		if (response.error === null) {
			yield put(setContacts(response.data.contacts));
			yield put(setProjectStatus(true, 'Контакт успешно добавлен!'));
		} else {
			yield put(fetchProjectsError(response.error));
		}
		yield put(calendarIsLoading());
	} catch (error) {
		let message;
		switch (error.status) {
			case 500:
				message = 'Internal Server Error';
				break;
			case 401:
				message = 'Invalid credentials';
				break;
			default:
				message = error;
		}
		yield put(fetchProjectsError(message));
	}
}

/**
 * Add tags
 */
function* addTags({ payload: { name, color } }) {
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		yield put(calendarIsLoading());
		const response = yield call(
			fetchJSON, 'tags',
			apiOptions('POST', JSON.stringify({ name, color: color }))
		);
		if (response.error === null) {
			yield put(setNewTagsData(response.data.tags));
			yield put(setProjectStatus(true, 'Тег успешно добавлен!'));
		} else {
			yield put(fetchProjectsError(response.error));
		}
		yield put(calendarIsLoading());
	} catch (error) {
		let message;
		switch (error.status) {
			case 500:
				message = 'Internal Server Error';
				break;
			case 401:
				message = 'Invalid credentials';
				break;
			default:
				message = error;
		}
		yield put(fetchProjectsError(message));
	}
}


/**
 * Add Event
 */
function* addEvent({ payload: data }) {
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		yield put(calendarIsLoading());
		const response = yield call(
			fetchJSON, 'events',
			apiOptions('POST', JSON.stringify({ ...data }))
		);
		if (response.error === null) {
			yield put(addEventModalOpen());
			yield put(setProjectStatus(true, 'Событие успешно добавлено!'));
			yield call(getEvents)
		} else {
			yield put(fetchProjectsError(response.error));
		}
		yield put(calendarIsLoading());
	} catch (error) {
		let message;
		switch (error.status) {
			case 500:
				message = 'Internal Server Error';
				break;
			case 401:
				message = 'Invalid credentials';
				break;
			default:
				message = error;
		}
		yield put(fetchProjectsError(message));
	}
}

/**
 * Get Events
 */
function* getEvents() {
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		yield put(calendarIsLoading());
		const response = yield call(
			fetchJSON, 'events',
			apiOptions('GET')
		);
		if (response.error === null) {
			yield put(setEventsList(response.data));
		} else {
			yield put(fetchProjectsError(response.error));
		}
		yield put(calendarIsLoading());
	} catch (error) {
		let message;
		switch (error.status) {
			case 500:
				message = 'Internal Server Error';
				break;
			case 401:
				message = 'Invalid credentials';
				break;
			default:
				message = error;
		}
		yield put(fetchProjectsError(message));
	}
}



export function* watchDataListForAddingEvent() {
	yield takeEvery(GET_DATA_FOR_ADDING_EVENT, getDataListForAddingEvent);
}
export function* watchGetCitiesList() {
	yield takeEvery(GET_CITIES, getCityCoordinates);
}
export function* watchGetOrganization() {
	yield takeEvery(GET_ORGANIZATION, getOrganization);
}
export function* watchAddContacts() {
	yield takeEvery(ADD_CONTACTS, addContact);
}
export function* watchAddTags() {
	yield takeEvery(ADD_TAG, addTags)
}
export function* watchAddEvent() {
	yield takeEvery(ADD_EVENT, addEvent)
}
export function* watchGetEvents() {
	yield takeEvery(GET_EVENTS, getEvents)
}

function* calendarSaga() {
	yield all([
		fork(watchDataListForAddingEvent),
		fork(watchGetCitiesList),
		fork(watchGetOrganization),
		fork(watchAddContacts),
		fork(watchAddTags),
		fork(watchAddEvent),
		fork(watchGetEvents),
	]);
}

export default calendarSaga;
