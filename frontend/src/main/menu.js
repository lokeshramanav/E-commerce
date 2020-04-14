import React from "react";
import {Link, withRouter} from 'react-router-dom';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } 
};


const Menu = ({history})=>{
    return(
        <div>
        <nav class="navbar navbar-light navbar-expand-md" style={{backgroundColor:"#55c6ea", color:"rgb(0,0,0)" , fontWeight:"bold"}}>
        
        <div className="container-fluid" >
        <ul className="nav navbar-nav">
            <li className="nav-item">
            <Link className="nav-link" to="/" style={isActive(history, "/")}>HOME</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>SignIn</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>SignUp</Link>
            </li>
        </ul>
    </div>
    </nav>
    </div>
    );
}

export default withRouter(Menu);