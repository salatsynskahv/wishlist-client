import React, {useState} from "react";
import {Outlet} from "react-router";
import ListItem from "../../helpers/ListItem";
import {useAuth} from "../../../contexts/AuthContext";
import {UsersWishlistProvider, useUsersWishlists} from "../../../contexts/UsersWishlistsContext";
import NewWishlist from "./NewWishlist";
import PlusCircleDotted from "../../../icons/PlusCircleDotted";


export default function MyWishlists() {
    const {currentUser} = useAuth();
    return (
        <UsersWishlistProvider userEmail={currentUser.email}>
            <MyWishlistsInner/>
        </UsersWishlistProvider>
    );

}

function MyWishlistsInner() {
    const {wishlists} = useUsersWishlists();
    const {setWishlists} = useUsersWishlists();
    // const [wishlists, setWishlists] = useState([])
    const [show, setShow] = useState(false)
    // const headers = {
    //     "Content-Type": "application/json"
    // };
    console.log('MyWishlistsInner: ' + JSON.stringify(wishlists))

    return (
        <div className="my-wishlist-page">
            <br/>

            <NewWishlist rows={wishlists} setRows={setWishlists} show={show} setShow={setShow}/>
            <div className="container" style={{marginTop: '30px'}}>
                <div className="row">
                    <div className="col-auto d-flex">
                        <div className="card">
                            <div className="card-header">
                                <span style={{fontSize: 'large', fontWeight:'600', marginLeft: '50px', marginRight: '50px'}}> My lists </span>
                                <button className="btn btn-primary" onClick={() => setShow(true)} hidden={show}>
                                    <i className="d-flex"><PlusCircleDotted/></i>
                                </button>

                            </div>
                            <div className="card-body">
                                {
                                    wishlists.map(item => {
                                        return <ListItem
                                            key={item._id}
                                            row={item}
                                            rows={wishlists}
                                            setRows={setWishlists}
                                            path={`/wishlist/${item._id}`}
                                        />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <Outlet/>
                    </div>
                </div>
            </div>

        </div>)

}


