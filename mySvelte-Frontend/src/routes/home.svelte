<script>

let listData = [
  { name: "Welcome" },
  { name: "To", status: "true" },
  { name: "Rafiki's" },
  { name: "To", status: "true" },
  { name: "Do" },
  { name: "List", status: "true" },
];

</script>
	
<style>		

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap');

.list-container {
	margin-top: -3em;
	height: 120vh;
	background-color: rgb(227, 233, 255);
	text-align: center;
}

h1 {
	font-family: 'Montserrat', sans-serif;
	text-shadow: 2px 2px 8px white
}

ul {
	padding: 1em;
	margin: 0;
	list-style-type: none;
}

input[type=checkbox] {
	transform: scale(0.8);
}

li {
	font-family: 'Montserrat', sans-serif;
	margin-bottom: 1.8em;
}

#listArea {
	background-color: white;
	margin-top: 1em;
	padding-bottom: 2em;
	padding-top: 1em;
	box-shadow: 0px 0px 15px gray;
}

.title {
	background-color: rgb(175, 126, 235);
	color: white;
	padding: 0.5em;
	box-shadow: 0px 0px 15px gray;
}

.addbtn {
	font-family: 'Montserrat', sans-serif;
	margin-top: -1.5em;
	background-color: rgb(175, 126, 235);
	outline: none;
	border-radius: 2em;
	box-shadow: 0px 0px 10px rgb(175, 126, 235);
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.4s;
	color: white;
	cursor: pointer;
	line-height: 27px;
}

.removeButton:hover,
.editbtn:hover {
	transition-duration: 0.2s;
	background-color: gray;
}

.taskComplete {
	margin-top: 0.3em;
	margin-left: 1em;
	margin-right: 1em;
	float: left;
}

.taskItem {
	margin-bottom: 0;
	margin-right: auto;
	word-wrap: break-word;
	text-align: center;
}

.taskItem:hover {
	cursor: pointer;
	text-decoration: underline;
}

.removeButton {
	vertical-align: top;
}


.checked {
	text-decoration: line-through;
	color: #d3d3d3;
}

.listSelect {
	font-family: 'Montserrat', sans-serif;
	margin-right: -2em;
	color: white;
	text-decoration: none;
}

.addList {
	border: none;
	background: none;
	outline: none;
	float: left;
	color: white;
	line-height: 38px;
	transition: 0.2s;
	width: 0px;
	font-weight: bold;
}

.footer {
	margin-left: 0;
}

.taskComplete {
	width: 0.9em;
	height: 0.9em;
	background-color: white;
	border-radius: 50%;
	vertical-align: middle;
	border: 1px solid #ddd;
	-webkit-appearance: none;
	outline: none;
	cursor: pointer;
	border-width: 0.2em;
}

.taskComplete:checked {
	background-color: rgb(175, 126, 235);
}

.loginBtn {
	background-color: rgb(175, 126, 235);
}

.loginBtn:hover {
	background-color: transparent;
	color: black;
}

.signUpBtn {
	background-color: transparent;
	border-color: rgb(175, 126, 235);
	margin-left: -0.3vw;
}

.signUpBtn:hover {
	background-color: rgb(175, 126, 235);
	border-color: black;
	color: white;
}

.loginBtn,
.signUpBtn {
	font-family: 'Montserrat', sans-serif;
	margin-top: -4vw;
	font-size: calc(0.5em + 0.5vw);
}


.registrationBtn {
	margin-top: 2em;
	margin-bottom: 2em;
	margin-right: calc(-6.5em + -22vw);
	border-color: red;
}

.footer{
	margin-left: 14vw;
}


@media only screen and (max-width: 280px) {

	.list-content{
		margin-top: 6em;
		margin-left: 1.9em;
		margin-right: 0.4em
	}

	.dropdown{
		display: none;
	}

	.title{
		padding-left: 2.5em;
	}

	.userBtn{
		font-size: 1em;
		margin-left: 10em;
	}

	.taskItem{
		font-size: 1.5em;
	}

	.editbtn{
		padding: -2em;
	}

	.footer{
		margin-left: 4em;
	}

	.footer:hover>.addbtn {
		font-size: 0.5em;
	}

	.taskComplete {
		width: 1.5em;
		height: 1.5em;
	}

	.registrationBtn{
		margin: 0;
	}

}

@media only screen and (min-width: 281px) {

	.list-content{
		margin-top: 6em;
		margin-left: 2em;
		margin-right: 0.4em
	}

	.userBtn{
		font-size: 1em;
		margin-left: 10em;
	}

	.dropdown{
		display: none;
	}

	.title{
		padding-left: 2.5em;
	}

	.taskItem{
		font-size: 1.5em;
	}

	.editbtn{
		padding: -2em;
	}

	.footer{
		margin-left: 17vw;
	}

	.footer:hover>.addbtn {
		font-size: 0.7em;
	}

	.taskComplete {
		width: 1.5em;
		height: 1.5em;
	}

	.registrationBtn{
		margin: 0;
	}



}


@media only screen and (min-width: 440px) {

.list-content{
	margin-top: 6em;
	margin-left: -1em;
	margin-right: -3em
}

.userBtn{
	font-size: 1em;
	margin-left: 10em;
}

.dropdown{
	display: none;
}

.title{
	padding-left: 2.5em;
}

.taskItem{
	font-size: 1.5em;
}

.editbtn{
	padding: -2em;
}

.footer{
	margin-left: 28vw;
}

.footer:hover>.addbtn {
	font-size: 0.7em;
}

.taskComplete {
	width: 1.5em;
	height: 1.5em;
}

.registrationBtn{
	margin: 0;
}


}


@media only screen and (min-width: 768px) {

	.list-content{
		margin-top: 4em;
		margin-left: -8em;
		margin-right: -10em
	}

	.userBtn{
		font-size: 1.2em;
		margin-left: 25em;
	}

	.dropdown{
		display: none;
	}

	.title{
		padding-left: 2.5em;
	}

	.taskItem{
		font-size: 1.5em;
	}

	.editbtn{
		padding: -2em;
	}

	.footer{
		margin-left: 36vw;
	}

	.footer:hover>.addbtn {
		font-size: 1em;
	}

	.taskComplete {
		width: 1.5em;
		height: 1.5em;
	}

	.registrationBtn{
		margin: 0;
	}


	
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {

	.list-content{
		margin-top: 2em;
		margin-left: -6em;
		margin-right: -5em
	}

	.userBtn{
		font-size: 1.2em;
		margin-left: 25em;
	}

	.dropdown{
		display: none;
	}

	.title{
		padding-left: 2.5em;
	}

	.taskItem{
		font-size: 1.2em;
	}

	.editbtn{
		padding: -2em;
	}

	.footer{
		margin-left: 23vw;
	}

	.footer:hover>.addbtn {
		font-size: 1em;
	}

	.taskComplete {
		width: 1em;
		height: 1em;
	}

	.registrationBtn{
		margin: 0;
	}

	
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
	

	
	.list-content{
		margin-top: -2em;
		margin-left: -0.5em;
		margin-right: -0.5em
	}

	.userBtn{
		font-size: 1em;
		margin-left: 25em;
	}

	.dropdown{
		display: none;
	}

	.title{
		padding-left: 2.5em;
	}

	.taskItem{
		font-size: 1em;
	}

	.editbtn{
		padding: -2em;
	}

	.footer{
		margin-left: 14vw;
	}

	.footer:hover>.addbtn {
		font-size: 1em;
	}

	.taskComplete {
		width: 0.8em;
		height: 0.8em;
	}

	.registrationBtn{
		margin: 0;
	}
	
}

</style>
	
	<!-- 	BODY -->
<div class="list-container">
	<div class="list-content">
		<div class="registrationBtn">
			<div class="userBtn">
				<a href="login" class="loginBtn btn btn-dark" value="Login">Login</a>
				<a href="signUp" class="signUpBtn btn btn-light" value="SignUp">Sign Up</a>
			</div>
		</div>
			<h1 class="title"> <a href="." class="listSelect"><i class="fa fa-bars pull-left dropdown"></i></a> To Do List</h1>
			<div id="listArea">
				<ul>
					{#each listData as item}
						<div class="item">
							<li class="taskName">
								<input type="checkbox" readonly bind:checked={item.status} name="taskCheck" class="taskComplete">
								<button disabled id="deleteBtn" class="btn btn removeButton pull-right"><i class="fa fa-trash w3-medium"></i></button>
								<button disabled class="editbtn btn btn pull-right" data-toggle="modal" data-target="#editorModal{item._id}"><i class="fa fa-edit w3-medium"></i></button>
								<span class:checked={item.status}>  <p class="taskItem">{item.name}</p></span>
							</li>
						</div>
														
					{/each}       
				</ul>
			</div>
			<div class="footer">
				<input autocomplete="off" class="addList textInput" type="text" id="createTask" name="newItem" placeholder="Type Here">
				<button disabled type="submit" class="addbtn btn btn-dark">+ New Task</button> 
			</div>

	</div>
</div>