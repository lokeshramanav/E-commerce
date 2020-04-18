import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from './user/Signup';
import Signin from './user/signin';
import App from './App';
import Menu from './main/menu';
import PrivateRoute from './auth/PrivateRoute';
import {Dashboard} from './user/userDashboard';
import AdminRoute from './auth/AdminRoute';
import {AdminDashboard} from './user/AdminDashboard';

const Routes = () => {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            </Switch>
        </BrowserRouter>
    );
};


export default Routes;
