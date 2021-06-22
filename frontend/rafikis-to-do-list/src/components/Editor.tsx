import { useEffect } from "react"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import swal from "sweetalert"

function Editor(props: any){
    let [displayItemStatus, updateStatusDisplay] = useState("")
    let [taskEdit, setTaskEdit] = useState("")
    let createdAt = new Date(props.createdAt).toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })
    let updatedAt = new Date(props.updatedAt).toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })

    //sets the value of the input field to be the same as the task AND editable
    //also displays text that shows whether the task is complete or not
    useEffect(()=>{
        setTaskEdit(props.task)
        if(props.itemStatus === false){
            updateStatusDisplay("Status: Incomplete")
        }
        else if(props.itemStatus === true){
            updateStatusDisplay("Status: Complete")
        }
    }, [props.itemStatus, props.task])


    //sets the value of task edit the same as the value of the input(editTask)
    function handleChange(event: any){
        setTaskEdit(event.target.value)
    }

    //confirms the edit and closed the modal when confirm is pressed
    function handleClick(event: any){
        if(event.target.className === "confirmEdit"){
            if(taskEdit === props.task){
                swal("Error", "You Did Not Make Any Changes To The Item", "info")
            }
            else{
                confirmEdit()
                props.handleClose()
            }
        }
        else if(event.target.className === "cancelEdit"){
            setTaskEdit(props.task)
            props.handleClose()
        }
    }

    async function confirmEdit(){
        if (!props.itemId || props.itemId === "") {
            swal("Error", "Error Editing Task", "error");
            props.handleClose()
        }
        else {
            const edit = await props.editTask(props.itemId, taskEdit, false)
            if(edit === "field empty"){
                setTaskEdit(props.task)
                props.handleClose()
            }
            else{
                const result = await props.getList()
                props.setData(result)
            }
        }
    }

    return(
        <Modal show={props.modalShow} onHide={props.handleClose} backdrop="static" keyboard={false}>
            <div className="modalContainer">
                <div className="editorTextItems">
                    <p className="createdAtText">Created: {createdAt}</p>
                    <p className="updatedAtText">Updated: {updatedAt}</p>
                    <p className="updateStatus">{displayItemStatus}</p>
                    <input className="editTask" value={taskEdit} onChange={handleChange} onKeyDown={props.enter} type="text"/>
                </div>
                <hr />
                <div className="editorButtons">
                    <button className="cancelEdit" onClick={handleClick}>Cancel</button> 
                    <button className="confirmEdit" onClick={handleClick}>Confirm</button> 
                </div>
            </div>
        </Modal>
    )
}

export default Editor