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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LjhmNmEyNmMzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb25maWcvZW52LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNoZWNrIHVzaW5nIGxvY2FsaG9zdFxyXG4vLyBpZiBkZXYgdXNlIGxvY2FsaG9zdCBpZiBwcm9kdWN0aW9uIHVzZSBzZXJ2ZXJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnYoKSB7XHJcbiAgICBcclxuICAgIGlmKGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiKXsgXHJcbiAgICAgICAgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwXCJcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBcImh0dHBzOi8vdG9kb2xpc3QtdjItc2VydmVyLmhlcm9rdWFwcC5jb21cIlxyXG4gICAgfVxyXG5cclxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDTyxTQUFTLEdBQUcsR0FBRztBQUN0QjtBQUNBLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxLQUFLLFdBQVcsQ0FBQztBQUN6QyxRQUFRLE9BQU8sdUJBQXVCO0FBQ3RDLEtBQUssS0FBSTtBQUNULFFBQVEsT0FBTywwQ0FBMEM7QUFDekQsS0FBSztBQUNMO0FBQ0E7Ozs7In0=
