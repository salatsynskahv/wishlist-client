import React from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/redux-features/user/userSlice";

export default function Navbar() {
    const currentUser = useSelector(selectUser);
    const elNavLinks = currentUser ? (
            <>
                <div className="d-flex">
                    <Link to="/wishlist"><span>My wishlist</span></Link>
                    <Link to="/friends"><span>Friends</span></Link>
                </div>
                <Link to="/logout"><span>Log out</span></Link>
            </>
        ) :
        (
            <Link to="/logout"><span>Login</span></Link>
        );

    return (<>
        <nav className="menu">
            <div className="home-logo">
                <Link to="/">
                    <div className="wishlist-logo"></div>
                </Link>
                {currentUser && <span className="user"> {currentUser.email} </span>}
            </div>
            {elNavLinks}
        </nav>
    </>)
}


function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? 'active' : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}