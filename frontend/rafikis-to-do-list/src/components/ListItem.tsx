import { useState } from "react";
import { editTask } from "../services/todo.service";
import Editor from "./Editor"


function ListItem(props: any){

    //Editor Modal Hooks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <li>
            {/* editor component */}
            <Editor 
                getList={props.getList}
                setData={props.setData}
                itemId={props.itemId}
                createdAt={props.createdAt} 
                updatedAt={props.updatedAt} 
                itemStatus={props.status} 
                task={props.task}
                modalShow={show} 
                handleClose={handleClose} 
                editTask={editTask}
                enter={props.enter}
            />

            {/* default ui */}
            <input type="checkbox" className="taskStatus" 
                checked={props.status} 
                onChange={(event)=>{props.editTaskStatus(props.itemId, event)}} 
            />
            <button className="editBtn" onClick={handleShow}>Edit</button>
            <button className="deleteBtn" onClick={()=>{props.deleteBtnClick(props.itemId)}}>Delete</button>
            <p>{props.task}</p>
            <hr />
        </li>
    )
}

export default ListItem