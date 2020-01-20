// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED,
    SET_AUTH_STATUS,
    REFRESH_TOKEN,
    ERROR_REFRESH
} from './constants';


export const loginUser = (email, password) => ({
    type: LOGIN_USER,
    payload: { email, password },
});

export const refreshToken = () => ({
    type: REFRESH_TOKEN,
});

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

export const loginUserFailed = (error) => ({
    type: LOGIN_USER_FAILED,
    payload: error,
});

export const registerUser = (fullname, email, password) => ({
    type: REGISTER_USER,
    payload: { fullname, email, password },
});

export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user,
});

export const registerUserFailed = (error) => ({
    type: REGISTER_USER_FAILED,
    payload: error,
});

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history },
});

export const errorRefresh = () => ({
    type: ERROR_REFRESH
});

export const forgetPassword = (username) => ({
    type: FORGET_PASSWORD,
    payload: { username },
});

export const forgetPasswordSuccess = (passwordResetStatus) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus,
});

export const forgetPasswordFailed = (error) => ({
    type: FORGET_PASSWORD_FAILED,
    payload: error,
});
export const setAuthStatus = (status_code, error_message) => ({
    type: SET_AUTH_STATUS,
    status_code,
    error_message
});

