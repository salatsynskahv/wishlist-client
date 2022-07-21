import React from "react";
import DeleteIcon from "../../icons/DeleteIcon";
import {Link} from "react-router-dom";

const Row = ({row, rows, setRows, path}) => {
    const deleteHandler = () => {
        const newTodo = rows.filter((el) => el._id !== row._id);
        setRows(newTodo);
    }

    return (<div className="todo">
        <li>
            <Link to={path}>{row.name}</Link>
            <span className="delete-button" onClick={deleteHandler}> <DeleteIcon/> </span>
        </li>
    </div>);
}

export default Row;