import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { handleSignOut, initializeLoginFramework } from '../Login/LoginManager';
import './Header.css';
const Header = () => {
    let history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // if(loggedInUser.email)

    const signOut = () => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        });
    }

    const handleResponse = (res, redirect) => {
        setLoggedInUser(res);
        redirect ? history.replace(from) : history.replace();
    }
    
    return (
        
        <div className="header-container">
            
                <h1>Game On Go</h1>
            
            <nav className="half-right">
            <Link to="/home">Home</Link>
            <Link to="/order">Orders</Link>
            <Link to="/inventory">Admin</Link>
            <Link to="/">Deals</Link>
            {
                  loggedInUser.email? <Link onClick={signOut} id="button">{loggedInUser.displayName || loggedInUser.name || "New User"} &nbsp; <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </Link> : <Link to="/login" id="button">Login</Link>
                }
            </nav>
        </div>
    );
};

export default Header;