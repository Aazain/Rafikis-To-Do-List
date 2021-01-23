<!-- SVELTE / JS -->

<script>
import { onMount } from 'svelte';
import {createTodo, retrieveListData, removeTodo, editTodo} from "./services/todo.service"


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

.saveChange{
    background-color: rgb(175, 126, 235);
    color: white;
}

.checked{
  text-decoration: line-through;
  color: #d3d3d3;
}

a{
  font-size: calc(0.5em + 0.8vw);
  margin-right: -2em;
  color: white;
  text-decoration: none;
}

.footer:hover > .addList {
 width: 120px;
 padding: 0 6px;
}

.footer:hover > .addbtn {
 background: black;
 box-shadow: 0px 0px 10px black;
 color: white;
}

.footer:hover > .addList{
  background-color: black;
  box-shadow: 0px 0px 10px black;
  border-radius: 20em;
}

.addList{
border: none;
 background: none;
 outline: none;
 float: left;
 color: white;
 font-size: calc(0.6em + 0.4vw);
 transition: 0.2s;
 line-height: 40px;
 width: 0px;
 font-weight: bold;
}

.footer{
  margin-left: calc(4em + 11vw);
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
  margin-top: -10vw;
  margin-bottom: unset;
  font-size: calc(0.5em + 0.5vw);
}

.registrationBtn{
  margin-right: calc(-6.5em + -22vw);
  border-color: red;
}


</style>


<!-- 	BODY -->
<div class="registrationBtn">
    <input type="button" class="loginBtn btn btn-dark" value="Login">
    <input type="button" class="signUpBtn btn btn-light" value="SignUp">
</div>
    <h1 class="title"> <a href="" class="listSelect"><i class="fa fa-bars pull-left dropdown"></i></a> To Do List</h1>
			<div id="listArea">
					<ul>
            {#each listData as item}
                                          <div class="item">
                                            <li class="taskName">
                                                <input type="checkbox" bind:checked={item.status} on:change={()=>editStatus(item._id, item.name)}  name="taskCheck" class="taskComplete">
                                                <button id="deleteBtn" class="btn btn removeButton pull-right" on:click={()=>removeFromList(item._id)}><i class="fa fa-trash w3-medium"></i></button>
                                                <button class="editbtn btn btn pull-right" data-toggle="modal" data-target="#editorModal{item._id}"><i class="fa fa-edit w3-medium"></i></button>
                                              <span class:checked={item.status}>  <p class="taskItem">{item.name}</p></span>
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
                                                        <input bind:value={todoEdit} type="text" placeholder={item.name}>
                                                      </div>
                                                      <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" on:click={resetInputs} data-dismiss="modal">Cancel</button>
                                                        <button type="button" on:click={()=>editList(item._id)} data-dismiss="modal" class="btn btn saveChange">Save changes</button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                            </li>
                                        </div>
                                       
            {/each}       
					</ul>
      </div>
      

      <div class="footer">
        <input bind:value={todoName} autocomplete="off" class="addList textInput" type="text" id="createTask" name="newItem" placeholder="Type Here">
          <button type="submit" on:click={postToList} class="addbtn btn btn-dark">+ New Task</button> 
      </div>


    
