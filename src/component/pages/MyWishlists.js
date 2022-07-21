import React, {useEffect, useState} from "react";
import Row from "./Row";
import {useLocation} from "react-router";
import axios from "axios";


export default function MyWishlists() {
    const location = useLocation()

    const [rows, setRows] = useState([])
    const [show, setShow] = useState(false)
    const headers = {
        "Content-Type": "application/json"
    };

    useEffect(() => {
        try{
            axios.get('http://localhost:3001/wishlist', {headers})
                .then((response) => {
                    console.log(response.data)
                    // response.data.forEach((item) => item.key = item.id)
                    setRows(response.data)
                })
            // fetch('http://localhost:3001/wishlist')
            //     .then((response) => response.json())
            //     .then( (json) => {
            //         console.log(json)
            //         return json
            //     })
        }catch (err){
            console.log(err)
        }
    }, [])
    return (<>
        <button onClick={() => setShow(true)}>Add list</button>
        <NewWishlist rows={rows} setRows={setRows} show={show} setShow={setShow}/>
        <p>My lists</p>
        {
            rows.map(item => {
                return <Row
                    key={item._id}
                    row={item}
                    rows={rows}
                    setRows={setRows}
                    path={location.pathname+ "\\" + item._id}
                />
            })
        }

    </>)

};


const NewWishlist = ({rows, setRows, show, setShow}) => {
    const [name, setName] = React.useState("");
    const [fields, setFields] = React.useState([])
    const saveRow = () => {
        const newItem = {
            id: rows.length + 1,
            name: name,
            fields: fields
        }
        setRows([...rows, newItem])
        setName("")
        setFields([])

        setShow(false)
    }
    // const editName = (value, newName) => {
    //     console.log(newName)
    //     const ob = rows.find(item => item.id === value.id);
    //     ob.name = newName
    // }
    return (show && <div>
            <label htmlFor="name">List Name</label>
            <input type="text" id="name" value={name} onChange={(event) => {
                setName(event.target.value)
            }}/>
            <br/>
            <FieldNames fields={fields} setFields={setFields}/>
            <h4>{name}</h4>
            <table>
                {
                    fields.map( (field, index) =>
                        (<th className="newtable-th" key={index}>
                            {field}
                        </th>)
                    )
                }
            </table>

            <div>
                <button onClick={saveRow}>Add List</button>
                <button onClick={() => {setShow(false)}}>Close</button>
            </div>
        </div>
    )
}

const FieldNames = ({fields, setFields}) => {
    const [field, setField] = useState("")
    const addField = (e) => {
        setFields([...fields, field])
        setField("")
    }
    return (<>
        <label htmlFor="fields">Field name:</label>
        <input type="text" id="fields" value={field} onChange={(event)=> {setField(event.target.value)}}/>
        <button onClick={addField}> Add </button>
    </>)
}



