import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {fetchJSON} from "../../helpers/api";
import {GET_PROJECTS_LIST, GET_INDICATORS, GET_PROJECTS_INDICATORS_DATA, GET_NEW_INDICATORS} from './constants';
import { apiOptions, setSession } from "../../helpers/authUtils";
import {
	projectsListSuccess,
	getIndicatorsSuccess,
	indicatorsStatus,
	getDataStatus,
	setSelectProjectId,
	setIsLoading,
} from "./actions";
import {refreshToken} from '../auth/saga';
import {fetchProjectsError} from "../projects/actions";

/**
 * Get list projects
 * @param {*} payload - manager_id
 */

function* getProjectIndicatorsData({payload: {manager_id, id_project, day}}) {
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		yield put(setIsLoading(true));
		yield put(indicatorsStatus(true));
		const response = yield call(
			fetchJSON, `projects/analytic/getProjectsList?`,
			apiOptions('get')
		);
		if (response.error === null) {
			yield put(projectsListSuccess(response.data));
		} else {
			yield put(fetchProjectsError(response.error));
		}

		if (id_project && response.data.length !== 0) {
			const responseIndicators = yield call(
				fetchJSON, `projects/analytic/getIndicators?day=${day}&id=${id_project}`,
				apiOptions('get')
			);
			if (responseIndicators.error === null) {
				yield put(getIndicatorsSuccess(responseIndicators, id_project));
				yield put(getDataStatus(false));
			} else {
				yield put(getDataStatus(true));
				yield put(fetchProjectsError(responseIndicators.error));
			}
		} else {
			yield put(getDataStatus(true));
		}
		yield put(setIsLoading(false));

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
		console.log("getProjectIndicatorsData error");
		yield put(getDataStatus(true));
		yield put(fetchProjectsError(message));
	}
}

/**
 * Get list projects
 * @param {*} payload - manager_id
 */

function* getListProjectsDefault({payload: {manager_id, day}}) {
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		yield put(setIsLoading(true));
		yield put(indicatorsStatus(true));
		const response = yield call(
			fetchJSON, `projects/analytic/getProjectsList?`,
			apiOptions('get')
		);
		if (response.error === null) {
			yield put(projectsListSuccess(response.data));
		} else {
			yield put(fetchProjectsError(response.error));
		}
		if (response.data.length !== 0) {
			const responseIndicators = yield call(
				fetchJSON, `projects/analytic/getIndicators?day=${day}&id=${response.data[0].vk_id}`,
				apiOptions('get')
			);
			if (responseIndicators.error === null) {
				yield put(getIndicatorsSuccess(responseIndicators, response.data[0].vk_id));
				yield put(setSelectProjectId(response.data[0].vk_id));
				yield put(getDataStatus(false));
			} else {
				yield put(getDataStatus(true));
				yield put(fetchProjectsError(responseIndicators.error));
			}
		} else {
			yield put(getDataStatus(true));
		}
		yield put(setIsLoading(false));

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
		console.log("getListProjectsDefault error");
		yield put(getDataStatus(true));
		yield put(fetchProjectsError(message));
	}
}

/**
 * Get indicators
 * @param {*} payload - manager_id , day, id(vk)
 */

function* getIndicators({payload: {manager_id, day, id}}) {
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		yield put(indicatorsStatus(false));
		const responseIndicators = yield call(fetchJSON,
			`projects/analytic/getIndicators?day=${day}&id=${id}`,
			apiOptions('get')
		);
		if (responseIndicators.error === null) {
			yield put(getIndicatorsSuccess(responseIndicators, id));
		} else {
			yield put(fetchProjectsError(responseIndicators.error));
		}
		yield put(indicatorsStatus(true));
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
		console.log("getIndicators error");
		yield put(getDataStatus(true));
		yield put(fetchProjectsError(message));
	}
}

/**
 * Get new indicators
 * @param {*} payload - manager_id , day, id(vk)
 */

function* getNewIndicators({payload: {manager_id, day, id}}) {
	try {
		const refreshType = yield call(refreshToken);
		if (refreshType === false) {
			return
		}
		yield put(indicatorsStatus(false));
		const responseIndicators = yield call(fetchJSON,
			`projects/analytic/getIndicators?day=${day}&id=${id}&new=true`,
			apiOptions('get')
		);
		console.log(responseIndicators, "responseIndicators")
		if (responseIndicators.error === null) {
			yield put(getIndicatorsSuccess(responseIndicators, id));
		} else {
			yield put(fetchProjectsError(responseIndicators.error));
		}
		yield put(indicatorsStatus(true));
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
		console.log("getNewIndicators error");
		yield put(getDataStatus(true));
		yield put(fetchProjectsError(message));
	}
}

export function* watchGetProjectIndicatorsData() {
	yield takeEvery(GET_PROJECTS_INDICATORS_DATA, getProjectIndicatorsData);
}
export function* watchGetProjectListDefault() {
	yield takeEvery(GET_PROJECTS_LIST, getListProjectsDefault);
}
export function* watchGetIndicators() {
	yield takeEvery(GET_INDICATORS, getIndicators);
}
export function* watchGetNewIndicators() {
	yield takeEvery(GET_NEW_INDICATORS, getNewIndicators);
}


function* dashboardSaga() {
	yield all([
		fork(watchGetProjectListDefault),
		fork(watchGetIndicators),
		fork(watchGetProjectIndicatorsData),
		fork(watchGetNewIndicators),
	]);
}

export default dashboardSaga;