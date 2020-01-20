import {
    FETCH_PROJECTS,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_ERROR,
    ADD_PROJECT,
    SET_NEW_PROJECT,
    SET_EDIT_DATA,
    EDIT_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    IS_LOADING,
    ADD_PROJECT_NEXT_PAGE_SUCCESS,
    PROJECT_NEXT_PAGE,
    IS_LOADING_LOAD_MORE,
    CLEAR_DATA_PROJECT,
    SET_PROJECT_STATUS,
    SET_DELETE_STATUS,
    ADD_PROJECT_STATUS
} from './constants';


export const fetchProjects = () => ({
    type: FETCH_PROJECTS,
});

export const fetchProjectsSuccess = (projectData) => ({
    type: FETCH_PROJECTS_SUCCESS,
    projectData: projectData.data,
    last_page: projectData.last_page,
    current_page: projectData.current_page,
});

export const fetchProjectsError = (message) => ({
    type: FETCH_PROJECTS_ERROR,
    message,
});

export const addProject = (name, link_vk, description) => ({
    type: ADD_PROJECT,
    payload: { name, link_vk, description },
});

export const setEditData = (data) => ({
    type: SET_EDIT_DATA,
    name: data.name,
    link_vk: data.link_vk,
    description: data.description,
});

export const fetchEditProjects = (id) => ({
    type: EDIT_PROJECT,
    payload: { id },
});
export const fetchLoadMoreProject = (numberPage) => ({
    type: PROJECT_NEXT_PAGE,
    payload: { numberPage },
});

export const fetchUpdateProjects = (id, name, link_vk, description) => ({
    type: UPDATE_PROJECT,
    payload: { id, name, link_vk, description },
});

export const fetchDeleteProjects = (id) => ({
    type: DELETE_PROJECT,
    payload: { id },
});

export const setIsLoading = (isLoading) => ({
    type: IS_LOADING,
    isLoading: isLoading
});
export const setIsLoadingLoadMore = (status) => ({
    type: IS_LOADING_LOAD_MORE,
    isLoadingLoadMore: status
});

export const addProjectNexPageSuccess = (data) => ({
    type: ADD_PROJECT_NEXT_PAGE_SUCCESS,
    nextProjectData: data.data,
    last_page: data.last_page,
    current_page: data.current_page,
});

export const clearDataProject = () => ({
    type: CLEAR_DATA_PROJECT,
});

export const setProjectStatus = (status, message) => ({
    type: SET_PROJECT_STATUS,
    status,
    message
});

export const setDeleteStatus = (status, id) => ({
    type: SET_DELETE_STATUS,
    status,
    id
});

export const addProjectStatus = (status) => ({
    type: ADD_PROJECT_STATUS,
    status
});