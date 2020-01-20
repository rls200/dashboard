import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// layout HOC
import withLayout from '../components/Layout';
import { allFlattenRoutes as routes } from './index';
import ExtBrowserRouter from './ExtBrowserRouter';

const Routes = () => (
    // rendering the router with layout
    <BrowserRouter>
      <ExtBrowserRouter>
        <Switch>
            {routes.map((route, index) => {
                return (
                    !route.children && (
                        <route.route
                            key={index}
                            path={route.path}
                            roles={route.roles}
                            exact={route.exact}
                            component={withLayout(props => {
                                return <route.component {...props} />;
                            })}></route.route>
                    )
                );
            })}
        </Switch>
      </ExtBrowserRouter>
    </BrowserRouter>
);

export default Routes;
