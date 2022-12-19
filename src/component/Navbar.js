import React from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export default function Navbar() {
    const {currentUser} = useAuth()


    return (<nav className="nav">
        <a href="/" className="site-title">
            Wishlist
        </a>
        <ul>
            <CustomLink to="/planner">Planner</CustomLink>
            <CustomLink to="/wishlist"><span>My wishlist</span></CustomLink>
            <CustomLink to="/friends"><span>Friends</span></CustomLink>
            {!currentUser && <CustomLink to="/login"><span>Login</span></CustomLink>}
            {!!currentUser && <Link to="/logout"><span>Logout</span></Link>}
        </ul>

    </nav>)
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