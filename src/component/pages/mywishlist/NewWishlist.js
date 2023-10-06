import React, {useEffect, useState} from "react";
import store from "../../../redux/store";
import {createWishlist} from "../../../redux/redux-features/wishlists/wishlistsSlice";
import {useSelector} from "react-redux";
import {selectUser} from "../../../redux/redux-features/user/userSlice";
import PlusCircleDotted from "../../../icons/PlusCircleDotted";
import {v4 as uuidv4} from "uuid";


const NewWishlist = () => {
    const ObjectID = require("bson-objectid");
    const currentUser = useSelector(selectUser);
    const [name, setName] = React.useState("");
    const [fields, setFields] = useState([]);

    const createWishList = () => {
        console.log("submit form - save row")
        const newItemId = ObjectID();
        let contentLocal = {};
        fields.forEach(field => contentLocal[field.id] = '');
        console.log(contentLocal);
        const newList = {
            _id: newItemId.toHexString(),
            name: name,
            fields: fields,
            user: currentUser.email,
            content: [{}]
        }
        store.dispatch(createWishlist({newList}));
        resetTable();
    }


    const resetTable = () => {
        setName('');
        const fieldNameObj = {id: generateFieldID(), name: 'Name'}
        const fieldLinkObj = {id: generateFieldID(), name: 'Link'}
        setFields([fieldNameObj, fieldLinkObj]);
    }

    return (
        <div className="modal fade" id="newWishlist" tabIndex="-1"
             aria-labelledby="newWishlistLabel" aria-hidden="true">
            {/*<form onSubmit={createWishList}>*/}
            {/*    <Form.Group>*/}
            {/*        /!*<button*!/*/}
            {/*        /!*    onClick={createDefaultColumns}*!/*/}
            {/*        /!*    ref={defaultNewTableBtnRef}*!/*/}
            {/*        /!*    className="btn btn-link default-table-btn"*!/*/}
            {/*        /!*>*!/*/}
            {/*        /!*    Create default table*!/*/}
            {/*        /!*</button>*!/*/}
            {/*        <label htmlFor="name" className="w-label" ref={wishlistNameRef}>Wishlist Name</label>*/}
            {/*        <input type="text"*/}
            {/*               required*/}
            {/*               id="name"*/}
            {/*               className="form-control"*/}
            {/*               value={name}*/}
            {/*               onChange={(event) => {*/}
            {/*                   setName(event.target.value)*/}
            {/*               }}*/}
            {/*        />*/}
            {/*    </Form.Group>*/}
            {/*    <br/>*/}
            {/*    <FieldNames addField={addField}/>*/}
            {/*    <div style={{marginTop: '20px'}} className="form-check">*/}
            {/*        <input className="form-check-input" type="checkbox" value="" id="privateCheck"/>*/}
            {/*        <label className="form-check-label" htmlFor="privateCheck"> Private list </label>*/}
            {/*        /!*todo: fix, does not work popover*!/*/}
            {/*        /!*<button type="button" className="btn-popover" data-container="body" data-toggle="popover"*!/*/}
            {/*        /!*        data-placement="top"*!/*/}
            {/*        /!*        data-content="Private list will not appear in search results of your friends">*!/*/}
            {/*        /!*   <InfoCircleIcon/>*!/*/}
            {/*        /!*</button>*!/*/}
            {/*    </div>*/}
            {/*    <div style={{marginTop: '20px'}}>*/}
            {/*        <Button type="submit" variant="contained">*/}
            {/*            Save*/}
            {/*        </Button>*/}
            {/*        <Button onClick={closeHandler}> Close </Button>*/}
            {/*    </div>*/}
            {/*</form>*/}
            <div className="modal-dialog">
                <div className="modal-content new-wl-container">

                        <div className="new-wl-item">
                            <div className="inner">
                                <input type="text"
                                       className="wishlist-name"
                                       required
                                       id="name"
                                       placeholder="Please, enter wishlist name"
                                       value={name}
                                       onChange={(event) => {
                                           setName(event.target.value)
                                       }}
                                />
                            </div>
                            <NewWishlistTable
                                fields={fields}
                                setFields={setFields}
                            />
                            <div className="submit-button-container">
                                <button className="btn btn-primary" type="button" onClick={createWishList}> Create Wishlist</button>
                            </div>

                        </div>
                </div>
            </div>
        </div>

    )
}

function generateFieldID() {
    const result = uuidv4().substr(0, 16);
    console.log('result uuidv4: ' + result);
    return result;
}

const NewWishlistTable = ({fields, setFields}) => {
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

    const addNewField = () => {
        const fieldNew = {id: generateFieldID(), name: 'New Column'};
        setFields([...fields, fieldNew]);
    }

    // const editRowContent = (index1, index2, e) => {
    //     console.log('index1: ' + index1);
    //     console.log('index2: ' + index2);
    //     const row = tableContent[index1]
    //     const key = Object.keys(row)[index2]
    //     row[key] = e.target.value
    //     setTableContent(tableContent)
    //     console.log('setTableData tableContent2' + JSON.stringify(tableContent))
    //     console.log('row' + JSON.stringify(row))
    // }

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
                      onClick={addNewField}>
                        <PlusCircleDotted/>
                    </span>
            </div>

        </div>)

}
export default NewWishlist;