import React, {useState} from "react";
import {Accordion} from "react-bootstrap";
import axios from "axios";
import {useSelector} from "react-redux";

const FriendsAccordion = ({currentFriendsList, setCurrentFriendsList, setSelectedList}) => {
    const friends = useSelector(state => state.friends.friends)
    console.log("FriendsAccordion friends: " + JSON.stringify(friends))
    const getFriendsWishlists = async (userEmail) => {
        console.log(`getFriendsWishlists userEMail: ${userEmail}`)
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlists/${userEmail}`);
        console.log(data)
        setCurrentFriendsList(data);
    }

    const showList = async (id) => {
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlist/${id}`);
        setSelectedList(data);
        console.log(data)
    }

    return (
            <Accordion>
                {
                    !!friends && friends.map((item, index) => {
                        return (
                            <Accordion.Item eventKey={index} key={item}>
                                <Accordion.Header onClick={() => getFriendsWishlists(item)}>
                                    {item}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {
                                            currentFriendsList.map(item => {
                                                    return (
                                                        <li key={item._id}>
                                                            <a onClick={() => showList(item._id)} href="#">{item.name}</a>
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
    );
}

export default FriendsAccordion;