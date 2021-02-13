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

  export async function loginUser(email, password) {
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
      (data) => console.log(data)
    )
    .catch((err) => (console.log(err)))
  }

  function loginSuccess(){
    window.location.href = '/list'
  }
  