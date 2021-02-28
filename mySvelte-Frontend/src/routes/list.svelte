<!-- SVELTE / JS -->

<script>
import { onMount } from "svelte";
import {
  createTodo,
  retrieveListData,
  removeTodo,
  editTodo,
  newAccessTokenGen
} from "../services/todo.service";
import { logOutUser } from "../services/users.service";

let listData = [];

let todoName = "";
let todoEdit = ""

onMount(async () => {
	listData = await retrieveListData();
	setTimeout(newAccessTokenGen, 1000)
	enter();
	setInterval(newAccessTokenGen, 3600000)
});

function resetInputs() {
  todoName = "";
  todoEdit = "";
}


function logOut() {
  logOutUser();
}

function postToList() {
  if (!todoName || todoName === "") {
    swal("Error", "Please enter a task", "error");
  } else {
    createTodo(todoName).then(async () => {
      listData = await retrieveListData();
      resetInputs();
    });
  }
}

function removeFromList(id) {
  if (!id || id === "") {
    swal("Error", "Please enter a task", "error");
  } else {
    removeTodo(id).then(async () => {
      listData = await retrieveListData();
    });
  }
}

function editList(id) {
  if (!id || id === "") {
    swal("Error", "The edit field cannot be empty", "error");
  } else if (!todoEdit || todoEdit === "") {
    swal("Error", "The edit field cannot be empty", "error");
  } else {
    editTodo(id, todoEdit).then(async () => {
      listData = await retrieveListData();
      resetInputs();
    });
  }
}

function editStatus(id,name) {
  let editedListData = null;
  for (let i = 0; i < listData.length; i++) {
    const currentListData = listData[i];
    if (currentListData._id === id) {
      editedListData = currentListData;
      break;
    }
  }

  if (!editedListData) {
    throw new Error("error");
  }
  editTodo(id, name, editedListData.status).then(async () => {
    listData = await retrieveListData();
  });
}

function itemEditor(id) {
	window.location.href = `/item/${id}`
}

function enter(){
		document.getElementById("createTask").addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("footerButton").click();
		}
	});
}

</script>
	
<style>
@import "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap";
.list-container{margin-top:-7em;height:120vh;background-color:#e3e9ff;text-align:center}
h1{font-family:'Montserrat',sans-serif;text-shadow:2px 2px 8px #fff}
ul{padding:1em;margin:0;list-style-type:none}
input[type=checkbox]{transform:scale(0.8)}
li{font-family:'Montserrat',sans-serif;margin-bottom:1.8em}
#listArea{background-color:#fff;margin-top:1em;padding-bottom:2em;padding-top:1em;box-shadow:0 0 15px gray}
.title{background-color:#af7eeb;color:#fff;padding:.5em;padding-left:1em;box-shadow:0 0 15px gray}
.addbtn{font-family:'Montserrat',sans-serif;margin-top:-1.5em;margin-bottom:1.5em;background-color:#af7eeb;outline:none;border-radius:2em;box-shadow:0 0 10px #af7eeb;display:flex;justify-content:center;align-items:center;transition:.4s;color:#fff;cursor:pointer;line-height:27px}
.removeButton:hover,.editbtn:hover{transition-duration:.2s;background-color:gray}
.taskComplete{margin-top:.3em;margin-left:1em;margin-right:1em;float:left}
.taskItem{margin-bottom:0;margin-right:auto;word-wrap:break-word;text-align:center;margin-left:10%}
.taskItem:hover{cursor:pointer;text-decoration:underline}
.removeButton{vertical-align:top}
.saveChange{font-family:'Montserrat',sans-serif;background-color:#af7eeb;color:#fff}
.checked{text-decoration:line-through;color:#d3d3d3}
.listSelect{font-family:'Montserrat',sans-serif;margin-right:-2em;color:#fff;text-decoration:none}
.footer:hover{margin-left:15%}
.footer:hover>.addList{width:120px;padding:0 6px}
.footer:hover>.addbtn{background:#000;box-shadow:0 0 10px #000;color:#fff;border-radius:0;border:none}
.footer:hover>.addList{background-color:#000;box-shadow:0 0 10px #000;border-radius:0}
.addList{border:none;background:none;outline:none;float:left;color:#fff;line-height:38px;transition:.2s;width:0;font-weight:700;margin-top:-1.5em;margin-bottom:1.5em}
.taskComplete{width:.9em;height:.9em;background-color:#fff;border-radius:50%;vertical-align:middle;border:1px solid #ddd;-webkit-appearance:none;outline:none;cursor:pointer;border-width:.2em}
.taskComplete:checked{background-color:#af7eeb}
.logout:hover{background-color:transparent;color:#000}
.logout{background-color:#af7eeb;font-family:'Montserrat',sans-serif;margin-bottom:unset;font-size:calc(0.5em + 0.5vw)}
.registrationBtn{display:flex;justify-content:flex-end}
.footer{display:flex;justify-content:center}
@media only screen and (max-width: 280px) {
.taskItem{margin-left:20%}
.editbtn,.removeButton{padding:.4em}
.list-content{margin-top:6em;margin-left:1.9em;margin-right:.4em}
.dropdown{display:none}
.title{padding-left:2.5em}
.logout{font-size:1em;margin-left:10em;margin-bottom:2em}
.taskItem{font-size:1.5em}
.editbtn{padding:-2em}
.footer:hover>.addbtn{font-size:.5em;margin-top:-3em;margin-bottom:3em}
.taskComplete{width:1.5em;height:1.5em}
.modal-input{font-size:1.2em}
}
@media only screen and (min-width: 281px) {
.editbtn,.removeButton{padding:.4em}
.list-content{margin-top:6em;margin-left:2em;margin-right:.4em}
.logout{font-size:1em;margin-left:10em;margin-bottom:2em}
.dropdown{display:none}
.listSelect{padding-left:40px}
.taskItem{font-size:1.5em}
.editbtn{padding:-2em}
.footer:hover>.addbtn{font-size:.7em;margin-top:-2.15em;margin-bottom:2.12em}
.taskComplete{width:1.5em;height:1.5em}
.modal-input{font-size:1.2em}
}
@media only screen and (min-width: 440px) {
.editbtn,.removeButton{padding:5.625px 11.25px}
.list-content{margin-top:6em;margin-left:-1em;margin-right:-3em}
.logout{font-size:1em;margin-left:10em;margin-bottom:2em}
.dropdown{display:none}
.taskItem{font-size:1.5em}
.editbtn{padding:-2em}
.footer:hover>.addbtn{font-size:.7em}
.taskComplete{width:1.5em;height:1.5em}
.modal-input{font-size:1.2em}
}
@media only screen and (min-width: 768px) {
.list-content{margin-top:4em;margin-left:-8em;margin-right:-10em}
.logout{font-size:1.2em;margin-left:25em;margin-bottom:2em}
.dropdown{display:none}
.taskItem{font-size:1.5em}
.editbtn{padding:-2em}
.footer:hover>.addbtn{font-size:1em;margin-top:-1.5em;margin-bottom:1.5em}
.taskComplete{width:1.5em;height:1.5em}
.modal-input{font-size:1.2em}
}
@media only screen and (min-width: 992px) {
.list-content{margin-top:2em;margin-left:-6em;margin-right:-5em}
.logout{font-size:1.2em;margin-left:25em;margin-bottom:2em}
.dropdown{display:none}
.taskItem{font-size:1.2em}
.editbtn{padding:-2em}
.footer:hover>.addbtn{font-size:1em}
.taskComplete{width:1em;height:1em}
.modal-input{font-size:1.2em}
}
@media only screen and (min-width: 1200px) {
.list-content{margin-top:-2em;margin-left:-.5em;margin-right:-.5em}
.logout{font-size:1em;margin-left:25em;margin-bottom:2em}
.taskItem{font-size:1em}
.editbtn{padding:-2em}
.footer:hover>.addbtn{font-size:1em}
.taskComplete{width:.8em;height:.8em}
}
@media only screen and (max-width: 1200px) {
	.addList{width:120px;padding:0 6px;background-color:#000;box-shadow:0 0 10px #000;border-radius:0}
	.addbtn{background:#000;box-shadow:0 0 10px #000;color:#fff;border-radius:0;border:none}
	.footer{margin-left:15%}
}
</style>
	
<!-- 	BODY -->

<div class="list-container">
	<div class="list-content">
		<div class="registrationBtn">
			<a href="/" on:click={logOut} class="logout btn btn-dark">Log Out</a>
		</div>

		<h1 class="title"> <a href="." class="listSelect"><i class="fa fa-bars pull-left dropdown"></i></a> To Do List</h1>

			<div id="listArea">
				<ul>
					{#each listData as item}
						<div class="item">
							<li class="taskName">
								<input type="checkbox" bind:checked={item.status} on:change={()=>editStatus(item._id, item.name)} name="taskCheck" class="taskComplete">
								<button id="deleteBtn" class="btn btn removeButton pull-right" on:click={()=>removeFromList(item._id)}><i class="fa fa-trash w3-medium"></i></button>
								<button class="editbtn btn btn pull-right" data-toggle="modal" data-target="#editorModal{item._id}"><i class="fa fa-edit w3-medium"></i></button>
								<span class:checked={item.status}><p class="taskItem" on:click={()=>itemEditor(item._id)}>{item.name}</p></span>
								<div class="modal fade" id="editorModal{item._id}" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
								<div class="modal-dialog" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="editModalLabel">TaskEditor</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<input class="modal-input" bind:value={todoEdit} type="text" placeholder={item.name}>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-secondary" on:click={resetInputs} data-dismiss="modal">Cancel</button>
										<button type="button" on:click={()=>editList(item._id)} data-dismiss="modal" class="btn btn saveChange">Save changes</button>
								</div>
							</li>
						</div>								
					{/each}       
				</ul>
			</div>
			  
			  <div class="footer">
					<input bind:value={todoName} autocomplete="off" class="addList" type="text" id="createTask" name="newItem" placeholder="Type Here">
				  <button type="submit" on:click={postToList} id="footerButton" class="addbtn btn btn-dark">+ New Task</button> 
			  </div>
	</div>
</div>

	
	
		
	