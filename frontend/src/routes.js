import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from './user/Signup';
import Signin from './user/signin';
import App from './App';
import Menu from './main/menu';


const Routes = () => {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </BrowserRouter>
    );
};


export default Routes;
