import swal from "sweetalert";
import { env } from "../config/env";

const storedToken = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken")
}

const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${storedToken.accessToken}`
  })

export function getList(){
    if (storedToken.accessToken === "undefined" && storedToken.refreshToken === "undefined"){
        swal('Error', 'Session Expired, Please Log In', 'error')
        .then(function(){window.location.href = "/"})
        return([{error: "session expired"}])
      }
    else{
        return fetch(`${env()}/todo`, {
            method: "GET",
            headers
        })
        .then(res => res.json())
        .then((data) => {return data})
    }
}

export function createTask(task: string){
    // eslint-disable-next-line no-restricted-globals
    if (!storedToken.accessToken && !storedToken.refreshToken){
        swal('Error', 'Session Expired, Please Log In', 'error')
        .then(function(){window.location.href = "/"})
        return([{error: "session expired"}])
    }
    else{
        return fetch(`${env()}/todo`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                task,
                status: false
            })
        })
    }
}

export async function deleteTask(id: string){
    return fetch(`${env()}/todo/${id}`, {
        method: "DELETE",
        headers
    });
}


export async function editTask(id: string, task: string, status: boolean){
    return fetch(`${env()}/todo/${id}`, {
        method: "Patch",
        headers,
        body: JSON.stringify({
            task,
            status
        })
    })
    .then(res=>{return res})
}