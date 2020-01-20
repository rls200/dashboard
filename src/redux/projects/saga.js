import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import {
    fetchProjectsSuccess,
    fetchProjectsError,
    setEditData,
    setIsLoading,
    addProjectNexPageSuccess,
    setIsLoadingLoadMore,
    setProjectStatus,
    setDeleteStatus,
    addProjectStatus
} from './actions';
import {getDataStatus, setDefaultProjectId} from '../dashboard/actions';
import {
    FETCH_PROJECTS,
    ADD_PROJECT,
    EDIT_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    PROJECT_NEXT_PAGE
} from './constants';
import {apiOptions} from '../../helpers/authUtils';
import {refreshToken} from '../auth/saga';

/**
 * Get projects
 */

function* fetchProjects() {
    try {
        const refreshType = yield call(refreshToken);
        if (refreshType === false) {
            return
        }
        yield put(setDefaultProjectId(null, null));
        yield put(getDataStatus(true));
        const response = yield call(
          fetchJSON, 'projects',
          apiOptions('get')
        );
        if (response.error === null) {
            yield put(fetchProjectsSuccess(response.data));
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
 * Add project
 */
function* addProject({ payload: { name, link_vk, description } }) {
    try {
        const refreshType = yield call(refreshToken);
        if (refreshType === false) {
            return
        }
        yield put(setIsLoading(true));
        const response = yield call(
          fetchJSON, 'projects',
          apiOptions('POST', JSON.stringify({ name, link_vk, description }))
        );
        if (response.error === null) {
            yield call(fetchProjects);
            yield put(setProjectStatus(true, 'Проект успешно добавлен!'));
            yield put(addProjectStatus(false));
        } else {
            yield put(fetchProjectsError(response.error));
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
        yield put(fetchProjectsError(message));
    }
}

/**
 * Edit project
 */

function* editProject({ payload: { id } }) {
    try {
        const refreshType = yield call(refreshToken);
        if (refreshType === false) {
            return
        }
        const response = yield call(
          fetchJSON, `projects/${id}/edit`,
          apiOptions('get')
        );
        if (response.error === null) {
            yield put(setEditData(response.data));
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
 * Update project
 */

function* updateProject({ payload: { id, name, link_vk, description } }) {
    try {
        const refreshType = yield call(refreshToken);
        if (refreshType === false) {
            return
        }
        yield put(setIsLoading(true));
        const response = yield call(
          fetchJSON, `projects/${id}`,
          apiOptions('put', JSON.stringify({ name, link_vk, description }))
        );
        if (response.error === null) {
            yield call(fetchProjects);
            yield put(setProjectStatus(true, 'Проект успешно обновлен!'))
        } else {
            yield put(fetchProjectsError(response.error));
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
        yield put(fetchProjectsError(message));
    }
}

/**
 * Delete project
 */

function* deleteProject({ payload: { id } }) {
    try {
        const refreshType = yield call(refreshToken);
        if (refreshType === false) {
            return
        }
        yield put(setDeleteStatus(true, id));
        const response = yield call(
          fetchJSON, `projects/${id}/delete`,
          apiOptions('get')
        );
        if (response.error === null) {
            yield call(fetchProjects);
        } else {
            yield put(fetchProjectsError(response.error));
        }
        yield put(setDeleteStatus(false, null));
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
 * Edit project
 */

function* loadMoreProject({ payload: { numberPage } }) {
    try {
        const refreshType = yield call(refreshToken);
        if (refreshType === false) {
            return
        }
        yield put(setIsLoadingLoadMore(true));
        const response = yield call(
          fetchJSON, `projects?page=${numberPage}`,
          apiOptions('get')
        );
        if (response.error === null) {
            yield put(addProjectNexPageSuccess(response.data));
        } else {
            yield put(fetchProjectsError(response.error));
        }
        yield put(setIsLoadingLoadMore(false));
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
        yield put(setIsLoadingLoadMore(false));
    }
}

export function* watchFetchProjects() {
    yield takeEvery(FETCH_PROJECTS, fetchProjects);
}
export function* watchAddProject() {
    yield takeEvery(ADD_PROJECT, addProject);
}
export function* watchEditProject() {
    yield takeEvery(EDIT_PROJECT, editProject);
}
export function* watchUpdateProject() {
    yield takeEvery(UPDATE_PROJECT, updateProject);
}
export function* watchDeleteProject() {
    yield takeEvery(DELETE_PROJECT, deleteProject);
}
export function* watchLoadMoreProject() {
    yield takeEvery(PROJECT_NEXT_PAGE, loadMoreProject);
}


function* projectsSaga() {
    yield all([
      fork(watchFetchProjects),
        fork(watchAddProject),
        fork(watchEditProject),
        fork(watchUpdateProject),
        fork(watchDeleteProject),
        fork(watchLoadMoreProject)
    ]);
}

export default projectsSaga;
