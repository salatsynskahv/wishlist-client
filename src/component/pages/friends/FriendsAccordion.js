import React, {useState} from "react";
import {Accordion} from "react-bootstrap";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from "../../../icons/DeleteIcon";
import {deleteFriend} from "../../../redux/redux-features/friends/friendsSlice";
import {useAuth} from "../../../contexts/AuthContext";

const FriendsAccordion = ({currentFriendsList, setCurrentFriendsList, setSelectedList}) => {
    const [deleteFriendEmail, setDeleteFriendEmail] = useState();
    const friends = useSelector(state => state.friends.friends);
    const dispatch = useDispatch();
    const {currentUser} = useAuth();
    console.log("FriendsAccordion friends: " + JSON.stringify(friends))
    const getFriendsWishlists = async (userEmail) => {
        console.log(`getFriendsWishlists userEMail: ${userEmail}`)
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlists/${userEmail}`);
        console.log(data)
        setCurrentFriendsList(data);
    }

    const deleteFriendHandler = () => {
        dispatch(deleteFriend({
            userEmail: currentUser.email,
            deleteFriendEmail: deleteFriendEmail
        }))
    }

    const showList = async (id) => {
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlist/${id}`);
        setSelectedList(data);
        console.log(data)
    }

    return (
        <>
            <div className="modal fade" id="deleteFriendModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content delete-modal-content">
                        {/*<div className="modal-header">*/}
                        {/*    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>*/}
                        {/*    <button type="button" className="btn-close" data-bs-dismiss="modal"*/}
                        {/*            aria-label="Close"></button>*/}
                        {/*</div>*/}
                        <div className="modal-body">
                            Do you want to delete friend?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel
                            </button>
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={deleteFriendHandler}
                                    data-bs-dismiss="modal">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Accordion>
                {
                    !!friends && friends.map((userEmail, index) => {
                        return (
                            <Accordion.Item eventKey={index} key={userEmail}>
                                <Accordion.Header onClick={() => getFriendsWishlists(userEmail)}>
                                    <button
                                        className="delete-button"
                                        data-bs-toggle="modal"
                                        data-bs-target='#deleteFriendModal'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteFriendEmail(userEmail)
                                        }
                                        }
                                    ><DeleteIcon/>
                                    </button>
                                    {userEmail}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {
                                            currentFriendsList.map(item => {
                                                    return (
                                                        <li key={item._id}>
                                                            <a onClick={() => showList(item._id)} href="#">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    )
                                                }
                                            )
                                        }
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })
                }
            </Accordion>
        </>

    );
}

export default FriendsAccordion;