import React, {useState} from "react"
import {useAuth} from "../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import homepage from '../../images/homepage.jpg'

export default function Home() {
    const {currentUser} = useAuth();
    console.log('currentUser: ' + JSON.stringify(currentUser));
    const navigate = useNavigate()

    const elBannerButtons = !currentUser ? (
        <div className="logged-banner">
            <button className="btn btn-primary">
                Log in to Get More
            </button>
        </div>
        ) :
        (<div className="logged-banner">
            <button className="btn btn-primary" onClick={ () => navigate('/wishlist') }> Create Your Wishlists</button>
            <button className="btn btn-primary" onClick={ () => navigate('/friends') }> Find Friends Wishlists</button>
        </div>);

    return (
        <>
            <section className="home-section">
                <div className="home-page-banner">
                    <p>
                        <br/>
                        <h1 className="home-title"><i>Create</i> custom detailed wishlist easy </h1>
                        <br/>
                        <h2 className="home-title"><i>Find</i> friends wishlists and <i>Share</i> yours </h2>
                    </p>
                    {
                        elBannerButtons
                    }
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