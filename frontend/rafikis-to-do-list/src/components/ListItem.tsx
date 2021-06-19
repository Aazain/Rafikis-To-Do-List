/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { useEffect } from "react";

function ListItem(props: any){

    let [itemTask, editItemTask] = useState({
        task: "",
        status: true || false
    })

    useEffect(()=>{
        editItemTask({task: props.task, status: props.status})
    }, [props.task, props.status])

    //Updates the task of task
    async function handleChange(event: any){
        if(event.target.className === "editTask"){
            editItemTask({task: event.target.value, status: false}) //only sets values so you can edit the input field and have the previous input values already
            props.setEditValue({id: props.itemId, task: event.target.value, status: false})//saves values to an array in List.tsx
        }
    }

    //resets the input field in the editor modal
    function resetField(){
        editItemTask({task: props.task, status: props.status})
    }

    return(
        <li>
            {/* editing ui (will be a modal in future!!!!) */}
            <input type="text" className="editTask" value={itemTask.task} onChange={handleChange} />
            <button className="confirmEdit" onClick={props.confirmTaskEdit}>confirm</button> 
            <button className="CancelEdit" onClick={resetField}>Cancel</button> 

            {/* default ui */}
            <input type="checkbox" className="taskStatus" onChange={handleChange} />
            <button className="editBtn">Edit</button>
            <button className="deleteBtn" onClick={()=>{props.deleteBtnClick(props.itemId)}}>Delete</button>
            <p>{props.task}</p>
        </li>
    )
}

export default ListItem