/* eslint-disable no-restricted-globals */
export function env() {
    
    if(location.hostname === "localhost"){ 
        return "http://localhost:4000"
    }else{
        return "https://rafikis-todo-server.herokuapp.com"
    }
}