import React from "react";
import DeleteIcon from "../../icons/DeleteIcon";
import {Link} from "react-router-dom";

const ListItem = ({row, setSelectedRow, path}) => {


    return (<div className="todo">
        <li>
            <Link to={path}>{row.name}</Link>
            <button id="deleteButton"
                    className="delete-button"
                    data-bs-toggle="modal"
                    data-bs-target={`#deleteModal`}
                    onClick={() => {
                        setSelectedRow(row)
                    }}
            >
                <DeleteIcon/>
            </button>

        </li>
    </div>);
}

export default ListItem;