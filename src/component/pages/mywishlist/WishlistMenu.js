import React from 'react';
import PlusCircleDotted from "../../../icons/PlusCircleDotted";
import ListItem from "../../helpers/ListItem";
import {Outlet} from "react-router";

const WishlistMenu = ({wishlists, setWishlists, show, setShow}) => {
    return (
        <div className="container" style={{marginTop: '30px'}}>
            <div className="row">
                <div className="col-auto">
                    <div className="card">
                        <div className="card-header">
                            <span
                                style={{fontSize: 'large', fontWeight: '600', marginLeft: '50px', marginRight: '50px'}}> My lists </span>
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
        </div>)
}

export default WishlistMenu;