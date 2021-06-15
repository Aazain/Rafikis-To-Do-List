import React from "react";
import { logOutUser } from "../services/users.service";
import ListItem from "./ListItem";
let listData: any = [];

function logOut(){
    logOutUser()
}

function List(){

    return (
        <div className="toDoListContainer">
           <button className="logOutButton" onClick={logOut}>Log Out</button>
           <ul>
              {listData.map((listData: any) => {
                 return <ListItem task={listData.task} />;
              })}
           </ul>
        </div>
     );

}

export default List