<script>
import { onMount } from "svelte";
import { removeTodo, editTodo, getSingleItem } from "../../services/todo.service";

let originalValue = "";
let itemValue = "";
let editorItemId = "";

onMount(async () => {
  getItem()
});

function getItem(){
  let itemId = preload(window.location)
  let itemData = getSingleItem(itemId)
  .then(function(item) {
  if(item == undefined){
    swal('Error', 'Please Select a Task First', 'error')
    .then(function(){window.location.href = "/list"})
  }
  else{
      editorItemId = item._id
      originalValue = item.name
      itemValue = item.name
      let createdData = new Date(item.createdAt)
      let updatedData = new Date(item.updatedAt)
      let itemStatus = item.status
      let createdTime = createdData.toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })
      let updatedTime = updatedData.toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })
      document.getElementById("item-createdAt").innerHTML= "Created: " + createdTime
      document.getElementById("item-updatedAt").innerHTML= "Updated: " + updatedTime
      if(itemStatus == false || itemStatus == null){
        document.getElementById("item-status").innerHTML= "Status: Incomplete"
      }else{
        document.getElementById("item-status").innerHTML= "Status: Completed"
      }
    }
  })
}

function cancelEdit(){
    window.location.href = "/list"
}
export function preload(params) {
	const path = params.pathname
  const id = path.slice(6)
	return id
}

function removeFromList(id) {
  if (!id || id === "") {
    swal("Error", "Please enter a task", "error");
  } else {
    removeTodo(id).then(()=> window.location.href="/list");
  }
}

function editList(id) {
  if (!id || id === "") {
    swal("Error", "The edit field cannot be empty", "error");
  } else if (!itemValue || itemValue == "") {
    swal("Error", "The edit field cannot be empty", "error");
  } else if (itemValue == originalValue){
    swal("Error", "No Changes Were Made", "error");
  }else {
    editTodo(id, itemValue).then(
        swal("Success", "Successfully Edited Task", "success")
        .then(function(){window.location.href="/list"})
    )
  }
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap');

.list-container {
	height: 150vh;
	width: 100vw;
	background-color: rgb(227, 233, 255);
	text-align: center;
}

.list-content {
	padding-top: 8vw;
	margin-right: calc(-7em + 40vw);
	margin-left: calc(-8.5em + 40vw);
}

.title{
	background-color: rgb(175, 126, 235);
	color: white;
	padding: 0.5em;
	box-shadow: 0px 0px 15px gray;
}

.returnToList {
  color: white;
	font-size: calc(0.5em + 0.8vw);
	text-decoration: underline;
	text-shadow: 2px 2px 8px white
}

.editArea{
  background-color: white;
  box-shadow: 0px 0px 15px gray;
  margin-top: 2em;
  padding: 0px 10px 10px 10px;
}

.saveButton{
	background-color: rgb(175, 126, 235);
	color: white;
}

.deleteButton, .editorTitle, .saveButton, .returnToList, p{
  font-family: 'Montserrat', sans-serif;
}

.saveButton:hover, .deleteButton:hover {
	background-color: transparent;
	color: black;
}

.info{
  margin-top: 2em;
}

.editorTitle{
  font-size: 1.2em;
  padding-top: 1em;
}

</style>

<div class="list-container">
    <div class="list-content">
        <h1 class="title"><a class="returnToList" on:click={cancelEdit} href="/list">Return To List</a></h1>
            <div class="editArea">
              <div class="info">
                <p class="editorTitle">Task Editor</p>
                <hr>
                <p id="item-createdAt"></p>
                <p id="item-updatedAt"></p>
                <p id="item-status"></p>
                <button on:click={cancelEdit}>Cancel</button>
                <input class="editInput" bind:value={itemValue} type="text">
              </div>

              <div>
                <button class="saveButton btn btn-dark" on:click={()=> editList(editorItemId)}>Save</button>
                <button class="deleteButton btn btn-danger" on:click={()=> removeFromList(editorItemId)}>Delete</button>
              </div>
          </div>
    </div>
</div>



<!-- if(itemData == "undefined"){
  swal('Error', 'Please Select a Task First', 'error')
  .then(function(){window.location.href = "/list"})
}else{
  originalValue = itemData.name
  itemValue = itemData.name
  itemId = itemData._id
  let createdData = new Date(itemData.createdAt)
  let updatedData = new Date(itemData.updatedAt)
  let itemStatus = itemData.status
  let createdTime = createdData.toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })
  let updatedTime = updatedData.toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })
  document.getElementById("item-createdAt").innerHTML= "Created: " + createdTime
  document.getElementById("item-updatedAt").innerHTML= "Updated: " + updatedTime
  console.log(itemStatus)
  if(itemStatus == true){
    document.getElementById("item-status").innerHTML= "Status: Completed"
  }else{
    document.getElementById("item-status").innerHTML= "Status: Incomplete"
  }
} -->