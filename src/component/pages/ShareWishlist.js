import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";

export default function ShareWishlist() {
    const {wishlistId} = useParams();
    const [wishlist, setWishlist] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlist/${wishlistId}`).then(
            result => {
                setWishlist(result.data);
                console.log(result.data);
            }
        );

    }, []);

    const formatLinks = (input) => {
        const regLinks = new RegExp("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})");

       const result = input.replace(regLinks, (match) => {
            console.log("MAAAAAAA  " + match);
            return '<a href="' + match + '">' + match + '</a>'
        });

       console.log(result);

       return result;
    }


    return (<>

        {
            wishlist &&
            <div className="share-wishlist-wrapper">
                <table>
                    <thead>
                    <caption>
                        {wishlist.name}
                    </caption>
                    <tr> {wishlist.fields.map(field => (<th key={field.id}>{field.name}</th>))}
                    <th>Booked</th></tr>
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
                                    <td style={{backgroundColor: 'green'}}></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
        }
    </>)
}