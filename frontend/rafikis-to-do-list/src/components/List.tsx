import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createTask, deleteTask, getList } from "../services/todo.service";
import { logOutUser } from "../services/users.service";
import ListItem from "./ListItem";
import swal from "sweetalert";

function List(){
   let [listData, setData] = useState([]);
   const [inputValue, setValue] = useState("");
   const [editInputValue, setEditValue] = useState("");


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
      if(!inputValue || inputValue === ""){
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
   async function deleteTaskItem(event: any){
      const itemId = event.target.id
      if(!itemId || itemId === ""){
         swal("Error", "Please select a task to delete", "error");
      }
      else{
        await deleteTask(itemId)
         const result = await getList()
         setData(result)
      }
   }

   async function editTaskItem(event: any){
      console.log(event.target)
      console.log(editInputValue)

      if(event.target.className === "taskStatus"){
         
      }
      else if(event.target.className === "confirmEdit"){
         if(editInputValue === "" || !editInputValue){
            swal("Error", "Please edit the task", "error");
         }
      }
   }


    return (
        <div className="toDoListContainer">
           <button className="logOutButton" onClick={logOutUser}>Log Out</button>
           <ul>
              {listData.map((listData: any) => {
                 return <ListItem deleteBtnClick={deleteTaskItem} editBtnClick={editTaskItem} saveEdit={setEditValue} key={listData._id} itemId={listData._id} task={listData.task} status={listData.status} />;
              })}
           </ul>
           <input type="text" value={inputValue} onChange={handleChange} className="addTask" placeholder="Enter Task"/>
           <button onClick={createTaskItem} className="addTaskBtn">Add Task</button>
        </div>
     );

}

export default List