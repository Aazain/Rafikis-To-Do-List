import { useEffect } from "react"
import { useState } from "react"
import { Modal } from "react-bootstrap"

function Editor(props: any){
    let [displayItemStatus, updateStatusDisplay] = useState("")
    let createdAt = new Date(props.createdAt).toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })
    let updatedAt = new Date(props.updatedAt).toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })

    useEffect(()=>{
        if(props.itemStatus === false){
            updateStatusDisplay("Status: Incomplete")
        }
        else if(props.itemStatus === true){
            updateStatusDisplay("Status: Complete")
        }
    }, [props.itemStatus])

    return(
        <Modal show={props.modalShow} onHide={props.handleClose}>
            <p className="createdDatedAtText">Created: {createdAt}</p>
            <p className="updatedAtText">Updated: {updatedAt}</p>
            <p className="updateStatus">{displayItemStatus}</p>
            <input type="text" className="editTask" />
            <button className="confirmEdit">confirm</button> 
            <button className="CancelEdit" onClick={props.handleClose}>Cancel</button> 
        </Modal>
    )
}

export default Editor