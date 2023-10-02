import React, {useEffect, useRef, useState} from "react";
import SearchIcon from "../../../icons/SearchIcon";
import axios from "axios";
import {Accordion, Modal} from "react-bootstrap";
import {Link} from "@mui/material";
import {useAuth} from "../../../contexts/AuthContext";
import FriendsWishlist from "./FriendsWishlist";
import FriendsAccordion from "./FriendsAccordion";
import {useDispatch, useSelector} from "react-redux";
import {addFriend, deleteFriend} from "../../../redux/redux-features/friends/friendsSlice";
import store from "../../../redux/store";
import {selectUser} from "../../../redux/redux-features/user/userSlice";
import {RiFindReplaceLine} from "react-icons/ri";

export default function Friends() {
    const searchFriendRef = useRef();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [searchResult, setSearchResult] = useState('');
    //todo: replace with redux state
    const friends = useSelector(state => state.friends.friends);
    const [currentFriendsList, setCurrentFriendsList] = useState([])
    const [selectedList, setSelectedList] = useState(undefined)
    const currentUser = useSelector(selectUser);
    const handleClose = () => {
        setShow(false);
        setSearchResult('')
    }
    const handleShow = () => setShow(true);
    const handleSearchFriend = (e) => {
        e.preventDefault();
        const value = searchFriendRef.current.value
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/friends/?email=${value}`)
            .then((result) => {
                setSearchResult(result.data);
                console.log(result)
            })
    }

    function add(item) {
        store.dispatch(addFriend({newFriend: item, currentUserEmail: currentUser.email}));
    }


    function deleteF(item) {
        dispatch(deleteFriend())
    }


    const addDeleteButton = (item) => {

        console.log("addDeleteButton");
        console.log(JSON.stringify(friends));
        console.log(JSON.stringify(item));
        if (!friends.includes(item.email)) {
            return (<button className="ms-3 btn btn-outline-primary"
                            onClick={() => {
                                add(item)
                            }}>
                Add friend
            </button>)
        } else {
            return (<button onClick={() => {
                deleteF(item)
            }} className="ms-3 btn btn-outline-primary">
                Delete friend
            </button>)
        }
    }

    return (
        <div className="mt-3">
            {/*<div className="container w-50">*/}

            {/*    <div className="input-group">*/}
            {/*        <input type="text"*/}
            {/*               className="find-friend-input form-control"*/}
            {/*               onClick={handleShow}*/}
            {/*               onKeyDown={handleShow}*/}
            {/*               placeholder="Find a friend"/>*/}
            {/*        /!*<button className="btn btn-outline-secondary" onClick={handleSearchFriend} type="button">*!/*/}
            {/*        /!*    <SearchIcon/></button>*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Modal show={show} onHide={handleClose} className="search-friend-modal">
                <Modal.Header closeButton>
                    <form onSubmit={handleSearchFriend}>
                        <div className="input-group">
                            <input type="text"
                                   className="form-control"
                                   ref={searchFriendRef}
                                   placeholder="Please, enter friends email"
                            />
                            <button className="btn btn-outline-secondary" type="submit">
                                <SearchIcon/></button>
                        </div>
                    </form>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        {
                            !searchResult &&
                            <span>No recent search</span>
                        }
                        {
                            searchResult &&
                            <span>
                                <ul>
                                    {
                                        searchResult.map(
                                            (item) => {
                                                return (<li key={item._id}>
                                                    <Link to="/">{item.email}</Link>
                                                    {addDeleteButton(item)}
                                                </li>)
                                            }
                                        )
                                    }
                                </ul>
                            </span>
                        }
                    </div>
                </Modal.Body>
                {/*<Modal.Footer>*/}
                {/*    <Button variant="secondary" onClick={handleClose}>*/}
                {/*        Close*/}
                {/*    </Button>*/}
                {/*    <Button variant="primary" onClick={handleClose}>*/}
                {/*        Save Changes*/}
                {/*    </Button>*/}
                {/*</Modal.Footer>*/}
            </Modal>
            <br/>
            <div>
                <div className="box" style={{maxWidth: '30%'}}>
                    <div className="card">
                        <div className="card-header">
                            <h6>
                                My friends
                                <RiFindReplaceLine
                                    className="find-friend-icon"
                                    size={30}
                                    onClick={handleShow}
                                />
                            </h6>

                        </div>
                        <div className="card-body">
                            {currentFriendsList.length < 1 && <p>No friends, yet</p>}
                            <FriendsAccordion
                                currentFriendsList={currentFriendsList}
                                setCurrentFriendsList={setCurrentFriendsList}
                                setSelectedList={setSelectedList}
                            />
                        </div>
                    </div>
                </div>
                <div className="box" style={{width: '68%'}}>
                    {!selectedList && <div> Please, select friend and after select friend's list </div>}
                    {selectedList && <FriendsWishlist wishlist={selectedList}/>}
                </div>
            </div>
        </div>);
}
