import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createTask, deleteTask, editTask, getList } from "../services/todo.service";
import { logOutUser } from "../services/users.service";
import ListItem from "./ListItem";
import swal from "sweetalert";

function List(){
   let [listData, setData] = useState<any>([]);
   const [inputValue, setValue] = useState("");

   //Loads database array when page loads
   useEffect(()=>{
      console.log("nice")
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

   function enter(event: any){
      if(event.keyCode === 13 && event.target.className === "addTask") { 
         let clickBtn = document.getElementsByClassName("addTaskBtn")[0] as HTMLButtonElement
         clickBtn.click()
      }
      else if(event.keyCode === 13 && event.target.className === "editTask") { 
         let clickBtn = document.getElementsByClassName("confirmEdit")[0] as HTMLButtonElement
         clickBtn.click()
      }
   }


   //Iterates over array of items and finds item based on id, if found the status is updated only
   async function editTaskStatus(id: string, event: any){
      let editData = null
      for(let i = 0; i < listData.length; i++){
         const currentListData = listData[i]
         if(currentListData._id === id){
            editData = currentListData
            break
         }
      }
      if(!editData){
         swal("Error", "Error Editing Task Status", "error")
      }
      else{
         await editTask(id, editData.task, event.target.checked)
         const result = await getList()
         setData(result)
      }
   }


    return (
        <div className="toDoListContainer">
           <button className="logOutButton" onClick={logOutUser}>Log Out</button>
           <ul>
              {listData.map((listData: any) => {
                 return <ListItem 
                     getList={getList}
                     setData={setData}
                     key={listData._id} 
                     itemId={listData._id} 
                     task={listData.task} 
                     status={listData.status} 
                     createdAt={listData.createdAt} 
                     updatedAt={listData.updatedAt} 
                     editTask={editTask}
                     deleteBtnClick={deleteTaskItem} 
                     editTaskStatus={editTaskStatus} 
                     enter={enter}
                 />;
              })}
           </ul>
           <input type="text" value={inputValue} onKeyDown={enter} onChange={handleChange} className="addTask" placeholder="Enter Task"/>
           <button onClick={createTaskItem} className="addTaskBtn">Add Task</button>
        </div>
     );

}

export default List