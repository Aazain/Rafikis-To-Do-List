<script>
import { onMount } from "svelte";
import { removeTodo, editTodo, getSingleItem } from "../../services/todo.service";

let originalValue = "";
let itemValue = "";
let editorItemId = "";
let itemStatus = "";

onMount(async () => {
  getItem();
  enter();
});

function getItem(){
  let itemId = preload(window.location)
  let itemData = getSingleItem(itemId)
  .then(function(item) {
  if(item == undefined){
    swal('Error', 'Please Select a Task', 'error')
    .then(function(){window.location.href = "/list"})
  }
  else{
      editorItemId = item._id
      originalValue = item.name
      itemValue = item.name
      itemStatus = item.status
      let createdData = new Date(item.createdAt)
      let updatedData = new Date(item.updatedAt)
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
  } 
  else{swal({
  title: "Are you sure?",
  text: "This Action Is Not Reversible",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Poof! Successfully Deleted Task", {
      icon: "success"
    }).then(removeTodo(id)).then(()=> window.location.href="/list")
  } else {
    swal("Task was not Deleted!",{icon: "error"});
  }
})};
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

function editStatus(id, name) {
  if(itemStatus == true){
    itemStatus = false
    document.getElementById("item-status").innerHTML= "Status: Incomplete"
    swal({title: "Item Status Changed To Incomplete", timer: 600, button: false})
  }else if(itemStatus == false || itemStatus == null){
    itemStatus = true
    document.getElementById("item-status").innerHTML= "Status: Complete"
    swal({title: "Item Status Changed To Completed", timer: 600, button: false})
  }
  editTodo(id, name, itemStatus)
}

function enter(){
		document.getElementById("editorText").addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("saveChanges").click();
		}
	});
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap');

  .title {
	background-color: rgb(175, 126, 235);
	color: white;
	padding: 0.5em;
	box-shadow: 0px 0px 15px gray;
}

.returnToList {
  color: white;
	font-size: calc(0.5em + 0.8vw);
	text-decoration: underline;
	text-shadow: 2px 2px 8px white;
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

.deleteButton, .editorTitle, .saveButton, .returnToList, p, .editingButtons{
  font-family: 'Montserrat', sans-serif;
}

.saveButton:hover, .deleteButton:hover, .cancelEdit:hover {
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

.editingButtons{
  padding-top: 1em;
}

#item-status{
  text-decoration: underline;
}
#item-status:hover{
  cursor: pointer;
}

.editInput{
 margin-left: -1em;
 padding-right: 1em;
}

@media only screen and (min-width: 275px) {

  .title{
    font-size: 3em;
  }

  .list-content{
    margin-left: 1.9em;
    margin-right: 0.4em
  }
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
                <p id="item-status" on:click={()=>editStatus(editorItemId, itemValue)}></p>
                <input class="editInput" id="editorText" bind:value={itemValue} type="text">
              </div>

              <div class="editingButtons">
                <button class="cancelEdit btn btn-dark" on:click={cancelEdit}>Cancel</button>
                <button class="saveButton btn btn-dark" id="saveChanges" on:click={()=> editList(editorItemId)}>Save</button>
                <button class="deleteButton btn btn-danger" on:click={()=> removeFromList(editorItemId)}>Delete</button>
              </div>
          </div>
    </div>
</div>


