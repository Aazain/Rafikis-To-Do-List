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
    if (storedToken.accessToken === "undefined" || storedToken.refreshToken === "undefined" || !storedToken.accessToken || !storedToken.refreshToken){
        swal('Error', 'Session Expired, Please Log In', 'error')
        .then(function(){window.location.href = "/"})
        return([{task: "session expired"}])
      }
    else{
        return fetch(`${env()}/todo`, {
            method: "GET",
            headers
        })
        .then(res => res.json())
        .then((data) => {return data})
        .catch(()=>{ 
            swal('Error', 'Session Expired, Please Log In', 'error')
            .then(function(){window.location.href = "/"})
        })
    }
}

export function createTask(task: string){
    // eslint-disable-next-line no-restricted-globals
    if (!storedToken.accessToken && !storedToken.refreshToken){
        swal('Error', 'Session Expired, Please Log In', 'error')
        .then(function(){window.location.href = "/"})
        return([{error: "session expired"}])
    }
    else if(!task || task === ""){
        swal('Error', 'Do Not Leave Text Field Empty', 'error')
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
    if(!task || task === ""){
        swal('Error', 'Do Not Leave Text Field Empty', 'error')
        return "field empty"
    }
    else{
        return fetch(`${env()}/todo/${id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({
                task,
                status
            })
        })
        .then(res=>{return res})
    }
}

export async function refreshAccessTokens(email: string | null){
    return fetch(`${env()}/newAccessToken`, {
        method: "POST",
        body: JSON.stringify({
            email
        }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${storedToken.refreshToken}`,
        },
    })
    .then((res)=>{return res.json()})
    .then((data)=>{//handle refresh
        if(data.accessToken === "undefined" || data.message === "invalid token"){
            localStorage.setItem("refreshToken", "undefined")
            localStorage.setItem("accessToken", "undefined")
            localStorage.setItem("email", "undefined")
            swal('Error', 'Session Expired, Please Log In', 'error')
            .then(function(){window.location.href = "/"})
        }
        else{
            localStorage.setItem("accessToken", data.accessToken)}
        }
    )
}