<!-- SVELTE / JS -->

<script>
	import { onMount } from 'svelte';
	import {createTodo, retrieveListData, removeTodo, editTodo} from "../services/todo.service"
	
	
	  let listData = [];
	
	  let todoName = "";
	  let todoEdit = "";
	
	
	
	  onMount(async () => {
		  listData = await retrieveListData();
		});
	
	
	function resetInputs() {
	  todoName = "";
	  todoEdit = "";
	}
	
		function postToList() {
		if(!todoName || todoName === ""){
		  swal('Error', 'Please enter a task', 'error')
		}else{
		  createTodo(todoName)
		  .then(async () => {
			listData = await retrieveListData();
			 resetInputs();
		  });
		}
	}
	
	function removeFromList(id){
	  if(!id || id === ""){
		swal('Error', 'Please enter a task', 'error')
	  }else{
		removeTodo(id)
		.then(async () => {
			listData = await retrieveListData();
		  });
	  }
	}
	
	function editList(id){
	  if(!id || id === ""){
		swal('Error', 'The edit field cannot be empty', 'error')
	  }else if(!todoEdit || todoEdit === ""){
		swal('Error', 'The edit field cannot be empty', 'error')
	  }
	  else{
		editTodo(id, todoEdit)
		.then(async () => {6
			listData = await retrieveListData();
			resetInputs();
		  });
	  }
	}
	
	function editStatus(id, name){
	  let editedListData = null
	  for(let i = 0; i<listData.length; i++){
		const currentListData = listData[i]
		if(currentListData._id === id){
		  editedListData=currentListData
		  break;
		}
	  }
	
	  if (!editedListData) {
		throw new Error("error")
	  }
	  editTodo(id, name, editedListData.status)
	  .then(async () => {
		listData = await retrieveListData();
	  })
	}
	
	
	
	</script>
	
	<style>

		

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap');
	


	</style>
	
	
	<!-- 	BODY -->
	<div class="registrationBtn">
		<a href="login" class="loginBtn btn btn-dark" value="Login">Login</a>
		<a href="signUp" class="signUpBtn btn btn-light" value="SignUp">Sign Up</a>
	</div>

	
		
	