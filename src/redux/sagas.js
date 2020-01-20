// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import projectsSaga from './projects/saga';
import dashboardSaga from './dashboard/saga'
import calendarSaga from './calendar/saga'

export default function* rootSaga(getState: any): any {
    yield all([
        authSaga(),
        layoutSaga(),
        appMenuSaga(),
        projectsSaga(),
        dashboardSaga(),
        calendarSaga(),
    ]);
}
