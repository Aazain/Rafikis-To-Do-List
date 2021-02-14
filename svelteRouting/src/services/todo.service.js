
import {env} from "../../config/env"

export function createTodo(name) {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
    return fetch(`${env()}/todo`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        status: false
      })
    })
    .then( res => {
        return res
    })
    .catch((err) => console.log(err))
  }



  export function retrieveListData(){
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return fetch(`${env()}/todo`, {
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
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })

    return fetch(`${env()}/todo/${id}`, {
        method: 'DELETE',
        headers
      }).then( res => {
          return res
      })
      .catch((err) => console.log(err))
 }


 export function editTodo(id, edit, stat){
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
    return fetch(`${env()}/todo/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            name: edit,
            status: stat
            })
      }).then( res => {
          return res
      })
      .catch((err) => console.log(err))
 }
