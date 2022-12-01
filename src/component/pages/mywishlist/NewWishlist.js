import React, {useState} from "react";
import {useAuth} from "../../../contexts/AuthContext";
import axios from "axios";
import {Container, Form} from "react-bootstrap";
import {Button} from "@mui/material";

const NewWishlist = ({rows, setRows, show, setShow}) => {
    const ObjectID = require("bson-objectid")
    const {currentUser} = useAuth()
    const [name, setName] = React.useState("");
    const [fields, setFields] = React.useState([])
    const [tableContent, setTableContent] = React.useState([{}])
    const createWishList = () => {
        console.log("submit form - save row")
        const newItemId = ObjectID();
        const newItem = {
            _id: newItemId.toHexString(),
            name: name,
            fields: fields,
            user: currentUser.email,
            content: tableContent
        }
        axios.post(`${process.env.REACT_APP_SERVER_HOST}/wishlist`, newItem)
            .then((response) => {
                console.log(response)
            }).catch(function (error) {
            console.log(error);
        });
        setRows([...rows, {...newItem}])
        setName("")
        setFields([])
        setTableContent([{}])
        setShow(false)
    }

    const setTableData = (index1, index2, e) => {
        console.log('setTableData tableContent1' + JSON.stringify(tableContent))
        console.log('setTableData index1 ' + index1)
        console.log('setTableData index2 ' + index2)
        const row = tableContent[index1]
        const key = Object.keys(row)[index2]
        row[key] = e.target.value
        setTableContent(tableContent)
        console.log('setTableData tableContent2' + JSON.stringify(tableContent))
        console.log('row' + JSON.stringify(row))
    }

    const addField = (field) => {
        setFields([...fields, field])
        const newTable = tableContent.map(item => {
            return {...item, ...{[field]: ''}}
        })
        setTableContent(newTable)
        console.log("tableContent: " + JSON.stringify(tableContent))
    }

    const createDefaultColumns = () => {
        setFields([...fields, 'name', 'link', 'comment'])
        console.log(fields)
        const newTable = tableContent.map(item => {
            return {...item, ...{name: '', link: '', comment: ''}}
        })
        setTableContent(newTable)
        console.log(fields)
        console.log("tableContent: " + JSON.stringify(tableContent))
    }

    return (show &&
        <Container className="align-items-start">
            <div className="row">
                <div className="col-auto">
                    <Container className="d-flex align-items-start">
                        <form onSubmit={createWishList}>
                            <Form.Group>
                                <Form.Label htmlFor="name">List Name</Form.Label>
                                <Form.Control type="text"
                                              required
                                              id="name"
                                              value={name}
                                              onChange={(event) => {
                                                  setName(event.target.value)
                                              }}
                                />
                            </Form.Group>
                            <FieldNames addField={addField}/>
                            <div style={{marginTop: '20px'}}>
                                <Button type="submit" variant="contained">
                                    Save
                                </Button>
                                <Button onClick={() => {
                                    setShow(false)
                                }}> Close </Button>
                            </div>
                        </form>

                        <br/>
                    </Container>
                </div>
                <div className="col-auto">
                    <Button onClick={createDefaultColumns}>Create default table</Button>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="privateCheck"/>
                        <label className="form-check-label" for="privateCheck"> Private list </label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="align-items-center">
                    <div className=" align-items-center width-35-per shadow-sm p-3 mb-5 bg-body rounded">
                        <h4 className=""><strong>{name}</strong></h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="container">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>{
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
                    </div>
                </div>
            </div>
        </Container>

    )
}

const FieldNames = ({addField}) => {
    const [field, setField] = useState("")
    const addCustomField = () => {
        addField(field)
        setField('')
    }

    return (<>
        <Form.Group className="row g-2">
            <div className="col-auto">
                <Form.Label htmlFor="fields">Field name:</Form.Label>
                <div className='input-group'>
                    <Form.Control type="text" className="form-control" id="fields" value={field}
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
                    <button className="btn btn-outline-secondary">Add</button>
                </div>
            </div>
            <div className="align-items-center" style={{paddingTop: '33px'}}>

            </div>
        </Form.Group>

    </>)
}

export default NewWishlist;