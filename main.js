let inputField = document.getElementById('inputField'); 
const addTaskButton = document.getElementById('addTaskButton');


addTaskButton.addEventListener( 'click', function(){
  let taskText = inputField.value.trim();

  if (taskText !== "") {
    createTask(taskText);
    inputField.value = "";
  }
})

function createTask (taskText) {
  const defaultStatus = 'inbox';
  const defaultPriority = 1;

  const newTask = { 
    name: taskText,
    status: defaultStatus,
    priority: defaultPriority };
  
    return newTask;
    
}