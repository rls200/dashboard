import {
	GET_PROJECTS_LIST_SUCCESS,
	GET_INDICATORS_SUCCESS,
	INDICATORS_STATUS,
	GET_DATA_STATUS,
	SELECT_PROJECT_ID,
	SELECT_COUNT_DAY,
	SET_DEFAULT_PROJECT_ID,
	IS_LOADING,
	CLEAR_DATA_DASHBOARD
} from './constants';

const initialState = {
	projectListData: [],
	indicatorsData: {},
	indicatorsStatus: false,
	statisticsData: {},
	getDataStatus: true,
	defaultProjectId: null,
	defaultProjectVkId: null,
	selectProjectId: null,
	selectCountDay: 7,
	isLoading: false
};

const DashboardReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROJECTS_LIST_SUCCESS:
			return {
				...state,
				projectListData: [...action.projectListData],
			};
		case GET_INDICATORS_SUCCESS:
			return {
				...state,
				indicatorsData: {...action.indicatorsData.data},
				statisticsData: {...action.indicatorsData.statistics},
				selectProjectId: action.id
			};
		case INDICATORS_STATUS:
			return {
				...state,
				indicatorsStatus: action.status,
			};
		case GET_DATA_STATUS:
			return {
				...state,
				getDataStatus: action.status,
			};
		case SELECT_PROJECT_ID:
			return {
				...state,
				selectProjectId: action.id,
			};
		case SELECT_COUNT_DAY:
			return {
				...state,
				selectCountDay: action.count,
			};
		case SET_DEFAULT_PROJECT_ID:
			return {
				...state,
				defaultProjectId: action.id,
				defaultProjectVkId: action.vk_id,
				selectProjectId: action.vk_id,
				selectCountDay: 7,
			};
		case IS_LOADING:
			return {
				...state,
				isLoading: action.status
			};
		case CLEAR_DATA_DASHBOARD:
			return {
				...state,
				projectListData: [],
				indicatorsData: {},
				indicatorsStatus: false,
				statisticsData: {},
				getDataStatus: true,
				defaultProjectId: null,
				defaultProjectVkId: null,
				selectProjectId: null,
				selectCountDay: 7,
				isLoading: false
			};
		default:
			return { ...state };
	}
};

export default DashboardReducer;
