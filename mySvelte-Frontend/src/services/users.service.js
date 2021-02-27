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
      if (res.ok == false) {
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
    .then((res) => res.json())
    .then(function(data) {
      if(data.message == "Incorrect Email or Password"){
        swal('Error', "Incorrect Email or Password", 'error')
      }
      else if(data.message == "User Does Not Exist"){
        swal('Error', "An Acount With This Email Does Not Exist", 'error')
      }
      else{
          localStorage.setItem("refreshToken",JSON.stringify(data.refreshToken),
          localStorage.setItem("accessToken", JSON.stringify(data.accessToken)),
          loginSuccess()
        )
      }
    }
  )
}

function loginSuccess() {
  window.location.href = "/list";
}

export function logOutUser() {
  localStorage.setItem("refreshToken",JSON.stringify("undefined"),
    localStorage.setItem("accessToken", JSON.stringify("undefined")),
    window.location.href = "/"
  );
}