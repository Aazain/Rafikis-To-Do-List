<script>
import { onMount } from "svelte";
import { createNewUser } from "../services/users.service";

let email = "";
let password = "";

onMount(async () => {
	enter();
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function signUpUser() {
  if (
    !email ||
    email === "" ||
    !password ||
    password === "" ||
    !validateEmail(email)
  ) {
    swal("Error", "Please enter your email and password", "error");
  } else {
    createNewUser(email, password);
    swal("Success", "Successfully Signed Up! Please Log In", "success").then(
      function () {
        window.location.href = `/login`;
      }
    );
  }
}

function enter(){
		document.getElementById("emailInput").addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("signUpButton").click();
		}
	})

	document.getElementById("passwordInput").addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("signUpButton").click();
		}
	})
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap');

.list-content{
	margin-left: 1em;
}

.home {
	font-family: 'Montserrat', sans-serif;
	font-size: calc(0.8em + 0.8vw);
	color: black;
	text-decoration: underline;
}

.logInLink {
	font-family: 'Montserrat', sans-serif;
	color: rgb(175, 126, 235);
}

.welcome {
	margin-top: 1em
}

.noHr {
	opacity: 0;
}

.enterSignUp {
	background-color: rgb(175, 126, 235);
	padding: 0.5em 6em 0.5em 6em;
}

h1 {
	font-family: 'Montserrat', sans-serif;
}

label{
	font-family: 'Montserrat', sans-serif;
	text-align: left;
}

</style>
<div class="list-container">

	<div class="list-content">

			<a class="home" href=".">Rafiki's To Do List</a>
			<h1 class="welcome">Welcome</h1>

		<hr>

			<label for="signupEmail">Email Address
				<input class="form-control" id="emailInput" type="email" bind:value={email} name="signupEmail">
			</label>

		<hr class="noHr">

			<label for="signupEmail">Password
				<input class="form-control" id="passwordInput" type="password" bind:value={password} name="signupPassword">
			</label>

		<hr class="noHr">

			<button type="button" on:click={signUpUser} id="signUpButton" class=" enterSignUp btn btn-dark">SignUp</button>

		<hr>

		<p>Already have an account? <a href="login" class="logInLink">Log In</a></p>
		
	</div>

</div>