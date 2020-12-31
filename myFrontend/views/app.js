
fetch('http://localhost:3000/todo/')
  .then(response => response.json())
  .then(data =>{
    const html = data.map(tasks => {
      const items =
      `<div class="item">
          <li class="taskName">
              <input type="checkbox" name="taskCheck" class="taskComplete">
              <button class="btn btn removeButton pull-right"><i class="fa fa-trash w3-medium"></i></button>
              <button class="editbtn btn btn pull-right" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-edit w3-medium"></i></button>
              <label for="taskCheck" class="taskStats"><p class="taskItem">${tasks.name}</p></label>
          </li>
      </div>
    
      
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">TaskEditor</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input type="text" placeholder="Make changes">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn saveChange">Save changes</button>
              </div>
            </div>
          </div>
        </div>`
    return items
    }).join("")
    document.querySelector("#cool").innerHTML= html
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

