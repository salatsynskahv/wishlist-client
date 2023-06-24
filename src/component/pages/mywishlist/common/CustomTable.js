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
import ContentEditable from "react-contenteditable";
import Editable from "./Editable";

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
    // console.log('rerender wishlist: ' + JSON.stringify(wishlist))
    const [currentFocusValue, setCurrentFocusValue] = useState();
    const [cellToEdit, setCellToEdit] = useState({})
    const [needTableSave, setNeedTableSave] = useState(false);
    const [columnWidth, setColumnWidth] = useState([]);
    const newColumnNameInputRef = useRef();
    const defaultColumnWidth = 300;

    useEffect(() => {
        const newColumnWidth = []
        wishlist.fields.forEach(() => newColumnWidth.push(defaultColumnWidth));
        setColumnWidth(newColumnWidth)
    }, [wishlist]);

    const handleUpdateAndSave = () => {
        if (needTableSave) {
            console.log("handle save");
            store.dispatch(updateWishlist(
                {
                    newWishlist: wishlist,
                    currentWishlistIndex: currentWishlistIndex
                }))
            setNeedTableSave(false);
        }
    }

    const handleInputTableChange = (rowIndex, columnIndex, field, e) => {
        // console.log('e: ' + e.target.value);
        // console.log('wishlist.content[columnIndex][rowIndex]: ' + wishlist.content[rowIndex][field]);
        // console.log('columnIndex: ' + columnIndex);
        // console.log('rowIndex: ' + rowIndex);

        if (e.target.value === wishlist.content[rowIndex][field.id]) {
            return;
        }


        store.dispatch(updateValueInCurrentWishlist(
            {
                newValue: e.target.value,
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
            <span className="wl-row">
                {
                    wishlist.fields.map((field, index) =>
                        <Editable
                            width={columnWidth[index] || '300px'}
                            html={field.name}
                            handleChange={(e) => handleFieldNameChange(index, e)}
                        />
                    )
                }
                {
                    threeDotedMenu(0)
                }

            </span>
        )
    };

    // const resizeTextarea = (e) => {
    //     e.target.style.height = 'inherit';
    //     e.target.style.height = `${e.target.scrollHeight}px`;
    // }

    const tableRow = (wishlist, item, rowIndex) => {

        return <span className="wl-row">
            {wishlist.fields.map((field, columnIndex) =>
                (
                    <Editable
                        width={columnWidth[columnIndex] || '300px'}
                        html={item[field.id]}
                        handleChange={(e) => handleInputTableChange(rowIndex, columnIndex, field, e)}
                    />
                )
            )}
            {threeDotedMenu(rowIndex)}
        </span>

    }

    return (
        wishlist && columnWidth.length>0 &&
        <>
            <div className="wishlist-table">
                <h3 className="align-items-center fw-bold"> {wishlist && wishlist.name} </h3>
                <div className="bordered"
                     style={{width: `${columnWidth.reduce((prev, current) => prev + current)}px`}}
                     onMouseLeave={(e) => handleUpdateAndSave()}>
                    <div>
                        {
                            tableHeader(wishlist)
                        }

                        {
                            wishlist.content && wishlist.content.map((item, index1) => {
                                return tableRow(wishlist, item, index1)
                            })
                        }
                    </div>
                </div>
            </div>
            {/*<div className="modal fade" id="addColumnModal" tabIndex="-1" aria-hidden="true">*/}
            {/*    <div className="modal-dialog">*/}
            {/*        <div className="modal-content">*/}
            {/*            <form>*/}
            {/*                <div className="modal-body">*/}
            {/*                    <label htmlFor="name">Name</label>*/}
            {/*                    <input type="text"*/}
            {/*                           className="form-control"*/}
            {/*                           id="name"*/}
            {/*                           ref={newColumnNameInputRef}*/}
            {/*                    />*/}

            {/*                </div>*/}
            {/*                <div className="modal-footer">*/}
            {/*                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel*/}
            {/*                    </button>*/}
            {/*                    <button type="submit"*/}
            {/*                            className="btn btn-primary"*/}
            {/*                            onClick={addTableColumn}*/}
            {/*                            data-bs-dismiss="modal">*/}
            {/*                        Add*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export
{
    WishlistTable
};