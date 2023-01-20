import React, {useState} from "react"
import {useAuth} from "../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import homepage from '../../images/homepage.jpg'

export default function Home() {
    const {currentUser, logout, errorCode} = useAuth();
    console.log('currentUser: ' + JSON.stringify(currentUser));
    const navigate = useNavigate()

    const aboutUser = !!currentUser ?
        (<div className="about-user">
            <h2 className="text-center mb-4">About You</h2>
            <strong>Email: </strong> {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update profile</Link>
        </div>) : (<p> Please, <Link to='/login'>login </Link> for better user experience</p>)

    return (
        <>
            <section className="home-section">
                <div className="home-page-banner">
                    <div className="fl-left">
                        <p>
                            <br/>
                            <h2 className="home-title"> Create wishlists! </h2>
                            <br/>
                            <h2 className="home-title"> Share with friends!</h2>
                            <br/>
                            <h2 className="home-title">Get what you want! </h2>
                        </p>
                    </div>
                    <div id="homepage-image" className="fl-right mask1">
                        <img src={homepage} alt="image" style={{height: '500px'}}/>
                    </div>
                </div>

            </section>

            {/*{*/}
            {/*    errorCode &&*/}
            {/*    <div>*/}
            {/*        <h1 className="error"> Some error occurred </h1>*/}
            {/*    </div>*/}
            {/*}*/}
            {/*<div className="container">*/}

            {/*    <aside id="home-aside" className="m-0">*/}
            {/*        <div className="container">*/}
            {/*            {aboutUser}*/}
            {/*        </div>*/}
            {/*    </aside>*/}
            {/*</div>*/}
        </>
    )

}