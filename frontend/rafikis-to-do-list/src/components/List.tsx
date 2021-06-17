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
   let defaultValue: any;



   useEffect(()=>{
      const getListData = async ()=>{
         setData(await getList())
      }
      getListData()
   }, [])

   function handleChange(event: any){
      setValue(event.target.value)
   }

   async function createTaskItem(){
      if(!inputValue || inputValue === ""){
         swal("Error", "Please enter a task", "error");
      }
      else{
         createTask(inputValue)
         setData(await getList())
      }
   }

   async function deleteTaskItem(event: any){
      const itemId = event.target.id
      if(!itemId || itemId === ""){
         swal("Error", "Please select a task to delete", "error");
      }
      else{
         deleteTask(itemId)
         setData(await getList())
      }
   }

    return (
        <div className="toDoListContainer">
           <button className="logOutButton" onClick={logOutUser}>Log Out</button>
           <ul>
              {listData.map((listData: any) => {
                 return <ListItem onClick={deleteTaskItem} itemId={listData._id} key={listData._id} task={listData.task} status={listData.status} />;
              })}
           </ul>
           <input value={defaultValue} onChange={handleChange} className="addTask" type="text" placeholder="Enter Task"/>
           <input className="editTask" type="text" placeholder="Edit Task"/>
           <button onClick={createTaskItem} className="addTaskBtn">Add Task</button>
        </div>
     );

}

export default List