import React, {useEffect, useRef, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios"
import {useLocation} from "react-router-dom"
import {useAuth} from "../../../contexts/AuthContext";
import {useSelector} from "react-redux";
import Linkify from "react-linkify";
import Dot3Icon from "../../../icons/Dots3Icon";
import PlusCircleDotted from "../../../icons/PlusCircleDotted";
import store from "../../../app/store";
import {
    addColumnAfterInCurrentWishlist,
    addRowBelowInCurrentWishlist, deleteColumnInCurrentWishlist,
    deleteRowInCurrentWishlist,
    updateValueInCurrentWishlist,
    updateWishlist
} from "../../../features/wishlists/wishlistsSlice";

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
        if (wishlists.length > 1) {
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
        wishlist && <>
            <div className="container">

                <WishlistTable
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    currentWishlistIndex={currentWishlistIndex}
                />
            </div>
        </>
    )

}

const WishlistTable = ({currentWishlistIndex}) => {

    const wishlist = useSelector(state => state.wishlists.wishlists[currentWishlistIndex]);
    console.log('rerender wishlist: ' + JSON.stringify(wishlist))
    const [currentFocusValue, setCurrentFocusValue] = useState();
    const [cellToEdit, setCellToEdit] = useState({})
    const [needTableSave, setNeedTableSave] = useState(false);
    const newColumnNameInputRef = useRef();

    const handleUpdateAndSave = () => {
        store.dispatch(updateWishlist(
            {
                newWishlist: wishlist,
                currentWishlistIndex: currentWishlistIndex
            }))
        setNeedTableSave(false);
    }

    const handleInputTableChange = (index1, field, e) => {

        store.dispatch(updateValueInCurrentWishlist(
            {
                newValue: e.target.value,
                currentWishlistIndex,
                index1,
                field
            }
        ));
        setNeedTableSave(true)
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

    const tableHeader = (index, field) => {
        return (
            <td key={index}>
                <div className="table-cell">
                    {field}
                </div>
                <div className="btn-group fl-right">
                    <button type="button"
                            className="btn btn-link"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <PlusCircleDotted/>
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <a
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target='#addColumnModal'
                                href="#"
                                onClick={() => setCurrentFocusValue(index)}
                            >
                                Add Column After
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item"
                               href="#"
                               onClick={() => deleteTableColumn(index)}>
                                Delete Current Column
                            </a>
                        </li>
                    </ul>
                </div>
            </td>
        )
    }

    const rowMenuCell = (index1) => {
        return (
            <div className="btn-group">
                <button type="button"
                        className="btn btn-link"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                    <Dot3Icon/>
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#"
                           onClick={() => addTableRow(index1)}>
                            Add row below
                        </a>
                    </li>
                    <li><a className="dropdown-item" href="#"
                           onClick={() => deleteTableRow(index1)}> Delete current row </a>
                    </li>
                    {/*<li><a className="dropdown-item" href="#">Add column after</a></li>*/}
                    {/*<li><a className="dropdown-item" href="#">Change cell type</a></li>*/}
                </ul>
            </div>
        );
    }

    const tableRow = (wishlist, item, index1) => {
        return <tr key={index1}>
            {wishlist.fields.map((field, index2) =>
                (
                    <td key={index2}
                        onMouseLeave={(e) => {
                            // setDotsHidden(index1, index2);
                            if (needTableSave) {
                                setCellToEdit({});
                                handleUpdateAndSave(wishlist)
                                setNeedTableSave(false)
                            }
                        }}
                        onDoubleClick={() => setCellToEdit({index1: index1, index2: index2})}
                    >
                        {
                            !(cellToEdit.index1 === index1 && cellToEdit.index2 === index2) &&
                            <Linkify
                                componentDecorator={(
                                    decoratedHref,
                                    decoratedText,
                                    key) => (
                                    <a href={decoratedHref} key={key} target="_blank">
                                        {decoratedText}
                                    </a>
                                )}>

                                <div className="table-cell">
                                    <span>
                                        {item[field]}
                                    </span>
                                </div>
                            </Linkify>
                        }
                        {
                            cellToEdit.index1 === index1 && cellToEdit.index2 === index2 &&
                            <input
                                className="form-control-plaintext"
                                onChange={(e) => handleInputTableChange(index1, field, e)}
                                defaultValue={item[field]}
                            />
                        }
                    </td>
                )
            )
            }
            <td> {rowMenuCell(index1)}</td>

        </tr>

    }
    return (
        <>
            <div className="mb-4">
                <h3 className="align-items-center fw-bold"> {wishlist.name} </h3>
            </div>
            <div className="modal fade" id="addColumnModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-body">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       ref={newColumnNameInputRef}
                                />

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel
                                </button>
                                <button type="submit"
                                        className="btn btn-primary"
                                        onClick={addTableColumn}
                                        data-bs-dismiss="modal">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <table className="wishlist-table bordered">
                <thead>
                <tr className="wishlist-table-body">
                    {
                        wishlist.fields.map((field, index) => {
                                return tableHeader(index, field)
                            }
                        )
                    }
                    <th></th>
                </tr>
                </thead>
                {
                    wishlist.content &&
                    <tbody className="table-group-divider">
                    {
                        wishlist.content.map((item, index1) => {
                            return tableRow(wishlist, item, index1)
                        })
                    }
                    </tbody>
                }
            </table>
        </>
    )
}

export {WishlistTable};