import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {updateWishlist} from "../../../redux/redux-features/wishlists/wishlistsSlice";

export default function ShareWishlist() {
    const {wishlistId} = useParams();
    const [wishlist, setWishlist] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlist/${wishlistId}`).then(
            result => {
                const wishlist = result.data;
                // console.log(wishlist.fields.indexOf(field => {
                //         return field.id === 'booked'
                //     }
                // ));
                // if (wishlist.fields.indexOf(field => field.id === 'booked') < 0) {
                //     console.log("Find");
                //     wishlist.fields.push({id: 'booked', name: 'Booked'});
                // }
                setWishlist(wishlist);
                console.log(result.data);
            }
        );

    }, []);

    const formatLinks = (input) => {
        if (!input) {
            return;
        }
        const regLinks = new RegExp("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})");

        const result = input && input.replace(regLinks, (match) => {
            return '<a href="' + match + '">' + match.slice(0, 30) + '...</a>'
        });
        return result;
    }

    const updateAvailability = (e, item) => {
        // console.log(item);
        // console.log(e.target.value);
        item['booked'] = 'booked' === e.target.value;
        const params = {
            _id: wishlistId,
            fields: wishlist.fields,
            content: wishlist.content
        };
        axios.put(`${process.env.REACT_APP_SERVER_HOST}/wishlist`, params);
    }

    return (<>

        {
            wishlist &&
            <div className="share-wishlist-wrapper">
               <h3>{wishlist.name}</h3>
                <div className="table-container">
                    <table>
                        {/*<caption>*/}
                        {/*    {wishlist.name}*/}
                        {/*</caption>*/}
                        <thead>
                        <tr>
                            {
                                wishlist.fields.map(field =>
                                    (<th key={field.id}>{field.name}</th>)
                                )
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            wishlist.content.map(item =>
                                (
                                    <tr key={item._id}>
                                        {
                                            wishlist.fields.map(field => {
                                                if (field.name === 'Booked') {
                                                    return (<td>
                                                        <select name="booked"
                                                                id="booked"
                                                                value={item[field]}
                                                                onChange={(e) => updateAvailability(e, item)}
                                                        >
                                                            <option value="available"
                                                                    style={{backgroundColor: "green"}}>
                                                                Available
                                                            </option>
                                                            <option value="booked"
                                                                    selected={item.booked && JSON.parse(item.booked)}
                                                                    style={{backgroundColor: "red"}}>
                                                                Booked
                                                            </option>
                                                        </select>
                                                    </td>)
                                                } else {
                                                    return (
                                                        <td key={field.id}
                                                            data-cell={field.name}
                                                            dangerouslySetInnerHTML={{__html: item[field.id]}}></td>
                                                    )
                                                }
                                            })
                                        }
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        }
    </>)
}