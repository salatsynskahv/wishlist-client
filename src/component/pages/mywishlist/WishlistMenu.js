import React, {useState} from 'react';
import PlusCircleDotted from "../../../icons/PlusCircleDotted";
import ListItem from "../../helpers/ListItem";
import {Outlet} from "react-router";
import axios from "axios";

const WishlistMenu = ({wishlists, setWishlists, show, setShow}) => {
    const [selectedRow, setSelectedRow] = useState({});

    const headers = {
        "Content-Type": "application/json"
    }

    const deleteHandler = () => {
        console.log(`Deleting ${JSON.stringify(selectedRow)}`)
        axios.delete(`http://localhost:3001/wishlist/${selectedRow._id}`, headers).then(
            (response) => {
                console.log(selectedRow._id + 'was deleted')
                const newWishlist = wishlists.filter((el) => el._id !== selectedRow._id);
                setWishlists(newWishlist)
            }
        )

    }

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
                <div className="col">
                    <Outlet/>
                </div>
            </div>
        </div>)
}

export default WishlistMenu;