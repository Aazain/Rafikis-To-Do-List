import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { createNewUser, loginUser } from "../services/users.service";

function UserInputs(props: any){
    //gets 
    const history = useHistory()

    const [fieldInput, setCredentials] = useState({
        //stores email and password onchange as the user types
        email: "",
        password: ""
    })

    function validateEmail(email: any) {
        //email validation
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

    function handleChange(event: any){
        const { value, className } = event.target

        //hooks to set email and password in fieldInput array 
        setCredentials(prevValue =>{
            return className === "emailInput" ? {email: value, password: prevValue.password} : {email: prevValue.email, password: value}
        })
    }


    //function runs when user presses login or signup button, checks if input values are valid before logging user in or signing them up
    function handleClick(){
        //login inpout validation
        if(history.location.pathname === "/login" || history.location.pathname === "/"){
            if(!fieldInput.email || fieldInput.email === "" || !fieldInput.password || fieldInput.password === "" || !validateEmail(fieldInput.email)){
                swal("Error", "Please enter a valid email and password", "error");
            }
            else{
                loginUser(fieldInput.email, fieldInput.password)
            }
        }

        //signup input validation
        else if(history.location.pathname === "/signup"){
            if(!fieldInput.email || fieldInput.email === "" || !fieldInput.password || fieldInput.password === "" || !validateEmail(fieldInput.email)){
                swal("Error", "Please enter a valid email and password", "error");
            }
            else{
                createNewUser(fieldInput.email, fieldInput.password)
            }
        }
    }

    function enter(event: any){
        if(event.keyCode === 13) { 
           let clickBtn = document.getElementsByClassName("submitUser")[0] as HTMLButtonElement
           clickBtn.click()
        }
     }

    return(
        <div className="userRegistrationContainer">
            <h1 className="regGreeting">{props.greeting}</h1>
            <input className="emailInput" onChange={handleChange} onKeyDown={enter} type="text" placeholder="Email"/>
            <input className="passwordInput" onChange={handleChange} onKeyDown={enter} type="password" placeholder="Password"/>
            <button className="submitUser" onClick={handleClick}>{props.userCredentials}</button>
            <p className="regFooter">{props.accountStatus} <a className="regRedirectLink" href={props.redirectLink}>{props.redirect}</a></p> 
        </div>
    )
}

export default UserInputs





