<script>
import { onMount } from "svelte";
import { removeTodo, editTodo } from "../services/todo.service";

let originalValue = "";
let itemValue = "";
let itemId = "";

function getItem(){
    let itemData = JSON.parse(localStorage.getItem("editorItem"))
    if(itemData == "undefined"){
        swal('Error', 'Please Select a Task First', 'error')
        .then(function(){window.location.href = "/list"})
    }else{
        originalValue = itemData.name
        itemValue = itemData.name
        itemId = itemData._id
        let createdData = new Date(itemData.createdAt)
        let updatedData = new Date(itemData.updatedAt)
        let createdTime = createdData.toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })
        let updatedTime = updatedData.toLocaleString('en-US', { month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', year: "numeric", hour12: true })
        document.getElementById("item-createdAt").innerHTML= "Created: " + createdTime
        document.getElementById("item-updatedAt").innerHTML= "Updated: " + updatedTime
    }
}

function cancelEdit(){
    localStorage.setItem("editorItem", JSON.stringify("undefined"))
    window.location.href = "/list"
}

onMount(async () => {
    getItem();
});

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

.saveButton{
    font-family: 'Montserrat', sans-serif;
	background-color: rgb(175, 126, 235);
	color: white;
}

.saveButton:hover, .deleteButton:hover {
	background-color: transparent;
	color: black;
}

.returnToList {
	font-family: 'Montserrat', sans-serif;
	font-size: calc(0.5em + 1.4vw);
	color: black;
	text-decoration: underline;
}

.info{
    margin-top: 2em;
}


</style>

<div class="list-container">
    <div class="list-content">
        <a class="returnToList" href="/list">Return To List</a>

        <div class="info">
            <p id="item-createdAt"></p>
            <p id="item-updatedAt"></p>
            <button on:click={cancelEdit}>Cancel</button>
            <input bind:value={itemValue} type="text">
        </div>

        <div>
            <button class="saveButton btn btn-dark" on:click={()=> editList(itemId)}>Save</button>
            <button class="deleteButton btn btn-danger" on:click={()=> removeFromList(itemId)}>Delete</button>
        </div>

    </div>
</div>