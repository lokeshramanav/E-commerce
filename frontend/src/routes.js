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
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './main/shop';
import Product from './main/product';
import Cart from './main/Cart';
import Orders from './admin/orders';
const Routes = () => {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/products" exact component={AddProduct} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <AdminRoute path="/orders" exact component={Orders} />
                </Switch>
        </BrowserRouter>
    );
};


export default Routes;
