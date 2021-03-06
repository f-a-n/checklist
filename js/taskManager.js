function createTaskHtml(name, description, assignedTo, dueDate, status, id){

  let bgColor = "";
  let textColor = "";
  let btnColor = "";

  switch(status) {
    case "In Progress":
      // in progress has green styles!
    
      bgColor = "#20c997";
      textColor = "text-dark";
      btnColor = "btn-light";
      break;
    case "To Do":
      bgColor = "#fd7e14";
      textColor = "text-dark";
      btnColor = "btn-dark";
      break;
    case "Review":
        bgColor = "#0a58ca";
        textColor = "text-light";
        btnColor = "btn-light";
        break;
    case "Done":
      bgColor = "#6c757d";
      textColor = "text-light";
      btnColor = "btn-dark";
      break;
    default:
      // code block
      console.log("Someting went wrong!")
  }

    const html = `
    <ul class="list-group" id="tasksList">
      <li class="list-group-item shadow p-3 mb-3 rounded ${textColor}" data-task-id="${id}" style="background-color: ${bgColor};">
        <h5>${name}</h5>
        <p>${description}</p>

        <div class="d-flex w-100 mb-3 justify-content-between">
          <small class=" font-weight-bold">@${assignedTo}</small>
          <small><i class="bi bi-clock"></i> ${dueDate}</small>
        </div>
        <!-- The Dropdown menu & edit buttons: -->
        <div class="d-flex justify-content-between">
          <div class="dropdown">
            <button class="btn ${btnColor} dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ${status}
            </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" id="to-do" style="cursor: grab">To Do</a>
              <a class="dropdown-item" id="in-progress" style="cursor: grab">In Progress</a>
              <a class="dropdown-item" id="review" style="cursor: grab">Review</a>
              <a class="dropdown-item" id="done" style="cursor: grab">Done</a>
            </div>
          </div>
          
          <div class="d-flex">
            <button type="button" class="btn ${btnColor} mx-3 delete-button">
              <i class="bi bi-trash"></i>
            </button>
            <button type="button" class="btn ${btnColor} " data-toggle="modal" data-target="#editTask"><i class="bi bi-pencil-square"></i></button>
          </div>
        </div>
      </li>
    </ul>
    `

    return html;

}

class TaskManager {
    constructor(currentId = 0){
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, assignedTo, dueDate, status){
        this.currentId++;

        const task = {
            id: this.currentId,   
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        }

        this.tasks.push(task)
    }

    render(){
        let tasksHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];
            let date = new Date(task.dueDate)
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            let taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, formattedDate , task.status, task.id);
            tasksHtmlList.push(taskHtml);
        }

        let tasksHtml = tasksHtmlList.join("\n");

        let taskList = document.getElementById("task-list");
        taskList.innerHTML = tasksHtml;
        
    }

    getTaskById(taskId){
        
        let foundTask;

        for (let i = 0; i < this.tasks.length; i++) {
            
            let task = this.tasks[i];

            if(task.id === taskId) {
                foundTask = task;
            }
        }
        return foundTask;
    }

    save(){
      const tasksJson = JSON.stringify(this.tasks)
      const currentIdString = `${this.currentId}`

      localStorage.setItem('tasks',tasksJson);
      localStorage.setItem('currentId', currentIdString);
      

    }

    load(){
      if(localStorage.getItem("tasks")){
        const tasksString = localStorage.getItem("tasks")
        this.tasks = JSON.parse(tasksString);
      }

      if(localStorage.getItem("currentId")){
        const currentIdString = localStorage.getItem("currentId")
        this.currentId = parseInt(currentIdString);
      }

    }

    deleteTask(taskId){
      let newTasks = [];

      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if(task.id !== taskId){
          newTasks.push(task);
        }
      }

      this.tasks = newTasks;


    }

}

