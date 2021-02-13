
import {env} from "../../config/env"

export function createTodo(name) {
    return fetch(`${env()}/todo`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    console.log(accessToken)
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    fetch(`${env()}/todo`, {
      method: 'GET',
      headers
    })
    .then(
      (res) => res.json()
    )
   .then(data =>{
      return data
   })
   .catch((err) => console.log(err))
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
