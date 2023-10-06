import React, {useState} from 'react';
import PlusCircleDotted from "../../../icons/PlusCircleDotted";
import ListItem from "../../helpers/ListItem";
import {Outlet} from "react-router";
import {deleteWishlist} from "../../../redux/redux-features/wishlists/wishlistsSlice";
import {useDispatch, useSelector} from "react-redux";
import NewWishlist from "./NewWishlist";

const WishlistMenu = ({wishlists}) => {
    const dispatch = useDispatch();
    const [selectedRow, setSelectedRow] = useState({});

    const wishlistStatus = useSelector(state => state.wishlists.status)
    console.log("rerender wishlistMenu")
    const deleteHandler = async () => {
        await dispatch(deleteWishlist({
            _id: selectedRow._id
        })).unwrap();
        setSelectedRow({})
    }

    return (
        <div className="container" style={{marginTop: '30px'}}>
            <div className="menu-flex">
                <div className="col-auto">
                    <div className="card">
                        <div className="card-header">
                            <span
                                style={{fontSize: 'large', fontWeight: '600', marginLeft: '50px', marginRight: '50px'}}> My lists </span>
                            <button className="btn" data-bs-toggle="modal" data-bs-target="#newWishlist">
                                <i className="d-flex"><PlusCircleDotted/></i>
                            </button>
                            <NewWishlist/>

                        </div>
                        <div className="card-body">
                            <ul className="wishlist-menu">
                                {
                                    wishlists.map(item => {
                                        return <ListItem
                                            key={item._id}
                                            row={item}
                                            setSelectedRow={setSelectedRow}
                                            path={`/wishlist/${item._id}`}
                                        />
                                    })
                                }
                            </ul>
                        </div>

                    </div>
                    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content delete-modal-content">
                                {/*<div className="modal-header">*/}
                                {/*    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>*/}
                                {/*    <button type="button" className="btn-close" data-bs-dismiss="modal"*/}
                                {/*            aria-label="Close"></button>*/}
                                {/*</div>*/}
                                <div className="modal-body">
                                    Do you want to delete wishlist {selectedRow.name}?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel
                                    </button>
                                    <button type="button"
                                            className="btn btn-primary"
                                            onClick={deleteHandler}
                                            data-bs-dismiss="modal">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wishlist-column m-3">
                    <Outlet/>
                </div>
            </div>
        </div>)
}

export default WishlistMenu;