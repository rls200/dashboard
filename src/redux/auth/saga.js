import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchJSON } from '../../helpers/api';
import { historyRef } from '../../routes/ExtBrowserRouter';

import {
    apiOptionsAuth,
    setSession,
    apiOptions,
    isExpressIn,
} from '../../helpers/authUtils';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD } from './constants';

import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
    setAuthStatus,
} from './actions';
import {fetchProjectsError, clearDataProject} from "../projects/actions";
import {clearDataDashboard} from "../dashboard/actions";

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { email, password } }) {
    try {
        const response = yield call(
          fetchJSON, 'auth/login',
          apiOptionsAuth({ email, password })
        );
        if (response.error !== null) {
            yield put(setAuthStatus(response.error.status_code, response.error.message))
        } else {
            setSession(response.data);
            yield put(loginUserSuccess(response.data));
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
        yield put(loginUserFailed(message));
        setSession(null);
    }
}



/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield put(clearDataDashboard());
        yield put(clearDataProject());
        yield call(() => {
            history.push('/account/login');
        });
    } catch (error) {}
}


/**
 * Refresh token
 * @param {*} payload - token
 */
export function* refreshToken() {
    const isExpress = isExpressIn();
    if(isExpress === 'refresh') {
        const refreshToken = yield call(
          fetchJSON, 'auth/refresh',
          apiOptions('POST')
        );
        if (refreshToken.error === null) {
            setSession(refreshToken.data);
            yield put(loginUserSuccess(refreshToken.data));
        } else {
            yield put(clearDataDashboard());
            yield put(clearDataProject());
            yield put(fetchProjectsError(refreshToken.error));
            setSession(null);
            yield call(() => historyRef.push('/account/login'));
            return false
        }
    } else if (isExpress === 'logout'){
        yield put(clearDataDashboard());
        yield put(clearDataProject());
        setSession(null);
        yield call(() => historyRef.push('/account/login'));
        yield put(fetchProjectsError({message: 'Текущий токен не активен!'}));
        return false
    }
}

/**
 * Register the user
 */
function* register({ payload: { fullname, email, password } }) {

    try {
        const response = yield call(
          fetchJSON, '/users/register',
          apiOptionsAuth({ fullname, email, password })
        );
        yield put(registerUserSuccess(response));
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
        yield put(registerUserFailed(message));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {
    try {
        const response = yield call(
          fetchJSON, '/users/password-reset',
          apiOptionsAuth({ username })
        );
        yield put(forgetPasswordSuccess(response.message));
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
        yield put(forgetPasswordFailed(message));
    }
}


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}



function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
    ]);
}

export default authSaga;
