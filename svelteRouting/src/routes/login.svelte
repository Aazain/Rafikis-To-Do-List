<script>
	import{loginUser} from "../services/users.service"

	let userEmail = "";
	let userPassword = "";


	function validateEmail(userEmail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(userEmail).toLowerCase())};

	function userLogin(){
		if(!userEmail || userEmail === "" || !userPassword || userPassword === "" || !validateEmail(userEmail)){
		  swal('Error', 'Please enter an email and password', 'error')
		}else{
		  loginUser(userEmail, userPassword)
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

.signUpLink{
	font-family: 'Montserrat', sans-serif;
	 color: rgb(175, 126, 235);
}

.welcome{
	margin-top: 1em
}

.noHr{
	opacity: 0;
}

.enterLogIn{
	background-color: rgb(175, 126, 235);
	padding: 0.5em 6em 0.5em 6em;
}

h1{
	font-family: 'Montserrat', sans-serif;
}

</style>

<a class="home" href=".">Rafiki's To Do List</a>
<h1 class="welcome">Welcome Back</h1>

<hr>

<label for="loginEmail">Email Address
	<input type="text" bind:value={userEmail} name="loginEmail">
</label>

<hr class="noHr">

<label for="loginPassword">Password
	<input type="password" bind:value={userPassword} name="loginPassword">
</label>

<hr class="noHr">

<button type="button" on:click={userLogin} class="enterLogIn btn btn-dark">Login</button>

<hr>

<p>Don't have an account? <a href="signUp" class="signUpLink">Sign Up</a></p>