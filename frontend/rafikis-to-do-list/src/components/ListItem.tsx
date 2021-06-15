import React from "react";

function ListItem(props: any){
    return(
        <li>
            <input type="checkbox" className="taskStatus" />
            <button className="editBtn"></button>
            <button className="deleteBtn"></button>
            <p>{props.task}</p>
        </li>
    )
}

export default ListItem