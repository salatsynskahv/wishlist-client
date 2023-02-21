import React from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export default function Navbar() {
    const {currentUser} = useAuth()
    const elNavLinks = currentUser ? (
            <ul>
                <li><Link to="/wishlist"><span>My wishlist</span></Link></li>
                {/*<CustomLink to="/planner">Planner</CustomLink>*/}
                <li><Link to="/friends"><span>Friends</span></Link></li>
                <li><Link to="/logout"><span>Log out</span></Link>}</li>
            </ul>) :
        (
            <ul>
                <li><Link to="/logout"><span>Sign up</span></Link>}</li>
            </ul>
        );

    return (
        <nav className="nav">
            <Link to="/home">
                <svg className="org-avatar-default" height="55" width="55"><title>Avatar for WL</title>
                    <circle cx="30" cy="28" r="24" fill="#e4e2e4" stroke="#fff"></circle>
                    <text x="30" y="29" font-size="25" fill="#39265b"
                          font-family="&quot;Roboto&quot;,&quot;Helvetica Neue&quot;,&quot;Arial&quot;,sans-serif"
                          text-anchor="middle" dominant-baseline="central">WL
                    </text>
                </svg>
            </Link>
            {elNavLinks}
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