import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios"
import {useLocation} from "react-router-dom"
import {useAuth} from "../../../../contexts/AuthContext";
import {useSelector} from "react-redux";
import Dot3Icon from "../../../../icons/Dots3Icon";
import store from "../../../../redux/store";
import {
    addColumnAfterInCurrentWishlist,
    addRowBelowInCurrentWishlist, deleteColumnInCurrentWishlist,
    deleteRowInCurrentWishlist, updateFieldNameInCurrentWishlist,
    updateValueInCurrentWishlist,
    updateWishlist
} from "../../../../redux/redux-features/wishlists/wishlistsSlice";
import Editable from "./Editable";
import {PiShareFatDuotone, PiShareFatThin} from "react-icons/pi";
import {RxCopy} from "react-icons/rx";
import Linkify from 'react-linkify';
import {formatLinks} from "../../../helpers/utils";

export default function CustomTable() {
    const location = useLocation();
    const [wishlist, setWishlist] = useState();
    const [currentWishlistIndex, setCurrentWishlistIndex] = useState(0)
    const params = useParams();
    const wishListId = params.wishListId;
    let wishlists = useSelector(state => state.wishlists.wishlists);
    const currentWishlist = useSelector(state => state.wishlists.wishlists[currentWishlistIndex])
    const {currentUser} = useAuth();

    useEffect(() => {
        if (wishlists.length > 0) {
            console.log(wishlists)
            const foundWishlistIndex = wishlists.findIndex(item => item._id === wishListId);
            console.log(foundWishlistIndex);
            setCurrentWishlistIndex(foundWishlistIndex);
            setWishlist(currentWishlist);
        }
        // console.log('wishlists before: ' + JSON.stringify(wishlists))
        //todo: solve problem with context
        // if (wishlists.length < 1) {
        //     wishlists = getWishlistFromServer().then(
        //         (repsonse) => {
        //             wishlists = repsonse.data;
        //             const findList = wishlists.find(item => item._id === wishListId)
        //             setCurrentWishlistIndex(findList)
        //             // console.log('useEffect: ' + findList)
        //             // initVisibilityMatrix(findList)
        //         }
        //     )
        // }

    }, [location.pathname])

    const getWishlistFromServer = () => {
        return axios.get(`${process.env.REACT_AP_SERVER_HOST}/wishlists/${currentUser.email}`);
    }

    // console.log('currentWishlist' + JSON.stringify(currentWishlist))
    return (
        wishlist &&
        <WishlistTable
            wishlist={wishlist}
            setWishlist={setWishlist}
            currentWishlistIndex={currentWishlistIndex}
        />

    )

}

const WishlistTable = ({currentWishlistIndex}) => {

    const wishlist = useSelector(state => state.wishlists.wishlists[currentWishlistIndex]);
    console.log('rerender wishlist: ' + JSON.stringify(wishlist))
    const [currentFocusValue, setCurrentFocusValue] = useState();
    const [cellToEdit, setCellToEdit] = useState({})
    const [needTableSave, setNeedTableSave] = useState(false);
    const [copyLink, setCopyLink] = useState([]);
    const [showCopiedMsg, setShowCopiedMsg] = useState(false);
    const newColumnNameInputRef = useRef();


    const handleUpdateAndSave = () => {
        if (needTableSave) {
            console.log("handle save");
            store.dispatch(updateWishlist(
                {
                    newWishlist: wishlist
                }))
            setNeedTableSave(false);
        }
    }

    const handleInputTableChange = (rowIndex, columnIndex, field, e) => {
        console.log('e: ' + e.target.value);
        console.log('wishlist.content[columnIndex][rowIndex]: ' + wishlist.content[rowIndex][field]);
        // console.log('columnIndex: ' + columnIndex);
        // console.log('rowIndex: ' + rowIndex);

        if (e.target.value === wishlist.content[rowIndex][field.id]) {
            return;
        }
        const linkRegExp = new RegExp("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)(?![^<]*>|[^<>]*<\\/a>)")
        let newValue = e.target.value;
        //
        console.log(newValue)
        if (linkRegExp.test(newValue)) {
            newValue = newValue && newValue.replace(linkRegExp, (match) => {
                return '<div contenteditable="false" ><a href="' + match + '" target="_blank">' + match.slice(0,30) + '...</a></div>'
            })
        }

        store.dispatch(updateValueInCurrentWishlist(
            {
                newValue,
                currentWishlistIndex,
                index: rowIndex,
                field
            }
        ));
        setNeedTableSave(true)
    }

    const handleFieldNameChange = (columnIndex, e) => {
        store.dispatch(updateFieldNameInCurrentWishlist(
            {
                newValue: e.target.value,
                currentWishlistIndex,
                columnIndex
            }
        ));
        setNeedTableSave(true);
    }

    const addTableRow = (rowIndex) => {
        store.dispatch(addRowBelowInCurrentWishlist(
            {
                currentWishlistIndex,
                rowIndex
            }
        ));
        setNeedTableSave(true)
    }

    const deleteTableRow = (rowIndex) => {
        store.dispatch(deleteRowInCurrentWishlist(
            {
                currentWishlistIndex,
                rowIndex
            }
        ));
        setNeedTableSave(true)
    }

    const addTableColumn = (e) => {
        e.preventDefault();
        store.dispatch(addColumnAfterInCurrentWishlist(
            {
                currentWishlistIndex,
                columnIndex: currentFocusValue,
                columnName: newColumnNameInputRef.current.value
            }
        ));
        setNeedTableSave(true);
        newColumnNameInputRef.current.value = '';
    }

    const deleteTableColumn = (rowIndex) => {
        console.log('deleteColumnInCurrentWishlist start')
        store.dispatch(deleteColumnInCurrentWishlist(
            {
                currentWishlistIndex,
                rowIndex
            }
        ));
        console.log('deleteColumnInCurrentWishlist end')
        setNeedTableSave(true);
    }

    const threeDotedMenu = (rowIndex) => {
        return (
            <div className="btn-group dropend">
                <button type="button" className="btn dropdown-toggle add-row"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    <Dot3Icon/>
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => addTableRow(rowIndex)}> Add row below</a>
                    </li>
                    <li><a className="dropdown-item" href="#" onClick={() => deleteTableRow(rowIndex)}> Delete
                        current</a></li>
                </ul>
            </div>
        )
    }


    const tableHeader = (wishlist) => {
        return (
            // <span className="wl-row">
            <>
                {
                    wishlist.fields.map((field, index) =>
                        <th key={field.id}>
                            <Editable
                                html={field.name}
                                handleChange={(e) => handleFieldNameChange(index, e)}
                            />
                        </th>
                    )
                }
                <th>
                    {threeDotedMenu(0)}
                </th>
            </>
            // </span>
        )
    }

    // const resizeTextarea = (e) => {
    //     e.target.style.height = 'inherit';
    //     e.target.style.height = `${e.target.scrollHeight}px`;
    // }

    const tableRow = (wishlist, item, rowIndex) => {

        return (
            <tr>
                {
                    wishlist.fields.map((field, columnIndex) =>
                        (
                            <td>
                                <Editable
                                    html={item[field.id]}
                                    handleChange={(e) => handleInputTableChange(rowIndex, columnIndex, field, e)}
                                />
                            </td>
                        )
                    )
                }
                <td>
                    {threeDotedMenu(rowIndex)}
                </td>
            </tr>
        )

    }

    const showShareModal = () => {
        const currentOrigin = window.location.origin;
        setCopyLink(`${currentOrigin}/share-wishlist/${wishlist._id}`);
    }

    const copyText = async function (text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text)
        }
    }

    const copyLinkToClipboard = (e) => {
        // e.preventDefault();
        copyText(copyLink).then(() => {
            setShowCopiedMsg(true);
            setTimeout(() => {
                setShowCopiedMsg(false)
            }, 1500)
        })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        wishlist &&
        <>
            <div className="share-container btn-group dropstart">
                <button className="btn btn-share" data-bs-toggle="modal" data-bs-target="#copyLink"
                        onClick={() => showShareModal()}>
                    <PiShareFatDuotone size="1.5em" className="orange-icon"/>
                </button>
                <div className="modal fade" id="copyLink" tabIndex="-1" aria-labelledby="copyLinkModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="copy-link-container">
                                <a href={copyLink} target="_blank" className="copy-link">{copyLink}</a>
                                {!showCopiedMsg ? <button className="btn" onClick={() => {
                                        copyLinkToClipboard()
                                    }}>
                                        <RxCopy className="orange-icon"/>
                                    </button> :
                                    (<span className="copied-link">Copied!</span>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <table className="common-table">
                <thead>
                <tr>
                    { tableHeader(wishlist) }
                </tr>
                </thead>
                <tbody>
                {
                    wishlist.content && wishlist.content.map((item, index1) => {
                               return tableRow(wishlist, item, index1)
                        })
                }

                </tbody>
            </table>

        </>
    )
}

export
{
    WishlistTable
};