import React, {useEffect, useRef, useState} from "react";
import {Form} from "react-bootstrap";
import {Button} from "@mui/material";
import store from "../../../redux/store";
import {createWishlist} from "../../../redux/redux-features/wishlists/wishlistsSlice";
import {useSelector} from "react-redux";
import {selectUser} from "../../../redux/redux-features/user/userSlice";
import PlusCircleDotted from "../../../icons/PlusCircleDotted";
import {v4 as uuidv4} from "uuid";


const NewWishlist = ({show, setShow}) => {
    const ObjectID = require("bson-objectid");
    const currentUser = useSelector(selectUser);
    const wishlistNameRef = useRef(null);
    const [name, setName] = React.useState("");
    const [fields, setFields] = useState([])
    const [tableContent, setTableContent] = useState([])

    // useEffect(() => {
    //     const fieldNameObj = {id: generateFieldID(), name: 'Name'}
    //     const fieldLinkObj = {id: generateFieldID(), name: 'Link'}
    //     const defaultFields = [fieldNameObj, fieldLinkObj];
    //     setFields(defaultFields);
    // }, []);

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
        setShow(false);
        resetTable();
    }

    const addField = (fieldName) => {
        if (!fieldName) {
            return;
        }
        const fieldId = generateFieldID();
        const fieldObj = {id: fieldId, name: fieldName}
        setFields([...fields, fieldObj])
        const newTable = tableContent.map(item => {
            return {...item, ...{[fieldId]: ''}}
        })
        setTableContent(newTable)
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
                    {/*<button*/}
                    {/*    onClick={createDefaultColumns}*/}
                    {/*    ref={defaultNewTableBtnRef}*/}
                    {/*    className="btn btn-link default-table-btn"*/}
                    {/*>*/}
                    {/*    Create default table*/}
                    {/*</button>*/}
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
                <div style={{marginTop: '20px'}} className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="privateCheck"/>
                    <label className="form-check-label" htmlFor="privateCheck"> Private list </label>
                    {/*todo: fix, does not work popover*/}
                    {/*<button type="button" className="btn-popover" data-container="body" data-toggle="popover"*/}
                    {/*        data-placement="top"*/}
                    {/*        data-content="Private list will not appear in search results of your friends">*/}
                    {/*   <InfoCircleIcon/>*/}
                    {/*</button>*/}
                </div>
                <div style={{marginTop: '20px'}}>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                    <Button onClick={closeHandler}> Close </Button>
                </div>
            </form>
            <div className="new-wl-item">
                <div className="inner">
                    {
                        <div onClick={
                            () => {
                                wishlistNameRef.current.focus();
                            }
                        }>
                            <h4><strong>{!name ? "Please, enter Wishlist Name" : name}</strong></h4>
                        </div>
                    }
                </div>
                <NewWishlistTable
                    fields={fields}
                    setFields={setFields}
                    tableContent={tableContent}
                    setTableContent={setTableContent}
                />
                {/*<div contentEditable="true" role="textbox" style={{width: '100px', border: '1px solid black', pointer: 'cursor'}}></div>*/}
            </div>
        </div>

    )
}

function generateFieldID() {
    const result = uuidv4().substr(0, 16);
    console.log('result uuidv4: ' + result);
    return result;
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
                                   addCustomField(event);
                               }
                           }}
                           onChange={(event) => {
                               setField(event.target.value)
                           }}/>
                    <button onClick={addCustomField} className="btn btn-outline-primary btn-add">Add</button>
                </div>
            </div>
            {/*<div className="align-items-center" style={{paddingTop: '33px'}}>*/}
            {/*</div>*/}
        </div>

    </>)
}

const NewWishlistTable = ({fields, setFields, tableContent, setTableContent}) => {
    // const [headers, setHeaders] = useState(fields);
    // const [content, setContent] = useState([])
    console.log('NewWishlistTable')
    const [columnWidths, setColumnWidths] = useState([]);
    useEffect(() => {
        //     const fieldNameObj = {id: generateFieldID(), name: 'Name'}
        //     const fieldLinkObj = {id: generateFieldID(), name: 'Link'}
        //     const defaultFields = [fieldNameObj, fieldLinkObj];
        //     setFields(defaultFields);
        if (fields.length === 0) {
                const fieldNameObj = {id: generateFieldID(), name: 'Name'}
                const fieldLinkObj = {id: generateFieldID(), name: 'Link'}
                const defaultFields = [fieldNameObj, fieldLinkObj];
                setFields(defaultFields);
            // addNewRow();
        }
    }, []);

    useEffect(() => {
        console.log('rerender columnWidth')
        const newValue = [];
        fields.forEach(() => newValue.push(95 / fields.length));
        setColumnWidths(newValue);
        console.log('columnW: ' + columnWidths);
    }, [fields])

    const editHeader = (e, index) => {
        console.log('e.target.value: ' + e.target.value);
        // if(e.target.value === ''){
        //     console.log('remove');
        //     setFields(fields.splice(index, 1));
        //     console.log('after delete: ' + fields.length);
        //     return
        // }
        const fieldToEdit = fields[index];
        fields[index] = {...fieldToEdit, name: e.target.value};
        setFields(fields);
    }

    const addNewRow = () => {
        const newRow = {}
        fields.forEach(item => newRow[item.id] = '')
        setTableContent([...tableContent, newRow]);
    }

    const editRowContent = (index1, index2, e) => {
        console.log('index1: ' + index1);
        console.log('index2: ' + index2);
        const row = tableContent[index1]
        const key = Object.keys(row)[index2]
        row[key] = e.target.value
        setTableContent(tableContent)
        console.log('setTableData tableContent2' + JSON.stringify(tableContent))
        console.log('row' + JSON.stringify(row))
    }

    const resizeTextarea = (e) => {
        e.target.style.height = '50px';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    return (
        <div className="new-wl-table">
            {/*<table>*/}
            {/*    <thead>*/}
            <div className="new-wl-header">
                {/*todo: add onChange*/}
                {fields.map((value, index) =>
                    (
                        <input
                            key={index}
                            type="text"
                            style={{width: `${columnWidths[index]}%`}}
                            onChange={(e) => editHeader(e, index)}
                            defaultValue={value.name}
                        />
                    ))}

                <span className="addRow"
                      onClick={addNewRow}>
                        <PlusCircleDotted/>
                    </span>
            </div>
            <div>
                {
                    tableContent.map((row, index1) =>
                        <div className="new-wl-row">
                            {
                                fields.map((field, index2) =>
                                    <textarea
                                        key={field.id}
                                        style={{width: `${columnWidths[index2]}%`}}
                                        defaultValue={row[field.id]}
                                        onChange={e => editRowContent(index1, index2, e)}
                                        onKeyUp={e => resizeTextarea(e)}
                                    />
                                )
                            }
                        </div>
                    )
                }
            </div>
            {/*    </thead>*/}
            {/*    <tr>*/}

            {/*    </tr>*/}
            {/*</table>*/}

        </div>)

}
export default NewWishlist;