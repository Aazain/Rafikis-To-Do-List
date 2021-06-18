import React, { useState } from "react";
import { useEffect } from "react";

function ListItem(props: any){
    let [itemTask, editItemTask] = useState("")
    //add status too!!!!!!

    useEffect(()=>{
        editItemTask(props.task)
    }, [props.task])

    function handleChange(event: any){
        editItemTask(event.target.value)
        props.saveEdit(event.target.value)
    }

    return(
        <li>
            <input type="text" className="editTask" value={itemTask} onChange={handleChange} />
            <button className="confirmEdit" onClick={props.editBtnClick}>confirm</button>
            <input type="checkbox" className="taskStatus" onClick={props.editBtnClick} value={props.status} />
            <button className="editBtn">Edit</button>
            <button className="deleteBtn" onClick={props.deleteBtnClick} id={props.itemId}>Delete</button>
            <p>{props.task}</p>
        </li>
    )
}

export default ListItem