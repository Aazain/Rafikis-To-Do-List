/* eslint-disable no-restricted-globals */
export function env() {
    console.log(location.hostname)
    if(location.hostname === "localhost"){ 
        return "http://localhost:4000"
    }else{
        return "https://rafikis-todo-server.herokuapp.com"
    }
}