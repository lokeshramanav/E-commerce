import React, { Fragment } from "react";
import {Link, withRouter} from 'react-router-dom';
import{ signout, isAuthenticated} from '../auth/index'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } 
};


const Menu = ({history})=>{
    return(
        <div>
        <nav className="navbar navbar-light navbar-expand-md" style={{backgroundColor:"#55c6ea", color:"rgb(0,0,0)" , fontWeight:"bold"}}>

        <div className="container-fluid" >
        <ul className="nav navbar-nav">
            <li className="nav-item">
            <Link className="nav-link" to="/" style={isActive(history, "/")}>HOME</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/shop" style={isActive(history, "/shop")}>SHOP</Link>
            </li>

            {isAuthenticated()&& isAuthenticated().user.role===0 && (
                <li className="nav-item">
            <Link className="nav-link" to="/user/dashboard" style={isActive(history, "/user/dashboard")}>DASHBOARD</Link>
            </li>
            )}

            {isAuthenticated()&& isAuthenticated().user.role===1 && (
                <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard" style={isActive(history, "/admin/dashboard")}>DASHBOARD</Link>
            </li>
            )}


            {!isAuthenticated()&& (<Fragment>
                <li className="nav-item">
            <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>SignIn</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>SignUp</Link>
            </li>
                </Fragment>
                )}

                { isAuthenticated() && (<Fragment>
                    <li className="nav-item">
            <span className="nav-link" onClick={()=>signout(()=>{history.push('/')})} style={{cursor: 'pointer', color:'#ffffff'}}>Sign Out</span>
            </li>
            </Fragment>
                )}


        </ul>
    </div>
    </nav>
    </div>
    );
}

export default withRouter(Menu);