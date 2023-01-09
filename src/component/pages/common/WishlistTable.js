import React, {useEffect, useRef, useState} from "react";
import Linkify from "react-linkify";
import Dot3Icon from "../../../icons/Dots3Icon";
import PlusCircleDotted from "../../../icons/PlusCircleDotted";
import axios from "axios";

const WishlistTable = ({
                           wishlist,
                           setWishlist,
                           handleInputTableChange,
                           visibilityDotsMatrix,
                           setVisibilityDotsMatrix
                       }) => {


    const [currentFocusValue, setCurrentFocusValue] = useState();
    const newColumnNameInputRef = useRef();

    if (!wishlist) {
        return <div>Select table first</div>
    }
    const handleUpdateAndSave = (wishlist) => {
        setWishlist(wishlist);
        const newItem = {
            _id: wishlist._id,
            fields: wishlist.fields,
            content: wishlist.content
        }
        // console.log('handleSave tableContent2' + JSON.stringify(newItem))
        axios.put(`${process.env.REACT_APP_SERVER_HOST}/wishlist`, newItem)
            .then((response) => {
                console.log(response)
            }).catch(function (error) {
            console.log(error);
        });
    }

    const updateVisibilityMatrix = () => {
        const copyVisibilityMatrix = [...visibilityDotsMatrix];
        const newVisibilityRow = [];
        console.log("updateVisibilityMatrix: " + JSON.stringify(wishlist))
        wishlist.fields.forEach((item, index) => newVisibilityRow[index] = true);
        console.log("New Visibilty Row: " + newVisibilityRow)
        copyVisibilityMatrix[wishlist.content.length] = newVisibilityRow
        setVisibilityDotsMatrix(copyVisibilityMatrix);
    }

    const addTableRow = (index) => {
        const newRow = {};
        wishlist.fields.map(columnName => newRow[columnName] = '')
        const newContent = [...wishlist.content];
        newContent.splice(index + 1, 0, newRow)
        const newWishlist = {
            ...wishlist,
            content: newContent
        }
        handleUpdateAndSave(newWishlist);
        updateVisibilityMatrix(newWishlist)
    }

    const deleteTableRow = (inputIndex) => {
        const filteredContent = wishlist.content.filter((item, index) => index !== inputIndex)
        const newWishlist = {...wishlist, content: filteredContent}
        handleUpdateAndSave(newWishlist)
        updateVisibilityMatrix(newWishlist)
    }

    const addTableColumn = (e) => {
        e.preventDefault();
        insertAfterIndexField(currentFocusValue, newColumnNameInputRef.current.value);
        console.log('newColumnNameInputRef.current.value: ' + newColumnNameInputRef.current.value);
        newColumnNameInputRef.current.value = '';
    }

    const insertAfterIndexField = (index, value) => {
        const newFields = [...wishlist.fields];
        newFields.splice(index + 1, 0, value)
        console.log(value)
        handleUpdateAndSave({
            ...wishlist,
            fields: newFields
        })
    }

    const deleteTableColumn = (index) => {
        const newFields = [...wishlist.fields];
        newFields.splice(index, 1)
        handleUpdateAndSave({
            ...wishlist,
            fields: newFields
        })
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

    const changeVisibility = (index1, index2, value) => {
        const copy = [...visibilityDotsMatrix];
        copy[index1][index2] = value;
        setVisibilityDotsMatrix(copy);
    }
    const setDotsVisible = (index1, index2) => {
        changeVisibility(index1, index2, false)
    }

    const setDotsHidden = (index1, index2) => {
        changeVisibility(index1, index2, true)
    }

    const tableRow = (wishlist, item, index1) => {
        return <tr key={index1}>
            {wishlist.fields.map((field, index2) =>
                (
                    <td key={index2}
                        onMouseOver={(e) => setDotsVisible(index1, index2)}
                        onMouseLeave={(e) => setDotsHidden(index1, index2)}>
                        <Linkify
                            componentDecorator={(
                                decoratedHref,
                                decoratedText,
                                key) => (
                                <a href={decoratedHref} key={key} target="_blank">
                                    {decoratedText}
                                </a>
                            )}
                        >
                            {/*{*/}
                            {/*    editMode &&*/}
                            {/*    <textarea*/}
                            {/*        className="form-control"*/}
                            {/*        onChange={(e) => handleInputTableChange(index1, field, e)}*/}
                            {/*        defaultValue={item[field]}/>}*/}
                            {/*{*/}
                            <div className="table-cell">
                                    <span>
                                        {item[field]}
                                    </span>
                                {
                                    visibilityDotsMatrix &&
                                    <div className="btn-group">
                                        <button type="button"
                                                className="btn btn-link"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={{visibility: visibilityDotsMatrix[index1][index2] ? 'hidden' : 'visible'}}>
                                            <Dot3Icon/>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item" href="#"
                                                   onClick={
                                                       () => addTableRow(index1)
                                                   }>
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
                                    // <div className="btn-group">
                                    //     <button type="button"
                                    //             className="btn btn-link dot3-button dropdown-toggle"
                                    //             data-toggle="dropdown"
                                    //             aria-haspopup="true"
                                    //             aria-expanded="false">
                                    //         <Dot3Icon/>
                                    //     </button>
                                    //     <ul className="dropdown-menu">
                                    //         <li><a className="dropdown-item" href="#" onClick={addTableRow}> Add row below</a></li>
                                    //         <li><a className="dropdown-item" href="#">Add column after</a></li>
                                    //         <li><a className="dropdown-item" href="#">Change cell type</a></li>
                                    //     </ul>
                                    //  </div>
                                }

                            </div>
                        </Linkify>
                    </td>
                )
            )
            }
        </tr>

    }
    return (
        <>
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

export default WishlistTable;