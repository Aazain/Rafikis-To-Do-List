import swal from "sweetalert";
import { env } from "../config/env";

export function createNewUser(email: string, password: string){
    fetch(`${env()}/users/signup`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
            swal({title: "Success", text: "Successfully Signed Up! Logging In...", icon: "success", timer: 1500, buttons:[""]})
            .then(()=>{loginUser(email, password)})
        }
    })
}

export async function loginUser(email: string, password: string){
    await fetch(`${env()}/users/login`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        }),
    })
    .then((res) => res.json())
    .then((data: any)=>{
        console.log(data)
        if(data.message === "user does not exist"){
            swal('Error', "A User With This Email Does Not Exist", 'error')
        }
        else if(data.message === "incorrect email or password"){
            swal('Error', "Incorrect Email or Password", 'error')
        }
        else{
            localStorage.setItem("email", email)
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            window.location.href = "/list"
        }
    })
    
}

export function logOutUser(){
    localStorage.setItem("accessToken", "undefined")
    localStorage.setItem("refreshToken", "undefined")
    localStorage.setItem("email", "undefined")
    window.location.href = "/"
}