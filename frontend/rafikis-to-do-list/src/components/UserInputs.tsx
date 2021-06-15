import React from "react";
import { useHistory } from "react-router-dom";
import UserRegistration from "./UserRegistration";

function UserInputs(){
    const history = useHistory()

    return(
        <div className="userRegistrationContainer">
            {
                history.location.pathname === "/login" || history.location.pathname === "/"
                ? <UserRegistration greeting="Welcome Back" userCredentials="Login" accountStatus="Don't Have An Account?" redirect="Sign Up" redirectLink="signup" /> 
                : <UserRegistration greeting = "Welcome" userCredentials="Sign Up" accountStatus="Already Have An Account?" redirect="Log In" redirectLink="/login" />
            }
        </div>
    )
}

export default UserInputs