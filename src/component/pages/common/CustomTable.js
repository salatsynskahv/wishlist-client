import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {useUsersWishlists} from "../../contexts/UsersWishlistsContext";
import Linkify from 'react-linkify'

export default function CustomTable() {
    // const [currentWishlist, setCurrentWishlist] = useState()
    const params = useParams()
    const wishListId = params.wishListId;
    const {wishlists} = useUsersWishlists();
    console.log('typeof wishListId' +  typeof wishListId);

    console.log('currentWishlist' + JSON.stringify(wishlists))
    const currentWishlist = wishlists.find(item => {console.log('typeof item._id in find: '+ typeof item._id ); return item._id === wishListId})
    // useEffect(() => {
    //     const findList = wishlists.find(item => item._id === wishListId)
    //     setCurrentWishlist(findList)
    //     console.log('useEffect: '+ findList)
    // }, )


    console.log('currentWishlist' + JSON.stringify(currentWishlist))
    return (
        currentWishlist && <>
            <div className="container">
                <div>{currentWishlist.name}</div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                        <tr>{
                            currentWishlist.fields.map((field, index) =>
                                (<td key={index}>
                                    {field}
                                </td>)
                            )
                        }</tr>
                        </thead>
                        {currentWishlist.content && <tbody className="table-group-divider">
                        {
                            currentWishlist.content.map((item, index1) =>
                                (<tr key={index1}>
                                        {currentWishlist.fields.map((field, index2) =>
                                            (<td key={index2}>
                                                <Linkify component='input'>
                                                    {/*<input*/}
                                                    {/*    className="form-control-plaintext"*/}
                                                    {/*    // onChange={(e) => setTableData(index1, index2, e)}*/}
                                                    {/*    defaultValue={item[field]}*/}
                                                    {/*    type='url'/>*/}
                                                    <span onClick={() => {
                                                        console.log(index1 + ' ' + index2 + 'clicked')
                                                    }}
                                                          onMouseLeave={() => {
                                                              console.log(index1 + ' ' + index2 + 'mouseLeft')
                                                          }}>
                                                        {item[field]}
                                                    </span>
                                                </Linkify>
                                            </td>)
                                        )}
                                    </tr>
                                )
                            )
                        }
                        </tbody>}
                    </table>
                </div>
            </div>
        </>
    )

}