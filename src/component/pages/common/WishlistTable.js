import React, {useEffect, useState} from "react";
import Linkify from "react-linkify";
import Dot3Icon from "../../../icons/Dots3Icon";
import PlusCircleDotted from "../../../icons/PlusCircleDotted";

const WishlistTable = ({wishlist, setWishlist, editMode = false, setEditMode, handleInputTableChange}) => {
    const [visibilityDotsMatrix, setVisibilityDotsMatrix] = useState();

    useEffect(() => {
        if (!wishlist) return;
        const newMatrix = []
        wishlist.content.forEach(
            (item, index1) => {
                console.log(Object.keys(item))
                newMatrix[index1] = []
                item && Object.keys(item).forEach(
                    (key, index2) => {
                        newMatrix[index1][index2] = true;
                    }
                )
            }
        )

        setVisibilityDotsMatrix(newMatrix);
        console.log("visilityMatrix: " + newMatrix)


        return () => {
            // if (!wishlist) return;
            //
            // const newItem = {
            //     _id: wishlist._id,
            //     fields: wishlist.fields,
            //     content: wishlist.content
            // }
            // // console.log('handleSave tableContent2' + JSON.stringify(newItem))
            // axios.put(`${process.env.REACT_APP_SERVER_HOST}/wishlist`, newItem)
            //     .then((response) => {
            //         console.log(response)
            //     }).catch(function (error) {
            //     console.log(error);
            // });
        }
    }, [])

    if (!wishlist) {
        return <div>Select table first</div>
    }

    const addTableRow = () => {
        const newRow = {};
        setEditMode(true)
        wishlist.fields.map(columnName => newRow[columnName] = '')
        setWishlist({
            ...wishlist,
            content: [
                ...wishlist.content,
                newRow
            ]
        });
    }

    const tableHeader = (lastColumn, index, field) => {
        if (lastColumn) {
            return (
                <td key={index}>
                    <div>
                        {field}
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                <PlusCircleDotted/>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={addTableRow}>Add row</a></li>
                                <li><a className="dropdown-item" href="#">Add column</a></li>
                            </ul>
                        </div>
                    </div>
                </td>
            )
        } else {
            return (
                <td key={index}>
                    <div>
                        {field}
                    </div>
                </td>

            )
        }
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
                            {
                                editMode &&
                                <textarea
                                    className="form-control"
                                    onChange={(e) => handleInputTableChange(index1, field, e)}
                                    defaultValue={item[field]}/>}
                            {
                                !editMode &&
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
                                                    hidden={visibilityDotsMatrix[index1][index2]}>
                                                <Dot3Icon/>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#" onClick={addTableRow}> Add row below</a></li>
                                                 <li><a className="dropdown-item" href="#">Add column after</a></li>
                                                <li><a className="dropdown-item" href="#">Change cell type</a></li>
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

                            }
                        </Linkify>
                    </td>
                )
            )
            }
        </tr>

    }
    return (
        <>
            <table className="wishlist-table bordered">
                <thead>
                <tr className="wishlist-table-body">
                    {
                        wishlist.fields.map((field, index) => {
                                return tableHeader(index === (wishlist.fields.length - 1), index, field)
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