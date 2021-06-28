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
            <div className="taskList">
                <input type="checkbox" className="taskStatus" 
                    checked={props.status} 
                    onChange={(event)=>{props.editTaskStatus(props.itemId, event)}} 
                />
                <button className="deleteBtn" onClick={()=>{props.deleteBtnClick(props.itemId)}}><i className="fas fa-trash-alt fa-2x"></i></button>
                <button className="editBtn" onClick={handleShow}><i className="fas fa-edit fa-2x"></i></button>
                <p className="taskItem" style={props.status === true ? {textDecoration: "line-through", color: "gray"} : {textDecoration: "none"}}>{props.task}</p>
                <hr />
            </div>
        </li>
    )
}

export default ListItem