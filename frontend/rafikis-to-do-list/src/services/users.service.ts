import swal from "sweetalert";
import { env } from "../config/env";

export function createNewUser(email: string, password: string){
    fetch(`${env()}/users/signup`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        }),
    })
    .then((res) => res.json())
    .then((data: any)=>{
        if(data.message === "a user with this email already exists"){
            swal("Error", "A user with this email already Exists", 'error')
        }
        else{
            swal("Success", "Successfully Signed Up! Please Log In", "success")
            .then(()=>{window.location.href = "/login"})
        }
    })
}

export function loginUser(email: string, password: string){
    fetch(`${env()}/users/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        }),
    })
    .then((res) => res.json())
    .then((data: any)=>{
        if(data.message === "user does not exist"){
            swal('Error', "An User With This Email Does Not Exist", 'error')
        }
        else if(data.message === "incorrect email or password"){
            swal('Error', "Incorrect Email or Password", 'error')
        }
        else{
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            window.location.href = "/list"
        }
    })
    
}

export function logOutUser(){
    localStorage.setItem("accessToken", "undefined")
    localStorage.setItem("refreshToken", "undefined")
    window.location.href = "/"
}