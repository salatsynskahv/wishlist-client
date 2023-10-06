import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {updateWishlist} from "../../../redux/redux-features/wishlists/wishlistsSlice";

export default function ShareWishlist() {
    const {wishlistId} = useParams();
    const [wishlist, setWishlist] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlist/${wishlistId}`).then(
            result => {
                const wishlist = result.data;
                if (wishlist.fields.indexOf(field => field.id === 'booked') < -1) {
                    console.log("Find");
                    wishlist.fields.push({id: 'booked', name: 'Booked'});
                }
                setWishlist(result.data);
                console.log(result.data);
            }
        );

    }, []);

    const formatLinks = (input) => {
        if(!input) {
            return ;
        }
        const regLinks = new RegExp("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})");

        const result = input && input.replace(regLinks, (match) => {
            return '<a href="' + match + '">' + match.slice(0,30) + '...</a>'
        });
        return result;
    }

    const updateAvailability = (e, item) => {
        // console.log(item);
        // console.log(e.target.value);
        item['booked'] = 'booked' === e.target.value;
        dispatch(updateWishlist({newWishlist: wishlist}));
    }

    return (<>

        {
            wishlist &&
            <div className="share-wishlist-wrapper">
                <div className="table-container">
                    <table>
                        <caption>
                            {wishlist.name}
                        </caption>
                        <thead>
                        <tr>
                            {
                                wishlist.fields.map(field =>
                                    (<th key={field.id}>{field.name}</th>))
                            }
                              <th>Booked</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            wishlist.content.map(item =>
                                (
                                    <tr key={item._id}>
                                        {
                                            wishlist.fields.map(field => (
                                                (<td key={field.id}
                                                     data-cell={field.name}
                                                     dangerouslySetInnerHTML={{__html: formatLinks(item[field.id])}}>
                                                </td>)
                                            ))
                                        }
                                        <td>
                                            <select name="booked"
                                                    id="booked"
                                                    onChange={(e) => updateAvailability(e, item)}
                                            >
                                                <option value="available" style={{backgroundColor: "green"}}>Available
                                                </option>
                                                <option value="booked" selected={item.booked && JSON.parse(item.booked)}
                                                        style={{backgroundColor: "red"}}>Booked
                                                </option>
                                            </select>
                                        </td>
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