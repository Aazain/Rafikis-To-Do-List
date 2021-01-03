
import {env} from "../../config/env"

export function createTodo(name) {
    return fetch(`${env()}/todo`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        status: false
      })
    }).then( res => {
        return res
    })
    .catch((err) => console.log(err))
  }
  

  export function retrieveListData(){
    return fetch(`${env()}/todo`)
   .then(response => response.json())
   .then(data =>{
      return data;
   })
 };


 export function removeTodo(id){

    return fetch(`${env()}/todo/${id}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

      }).then( res => {
          return res
      })
      .catch((err) => console.log(err))

 }


 export function editTodo(id, edit, stat){
    return fetch(`${env()}/todo/${id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: edit,
            status: stat
            })
      }).then( res => {
          return res
      })
      .catch((err) => console.log(err))
 }
