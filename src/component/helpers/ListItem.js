import React from "react";
import DeleteIcon from "../../icons/DeleteIcon";
import {Link} from "react-router-dom";
import axios from "axios";

const ListItem = ({row, rows, setRows, path}) => {
    const headers = {
        "Content-Type": "application/json"
    }
    const deleteHandler = () => {
        axios.delete(`http://localhost:3001/wishlist/${row._id}`, headers).then(
            (response) => {
                console.log(row._id + 'was deleted')
                const newTodo = rows.filter((el) => el._id !== row._id);
                setRows(newTodo)
            }
        )

    }

    return (<div className="todo">
        <li>
            <Link to={path}>{row.name}</Link>
            <span className="delete-button" onClick={deleteHandler}> <DeleteIcon/> </span>
        </li>
    </div>);
}

export default ListItem;