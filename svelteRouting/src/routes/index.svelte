<script>
	
	
	  let listData = [
		{name: "Welcome"},
		{name: "To", status: "true"},
		{name: "Rafiki's"},
		{name: "To", status: "true"},
		{name: "Do"},
		{name: "List", status: "true"},
	  ];	
	
</script>
	
<style>		
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap');

	.list-container{
		height: 100vh;
		width: 100vw;
		background-color: rgb(227,233,255);
		text-align: center;
	}

	.list-content {
		padding-top: 8vw;
		margin-right: calc(-7em + 40vw);
		margin-left: calc(-8.5em + 40vw);
	}

	h1{
		font-family: 'Montserrat', sans-serif;
		text-shadow: 2px 2px 8px white
	}

	ul{
		padding: 1em;
		margin: 0;
		list-style-type: none;
	}

	input[type=checkbox] {
		transform: scale(0.8);
	}

	li{
		font-family: 'Montserrat', sans-serif;
		margin-bottom: 1.8em;
		font-size: calc(0.7em + 0.3vw);
	}

	
	#listArea{
		background-color: white;;
		margin-top: 1em;
		padding-bottom: 2em;
		padding-top: 1em;
	   box-shadow: 0px 0px 15px gray; 
	}
	
	.title{
		background-color: rgb(175, 126, 235);
		color: white;
		padding: 0.5em;
		box-shadow: 0px 0px 15px gray; 
	}
	
	.addbtn{
		font-family: 'Montserrat', sans-serif;
		color: white;
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
		font-size: calc(0.6em + 0.4vw);
	}
	
	.removeButton:hover,.editbtn:hover{
	  transition-duration: 0.2s;
	  background-color: gray;
	}
	
	.taskComplete{
		margin-top: 0.3em;
		margin-left: 1em;
		margin-right: 1em;
		float: left;
	}
	
	.taskItem{
		margin-bottom: 0;
		margin-right: 4em;
		word-wrap: break-word;
		text-align: center;
	}
	
	.removeButton{
		vertical-align: top;
	}
	
	.checked{
	  text-decoration: line-through;
	  color: #d3d3d3;
	}

	.listSelect{
		font-family: 'Montserrat', sans-serif;
	  font-size: calc(0.5em + 0.8vw);
	  margin-right: -2em;
	  color: white;
	  text-decoration: none;
	}
	
	.addList{
	 border: none;
	 background: none;
	 outline: none;
	 float: left;
	 color: white;
	 font-size: calc(0.6em + 0.3vw);
	 transition: 0.2s;
	 line-height: 40px;
	 width: 0px;
	 font-weight: bold;
	}
	
	.footer{
	  margin-left: calc(4em + 9vw);
	}
	 .taskComplete{
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
		background-color:  rgb(175, 126, 235);
	}
	.loginBtn{
	  background-color:  rgb(175, 126, 235);
	}
	
	.loginBtn:hover{
	  background-color: transparent;
	  color: black;
	}
	
	.signUpBtn{
	  background-color: transparent;
	  border-color: rgb(175, 126, 235);
	  margin-left: -0.3vw;
	}
	
	.signUpBtn:hover{
	  background-color: rgb(175, 126, 235);
	  border-color: black;
	  color: white;
	}
	
	.loginBtn, .signUpBtn{
		font-family: 'Montserrat', sans-serif;
	  margin-top: -10vw;
	  margin-bottom: unset;
	  font-size: calc(0.5em + 0.5vw);
	}
	
	.registrationBtn{
		padding-top: 5em;
		margin-bottom: -2vw;
	  margin-right: calc(-6.5em + -25vw);
	  border-color: red;
	}

	input[type="checkbox"][readonly] {
  		pointer-events: none;
	}

</style>
	
	<!-- 	BODY -->
<div class="list-container">
	<div class="list-content">
		<div class="registrationBtn">
			<a href="login" class="loginBtn btn btn-dark" value="Login">Login</a>
			<a href="signUp" class="signUpBtn btn btn-light" value="SignUp">Sign Up</a>
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