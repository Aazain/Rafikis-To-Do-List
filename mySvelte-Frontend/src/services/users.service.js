import { env } from "../../config/env";

export function createNewUser(email, password) {
  fetch(`${env()}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(function(res) {
      console.log(res.ok)
      if (res.ok == false) {
        console.log("nice")
        swal("Error", "A user with this email already Exists", 'error')
      } else if (res.ok == true)(
        swal("Success", "Successfully Signed Up! Please Log In", "success").then(
          function() {
            window.location.href = `/login`;
          }
        )
      )
    })
    .catch((err) => console.log(err));
}

export function loginUser(email, password) {
  fetch(`${env()}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res)
    .then(function(data) {
      console.log(data)
      if(data.status == 400){
        swal('Error', "An Acount With This Email Does Not Exist", 'error')
      }
      else if(data.status == 203){
        swal('Error', "Incorrect Email or Password", 'error')
      }
      else if(data.status == 200){
        (res)=>res.json()
        .them((data)=>console.log(data))
      }
    }
  )
}
export function logOutUser() {
  localStorage.setItem("refreshToken",JSON.stringify("undefined"),
    localStorage.setItem("accessToken", JSON.stringify("undefined")),
    window.location.href = "/"
  );
}