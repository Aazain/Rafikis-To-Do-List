<!-- SVELTE / JS -->

<script>

  let listData = [];

   fetch('http://localhost:3000/todo/')
  .then(response => response.json())
  .then(data =>{
     listData = data;
  })
	
	
	function postToList() {
  var create = document.getElementById("newTask").value
  fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: create
    })
  }).then(res => {
    return res.json()
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
    box-shadow: 0px 0px 10px rgb(175, 126, 235); 
}

ul{
    padding: 1em;
    margin: 0;
    list-style-type: none;
}

.addbtn{
    margin-top: -1em;
    background-color: rgb(175, 126, 235);
    outline: none;
    border-radius: 2em;
    box-shadow: 0px 0px 10px rgb(175, 126, 235); 
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
</style>


<!-- 	BODY -->
	

    <h1 class="title"> To Do List</h1>

			<div id="listArea">
					<ul id="cool">
            {#each listData as item}
                                          <div class="item">
                                            <li class="taskName">
                                                <input type="checkbox" name="taskCheck" class="taskComplete">
                                                <button class="btn btn removeButton pull-right"><i class="fa fa-trash w3-medium"></i></button>
                                                <button class="editbtn btn btn pull-right" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-edit w3-medium"></i></button>
                                                <label for="taskCheck" class="taskStats"><p class="taskItem">{item.name}</p></label>
                                            </li>
                                        </div>
            {/each}
					</ul>
			</div>

    <button type="submit" onclick="postToList()" class="addbtn btn btn">+ New Task</button> 
      
		<div class="footer fixed-bottom">
			<input autocomplete="off" class="addList textInput" type="text" id="newTask" name="newItem" placeholder="Type Here">
		</div>



    <!-- {#each listData as item}
    <li>{item.name} x {item._id}</li>
    <button on:click={chante(item._id)}>my unique button</button>
    {/each} -->