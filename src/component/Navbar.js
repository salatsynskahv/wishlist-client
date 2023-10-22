import React, {useState} from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/redux-features/user/userSlice";
import {FiMenu} from "react-icons/fi";
import {RxCross1} from "react-icons/rx";

export default function Navbar() {
    const currentUser = useSelector(selectUser);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const elNavLinks = currentUser ? (
            <div className={mobileMenuOpen ? "menu-links-mobile": "menu-links"}>
                {/*<div className="d-flex">*/}
                <Link to="/wishlist"><span>My wishlist</span></Link>
                <Link to="/friends"><span>Friends</span></Link>
                {/*</div>*/}
                <Link to="/logout"><span>Log out</span></Link>
            </div>
        ) :
        (
            <div className={mobileMenuOpen ? "menu-links-mobile": "menu-links"}>
                <Link to="/logout"><span>Login</span></Link>
            </div>

        );

    function handleMobileMenu(e) {
        console.log(e);
        setMobileMenuOpen(prev => !prev);
    }

    return (
        <>
            <nav className="menu">
                <div className="home-logo">
                    <Link to="/">
                        <div className="wishlist-logo"></div>
                    </Link>
                    {currentUser && <span className="user"> {currentUser.email} </span>}
                    <button className="mobile-menu-icon" onClick={handleMobileMenu}>
                        {mobileMenuOpen ? <RxCross1 size="1.6rem"/> : <FiMenu size="1.6rem"/> }
                    </button>
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