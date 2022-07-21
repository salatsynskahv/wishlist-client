import React from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";

export default function Navbar() {
    return (<nav className="nav">
        <a href="/" className="site-title">
            Site Name
        </a>
        <ul>
            <CustomLink to="/wishlist"><span>My wishlist</span></CustomLink>
            <CustomLink to="/friends"><span>Friendsnp</span></CustomLink>
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