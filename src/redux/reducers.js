import { combineReducers } from 'redux';

import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import Projects from './projects/reducers'
import Dashboard from './dashboard/reducers';
import Calendar from './calendar/reducers';


export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Projects,
    Dashboard,
    Calendar
});
