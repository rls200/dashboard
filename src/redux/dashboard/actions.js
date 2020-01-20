import {
	GET_PROJECTS_LIST,
	GET_PROJECTS_LIST_SUCCESS,
	GET_INDICATORS,
	GET_INDICATORS_SUCCESS,
	INDICATORS_STATUS,
	GET_DATA_STATUS,
	SELECT_PROJECT_ID,
	SELECT_COUNT_DAY,
	SET_DEFAULT_PROJECT_ID,
	GET_PROJECTS_INDICATORS_DATA,
	IS_LOADING,
	CLEAR_DATA_DASHBOARD,
	GET_NEW_INDICATORS
} from './constants';

export const fetchGetProjectsList = (manager_id, day) => ({
	type: GET_PROJECTS_LIST,
	payload: { manager_id, day },
});

export const projectsListSuccess = (projectListData) => ({
	type: GET_PROJECTS_LIST_SUCCESS,
	projectListData
});

export const fetchGetIndicators = (manager_id, day, id) => ({
	type: GET_INDICATORS,
	payload: { manager_id, day, id },
});
export const fetchGetNewIndicators = (manager_id, day, id) => ({
	type: GET_NEW_INDICATORS,
	payload: { manager_id, day, id },
});

export const fetchProjectIndicatorsData = (manager_id, id_project, day) => ({
	type: GET_PROJECTS_INDICATORS_DATA,
	payload: { manager_id, id_project, day },
});

export const getIndicatorsSuccess = (indicatorsData, id) => ({
	type: GET_INDICATORS_SUCCESS,
	indicatorsData,
	id
});

export const indicatorsStatus = (status) => ({
	type: INDICATORS_STATUS,
	status
});

export const getDataStatus = (status) => ({
	type: GET_DATA_STATUS,
	status
});

export const setSelectProjectId = (id) => ({
	type: SELECT_PROJECT_ID,
	id
});

export const setSelectCountDay = (count) => ({
	type: SELECT_COUNT_DAY,
	count
});

export const setDefaultProjectId = (id, vk_id) => ({
	type: SET_DEFAULT_PROJECT_ID,
	id,
	vk_id
});

export const setIsLoading = (status) => ({
	type: IS_LOADING,
	status
});
export const clearDataDashboard = () => ({
	type: CLEAR_DATA_DASHBOARD,
});