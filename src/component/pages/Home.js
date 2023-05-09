import React from "react"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/redux-features/user/userSlice";

export default function Home() {
    const currentUser = useSelector(selectUser)
    console.log('currentUser: ' + JSON.stringify(currentUser));
    const navigate = useNavigate();

    const elBannerButtons = !currentUser ? (
            <div>
                <button className="btn btn-primary">
                    Log in to Get More
                </button>
            </div>
        ) :
        (<>
            <div>
                <p>
                    Remembering what you want: With so many things to buy or receive as a gift, it's easy to forget what you were interested in.
                    A wishlist helps you keep track of everything you want in one place, so you don't have to worry about forgetting.
                </p>
                <button className="btn btn-primary" onClick={() => navigate('/wishlist')}> Create Your Wishlists
                </button>
            </div>
            <div>
                <button className="btn btn-primary" onClick={() => navigate('/friends')}> Find Friends Wishlists
                </button>
                <p>
                    Sharing with others: A wishlist is a great way to share your interests with others.
                    Whether it's for a birthday, holiday, or other occasion, you can share your wishlist with friends and family to let them know what you'd like to receive as a gift.
                </p>

            </div>

        </>);

    return (
        <div className="home-page">
            <section className="section section-a">
                <div className="home-page-banner">
                    <div className="inner">
                        <div>
                            <br/>
                            <h1 className="home-title"><i>Create</i> Your Wish List With Ease </h1>
                            <br/>
                            <h2 className="home-title">  <i>Exchange</i> Your Wish Lists With Friends </h2>
                        </div>
                    </div>

                </div>

            </section>
            <section className="section section-b">
                {
                    elBannerButtons
                }
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
        </div>
    )

}