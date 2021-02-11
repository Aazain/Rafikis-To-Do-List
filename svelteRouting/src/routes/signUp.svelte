<script>
	import {createNewUser} from "../services/users.service"
	import {env} from "../../config/env"
	
	let email = "";
	let password = "";

	function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

	function signUpUser() {
		if(!email || email === "" || !password || password === "" || !validateEmail(email)){
		  swal('Error', 'Please enter your email and password', 'error')
		  resetInputs();
		}else{
		  createNewUser(email, password)
		  swal('Success', 'Successfully Signed Up! Please Log In', 'success')
		  .then(function() {
			window.location = `http://localhost:3000/login`;
		  });
		}
	}


</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap');

:global()body {
	background-color: rgb(227,233,255);
    height: auto;
    text-align: center;
}

:global()html{
    height: 110%;
    margin-top: 10vw;
    margin-right: calc(-7em + 38vw);
    margin-left: calc(-8.5em + 38vw);
}

.home{
	font-family: 'Montserrat', sans-serif;
	  font-size: calc(0.5em + 0.8vw);
	  color: black;
	  text-decoration: underline;
}

.logInLink{
	font-family: 'Montserrat', sans-serif;
	 color: rgb(175, 126, 235);
}

.welcome{
	margin-top: 1em
}

.noHr{
	opacity: 0;
}

.enterSignUp{
	background-color: rgb(175, 126, 235);
	padding: 0.5em 6em 0.5em 6em;
}

h1{
    font-family: 'Montserrat', sans-serif;
}

</style>
<div class="container">
	<a class="home" href=".">Rafiki's To Do List</a>
	<h1 class="welcome">Welcome</h1>

	<hr>

	<label for="signupEmail">Email Address
		<input type="text" bind:value={email} name="signupEmail">
	</label>

	<hr class="noHr">

	<label for="signupEmail">Password
		<input type="text" bind:value={password} name="signupPassword">
	</label>

	<hr class="noHr">

	<button type="button" on:click={signUpUser} class=" enterSignUp btn btn-dark">SignUp</button>

	<hr>

	<p>Already have an account? <a href="login" class="logInLink">Log In</a></p>
</div>