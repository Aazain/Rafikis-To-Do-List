import {env} from "../../config/env"

export function createNewUser(email, password) {
    return fetch(`${env()}/users/signup`, {
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