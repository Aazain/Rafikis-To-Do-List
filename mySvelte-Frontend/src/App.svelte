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
    margin-top: -1em;
    background-color: rgb(175, 126, 235);
    outline: none;
    border-radius: 2em;
    box-shadow: 0px 0px 10px rgb(175, 126, 235); 
}

.addbtn:hover{
  background-color: black;
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
    margin-right: 8em;
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
}



</style>


<!-- 	BODY -->

    <h1 class="title"> To Do List</h1>
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
                                                        <input bind:value={todoEdit} type="text" placeholder="Make changes">
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

    <button type="submit" on:click={postToList} class="addbtn btn btn-dark">+ New Task</button> 
		<div class="footer fixed-bottom">
			<input bind:value={todoName} autocomplete="off" class="addList textInput" type="text" id="createTask" name="newItem" placeholder="Type Here">
    </div>

