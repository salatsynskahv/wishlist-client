import React, {useRef, useState} from "react";
import SearchIcon from "../../../icons/SearchIcon";
import axios from "axios";
import {Modal} from "react-bootstrap";
import {Link} from "@mui/material";
import {useAuth} from "../../../contexts/AuthContext";

export default function Friends() {
    const searchFriendRef = useRef()
    const [show, setShow] = useState(false);
    const [searchResult, setSearchResult] = useState('');
    const [friendsList, setFriendsList] = useState([])
    const {currentUser} = useAuth();

    const handleClose = () => {
        setShow(false);
        setSearchResult('')
    }
    const handleShow = () => setShow(true);

    const handleSearchFriend = (e) => {
        e.preventDefault();
        const value = searchFriendRef.current.value
        axios.get(`http://localhost:3001/friends/?email=${value}`)
            .then((result) => {
                setSearchResult(result.data);
                console.log(result)
            })
    }

    function addFriend(value)  {
        setFriendsList([value, ...friendsList]);
        const updateItem = {
            email: currentUser.email,
            friend: value.email
        }
        console.log(JSON.stringify(currentUser));
        axios.patch(`${process.env.REACT_APP_SERVER_HOST}/user`, updateItem).then((result) => {
            console.log('user was updated')
        })

    }
    return (
        <div className="m-3">
            <div className="container w-50">

                <div className="input-group">
                    <input type="text"
                           className="form-control"
                           onClick={handleShow}
                           onKeyDown={handleShow}
                           placeholder="Search friend"/>
                    {/*<button className="btn btn-outline-secondary" onClick={handleSearchFriend} type="button">*/}
                    {/*    <SearchIcon/></button>*/}
                </div>
            </div>
            <Modal show={show} onHide={handleClose} className="search-friend-modal">
                <Modal.Header closeButton>
                    <form onSubmit={handleSearchFriend} >
                        <div className="input-group">
                            <input type="text"
                                   className="form-control"
                                   ref={searchFriendRef}
                                   placeholder="Search friend"
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
                                                    <button className="ms-3 btn btn-outline-primary"
                                                            onClick={() => {
                                                                addFriend(item)
                                                            }}>
                                                        Add friend
                                                    </button>
                                                    <button hidden className="ms-3 btn btn-outline-primary">Delete
                                                        friend
                                                    </button>
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
            <div>
                <h3>My friends </h3>
            </div>
            {
                <ul>
                    {
                        friendsList.map((item) => {
                            return (<li key={item._id}>
                                {item.email}
                            </li>)
                        })
                    }
                </ul>
            }
        </div>
    )
}