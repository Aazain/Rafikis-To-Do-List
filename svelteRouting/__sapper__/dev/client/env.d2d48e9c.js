// check using localhost
// if dev use localhost if production use server

function env() {
    
    if(location.hostname === "localhost"){ 
        return "http://localhost:4000"
    }else {
        return "https://todolist-v2-server.herokuapp.com"
    }

}

export { env as e };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmQyZDQ4ZTljLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb25maWcvZW52LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNoZWNrIHVzaW5nIGxvY2FsaG9zdFxuLy8gaWYgZGV2IHVzZSBsb2NhbGhvc3QgaWYgcHJvZHVjdGlvbiB1c2Ugc2VydmVyXG5cbmV4cG9ydCBmdW5jdGlvbiBlbnYoKSB7XG4gICAgXG4gICAgaWYobG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIpeyBcbiAgICAgICAgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwXCJcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiaHR0cHM6Ly90b2RvbGlzdC12Mi1zZXJ2ZXIuaGVyb2t1YXBwLmNvbVwiXG4gICAgfVxuXG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNPLFNBQVMsR0FBRyxHQUFHO0FBQ3RCO0FBQ0EsSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDO0FBQ3pDLFFBQVEsT0FBTyx1QkFBdUI7QUFDdEMsS0FBSyxLQUFJO0FBQ1QsUUFBUSxPQUFPLDBDQUEwQztBQUN6RCxLQUFLO0FBQ0w7QUFDQTs7OzsifQ==
