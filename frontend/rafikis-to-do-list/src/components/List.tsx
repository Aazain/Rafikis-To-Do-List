import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createTask, deleteTask, editTask, getList } from "../services/todo.service";
import { logOutUser } from "../services/users.service";
import ListItem from "./ListItem";
import swal from "sweetalert";

function List(){
   let [listData, setData] = useState([]);
   const [inputValue, setValue] = useState("");
   const [editInputValue, setEditValue] = useState({
      id: "",
      task: "",
      status: true || false
  })

   //Loads database array when page loads
   useEffect(()=>{
      const getListData = async ()=>{
         setData(await getList())
      }
      getListData()
   }, [])

   //sets value of input to use when creating task/ emptying input
   function handleChange(event: any){
      setValue(event.target.value)
   }

   //creates a task by sending input value to service function
   async function createTaskItem(){
      if(!inputValue || inputValue === "" || inputValue === " "){
         swal("Error", "Please enter a task", "error");
      }
      else{
         await createTask(inputValue)
         const result = await getList();
         setData(result)
         setValue("")
      }
   }

   //deletes task using its unique id and sending it to the service function
   async function deleteTaskItem(id: string){
      if(!id || id === ""){
         swal("Error", "Please select a task to delete", "error");
      }
      else{
        await deleteTask(id)
         const result = await getList()
         setData(result)
      }
   }

   async function editTaskItem(event: any){
      if(event.target.className === "taskStatus"){
         console.log(event.target, editInputValue)
      }
      else{
         if(!editInputValue.task|| editInputValue.task === "" || editInputValue.task === " "){
            swal("Error", "Please edit the task", "error");
         }
         else{
            await editTask(editInputValue.id, editInputValue.task, editInputValue.status)
            const result = await getList()
            setData(result)
         }
      }        //FOR LOOP
   }

    return (
        <div className="toDoListContainer">
           <button className="logOutButton" onClick={logOutUser}>Log Out</button>
           <ul>
              {listData.map((listData: any) => {
                 return <ListItem deleteBtnClick={deleteTaskItem} setEditValue={setEditValue} confirmTaskEdit={editTaskItem} key={listData._id} itemId={listData._id} task={listData.task} status={listData.status} />;
              })}
           </ul>
           <input type="text" value={inputValue} onChange={handleChange} className="addTask" placeholder="Enter Task"/>
           <button onClick={createTaskItem} className="addTaskBtn">Add Task</button>
        </div>
     );

}

export default List