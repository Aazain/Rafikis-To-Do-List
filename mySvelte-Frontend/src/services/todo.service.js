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
    .catch((err) => tryAgain(err))
  }

  export function retrieveListData(){
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
  
    if (refreshToken == "undefined" && accessToken == "undefined"){
      swal('Error', 'Session Expired, Please Log In', 'error')
      .then(function(){window.location.href = "/"})
    }
     
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
   .catch((err) => tryAgain(err))
 };

 export function getSingleItem(itemId){
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
   
  return fetch(`${env()}/todo/${itemId}`, {
    method: 'GET',
    headers
  })
  .then(
    (res) => res.json()
  )
 .then(data =>{
    return data
 })
 .catch((err) => tryAgain(err))
};

 export function removeTodo(id, userId){
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })

    return fetch(`${env()}/todo/${id}/${userId}`, {
        method: 'DELETE',
        headers
      }).then( res => {
          return res
      })
      .catch((err) => tryAgain(err))
 }


 export function editTodo(id, userId,edit, stat){
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })
    return fetch(`${env()}/todo/${id}/${userId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            name: edit,
            status: stat
            })
      }).then( res => {
          return res
      })
      .catch((err) => tryAgain(err))
 }

function tryAgain(err){
  if(err){
    swal('Error', 'Error Please Try Again', 'error')
    .then(function(){window.location.href = "/list"})
  }
}

 export function newAccessTokenGen() {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const headers = new Headers({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${refreshToken}`,
  });
  return fetch(`${env()}/newAccessToken`, {
    method: "POST",
    headers,
  })
    .then((res) => {
      return res.json();
    })
    .then(function checkTokens (data) {
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken))
      if(data.accessToken == "undefined"){
        localStorage.setItem("refreshToken", JSON.stringify("undefined"))
        swal('Error', 'Session Expired', 'error')
        .then(function(){window.location.href = "/"})
      }
    })
    .catch((err) => swal('Error', 'Session Expired', 'error')
    .then(localStorage.setItem("refreshToken", JSON.stringify("undefined")),
    localStorage.setItem("accessToken", JSON.stringify("undefined"))
    )
    .then(function(){window.location.href = "/"}));
}

