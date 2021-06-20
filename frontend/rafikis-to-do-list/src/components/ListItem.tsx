/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { useEffect } from "react";

function ListItem(props: any){

    return(
        <li>
            {/* editing ui (will be a modal in future!!!!) */}
            <div className="editingUi">
                <input type="text" className="editTask" 
                    onKeyDown={props.clickOnEnter} 

                />
                <button className="confirmEdit">confirm</button> 
                <button className="CancelEdit">Cancel</button> 
            </div>

            {/* default ui */}
            <input type="checkbox" className="taskStatus" 
                checked={props.status} 
                onChange={(event)=>{props.editTaskStatus(props.itemId, event)}} 
            />
            <button className="editBtn">Edit</button>
            <button className="deleteBtn" onClick={()=>{props.deleteBtnClick(props.itemId)}}>Delete</button>
            <p>{props.task}</p>
        </li>
    )
}

export default ListItem