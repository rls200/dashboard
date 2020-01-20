import {
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_ERROR,
    SET_NEW_PROJECT,
    SET_EDIT_DATA,
    IS_LOADING,
    ADD_PROJECT_NEXT_PAGE_SUCCESS,
    IS_LOADING_LOAD_MORE,
    CLEAR_DATA_PROJECT,
    SET_PROJECT_STATUS,
    SET_DELETE_STATUS,
    ADD_PROJECT_STATUS
} from './constants';

const initialState = {
    projects: [],
    error: null,
    editData: {},
    isLoading: false,
    isLoadingLoadMore: false,
    last_page: '',
    current_page: '',
    status: false,
    projectStatus: false,
    message: '',
    deleteStatus: {
        status: false,
        id: null
    }
};

const Projects = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: [...action.projectData],
                last_page: action.last_page,
                current_page: action.current_page,
            };
        case FETCH_PROJECTS_ERROR:
            return {
                ...state,
                error: action.message,
                status: false
            };
        case SET_NEW_PROJECT:
            let index = state.projects.length +1;
            return {
                ...state,
                projects: [...state.projects, {id: index, created_at: action.created_at, link_vk: action.link_vk, name: action.name, description: action.description}]
            };
        case SET_EDIT_DATA:
            return {
                ...state,
                editData: { name:action.name, link_vk:action.link_vk, description:action.description },
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case IS_LOADING_LOAD_MORE:
            return {
                ...state,
                isLoadingLoadMore: action.isLoadingLoadMore
            };
        case ADD_PROJECT_NEXT_PAGE_SUCCESS:
            return {
                ...state,
                projects: [...(state.projects.concat(action.nextProjectData))],
                last_page: action.last_page,
                current_page: action.current_page,
            };
        case SET_PROJECT_STATUS:
            return {
                ...state,
                status: action.status,
                message: action.message,
            };
        case ADD_PROJECT_STATUS:
            return {
                ...state,
                projectStatus: action.status,
            };
        case SET_DELETE_STATUS:
            return {
                ...state,
                deleteStatus: {status: action.status, id:action.id}
            };
        case CLEAR_DATA_PROJECT:
            return {
                ...state,
                projects: [],
                editData: {},
                isLoading: false,
                isLoadingLoadMore: false,
                last_page: '',
                current_page: '',
                status: false,
                projectStatus: false,
                message: '',
                deleteStatus: {
                    status: false,
                    id: null
                }
            };
        default:
            return { ...state };
    }
};

export default Projects;
