import React, {useRef, useState} from "react";
import {useAuth} from "../../../contexts/AuthContext";
import axios from "axios";
import {Container, Form} from "react-bootstrap";
import {Button} from "@mui/material";
import store from "../../../app/store";
import {createWishlist} from "../../../features/wishlists/wishlistsSlice";

const NewWishlist = ({show, setShow}) => {
    const ObjectID = require("bson-objectid")
    const {currentUser} = useAuth()
    const defaultNewTableBtnRef = useRef(null);
    const wishlistNameRef = useRef(null);
    const [name, setName] = React.useState("");
    const [fields, setFields] = React.useState([])
    const [tableContent, setTableContent] = React.useState([{}])
    const createWishList = () => {
        console.log("submit form - save row")
        const newItemId = ObjectID();
        const newList = {
            _id: newItemId.toHexString(),
            name: name,
            fields: fields,
            user: currentUser.email,
            content: tableContent
        }
        store.dispatch(createWishlist({
            newList
        }))
        setShow(false)
    }

    const setTableData = (index1, index2, e) => {
        const row = tableContent[index1]
        const key = Object.keys(row)[index2]
        row[key] = e.target.value
        setTableContent(tableContent)
        console.log('setTableData tableContent2' + JSON.stringify(tableContent))
        console.log('row' + JSON.stringify(row))
    }

    const addField = (field) => {
        if (!field) {
            return;
        }
        setFields([...fields, field])
        const newTable = tableContent.map(item => {
            return {...item, ...{[field]: ''}}
        })
        setTableContent(newTable)
        console.log("tableContent: " + JSON.stringify(tableContent))
    }

    const createDefaultColumns = () => {
        if (fields.length > 1) {
            return;
        }
        setFields([...fields, 'name', 'link', 'comment'])
        console.log(fields)
        const newTable = tableContent.map(item => {
            return {...item, ...{name: '', link: '', comment: ''}}
        })
        setTableContent(newTable)
        defaultNewTableBtnRef.current.disabled = true;
        console.log(fields)
        console.log("tableContent: " + JSON.stringify(tableContent))
    }

    const resetTable = () => {
        setName('');
        setFields([]);
        setTableContent([]);
    }

    const closeHandler = () => {
        setShow(false);
        resetTable();
    }

    return (show &&
        <div className="new-wl-container m-3">
            <form onSubmit={createWishList}>
                <Form.Group>
                    <button
                        onClick={createDefaultColumns}
                        ref={defaultNewTableBtnRef}
                        className="btn btn-link default-table-btn"
                    >
                        Create default table
                    </button>
                    <label htmlFor="name" className="w-label" ref={wishlistNameRef}>Wishlist Name</label>
                    <input type="text"
                           required
                           id="name"
                           className="form-control"
                           value={name}
                           onChange={(event) => {
                               setName(event.target.value)
                           }}
                    />
                </Form.Group>
                <br/>
                <FieldNames addField={addField}/>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="privateCheck"/>
                    <label className="form-check-label" htmlFor="privateCheck"> Private list </label>
                </div>
                <div style={{marginTop: '20px'}}>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                    <Button onClick={closeHandler}> Close </Button>
                </div>
            </form>
            <div className="new-wl-item">
                <div>
                    {
                        <div onClick={
                            () => {
                                wishlistNameRef.current.focus();
                            }
                        }>
                            <h4><strong>{!name  ? "Please, enter Wishlist Name" : name}</strong></h4>
                        </div>
                    }
                </div>
                <div>
                    {fields.length > 0 && <table className="wishlist-table bordered">
                        <thead>
                        <tr className="wishlist-table-body">{
                            fields.map((field, index) =>
                                (<td key={index}>
                                    {field}
                                </td>)
                            )
                        }</tr>
                        </thead>
                        <tbody className="table-group-divider">
                        {
                            tableContent.map((item, index1) =>
                                (<tr key={index1}>
                                        {fields.map((field, index2) => {
                                                return (
                                                    <td key={index2}>
                                                        <input
                                                            className="form-control-plaintext"
                                                            onChange={(e) => setTableData(index1, index2, e)}
                                                            type='text'/>
                                                    </td>
                                                )
                                            }
                                        )}
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                    }
                </div>

            </div>
        </div>

    )
}

const FieldNames = ({addField}) => {
    const [field, setField] = useState("")
    const addCustomField = (event) => {
        addField(field)
        setField('');
        event.preventDefault();
    }

    return (<>
        <div className="row g-2">
            <div className="col-auto">
                <label htmlFor="fields"
                       className="w-label">
                    Add custom column:
                </label>
                <div className='input-group'>
                    <input type="text"
                           className="form-control"
                           id="fields"
                           value={field}
                           onKeyPress={(event) => {
                               console.log('event.key: ' + event.key)
                               if (event.key === "Enter") {
                                   console.log('event.target.value: ' + event.target.value)
                                   setField(event.target.value)
                                   addCustomField()
                               }
                           }}
                           onChange={(event) => {
                               setField(event.target.value)
                           }}/>
                    <button onClick={addCustomField} className="btn btn-outline-secondary">Add</button>
                </div>
            </div>
            {/*<div className="align-items-center" style={{paddingTop: '33px'}}>*/}
            {/*</div>*/}
        </div>

    </>)
}

export default NewWishlist;