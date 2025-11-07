/* eslint-disable no-restricted-globals */
export function env() {
    if(location.hostname === "localhost"){ 
        return "http://localhost:4000"
    }else{
        return "https://rafikis-to-do-list.onrender.com/"
    }
}