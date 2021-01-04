// check using localhost
// if dev use localhost if production use server

export function env() {
    
    if(location.hostname === "localhost"){ 
        return "http://localhost:3000"
    }else{
        return "https://todolist-v2-server.herokuapp.com"
    }

}