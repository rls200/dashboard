import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import PrivateRoute from './PrivateRoute';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));
// apps
const CalendarContainer = React.lazy(() => import('../pages/apps/Calendar/CalendarContainer'));
const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    header: 'Navigation',
    exact: true,
    component: Dashboard,
    route: PrivateRoute
};

// events
const eventsRoutes = {
    path: '/events',
    name: 'Events',
    exact: true,
    icon: FeatherIcon.Calendar,
    component: CalendarContainer,
    route: PrivateRoute,
};

const projectAppRoutes = {
    path: '/projects',
    name: 'Projects',
    exact: true,
    icon: FeatherIcon.Briefcase,
    component: ProjectList,
    route: PrivateRoute,
};

const appRoutes = [projectAppRoutes];

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    dashboardRoutes,
    eventsRoutes,
    ...appRoutes,
    authRoutes
];

const authProtectedRoutes = [dashboardRoutes, ...appRoutes, eventsRoutes];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
