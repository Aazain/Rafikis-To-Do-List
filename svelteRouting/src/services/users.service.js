import {env} from "../../config/env"

export function createNewUser(email, password) {
     fetch(`${env()}/users/signup`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then( res => {
        
        return res
    })
    .catch((err) => console.log(err))
  }

    export function loginUser(email, password) {
    fetch(`${env()}/users/login`, {
     method: 'POST',
     headers:{
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     },
     body: JSON.stringify({
       email,
       password
     })
   }).then(
     (res) => res.json()
   )
   .then(
     (data)=> localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken),
     localStorage.setItem("accessToken", JSON.stringify(data.accessToken)))
   )
   .then(() => loginSuccess())
   .catch((err) => (console.log(err)))
 }

  function loginSuccess(){
    window.location.href = "/list"
  }
  