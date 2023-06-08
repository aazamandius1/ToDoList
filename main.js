// Get references to the input field, button, and to-do container
let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

// Function to sort the todo items based on priority
function sortToDoItems() {
  let todoItems = Array.from(toDoContainer.getElementsByClassName('todo-item'));
  todoItems.sort((a, b) => {
    let priorityA = getComputedStyle(a).backgroundColor;
    let priorityB = getComputedStyle(b).backgroundColor;
    return priorityValue(priorityB) - priorityValue(priorityA);
  });
  toDoContainer.innerHTML = '';
  todoItems.forEach(item => toDoContainer.appendChild(item));
}

// Function to convert priority color to a numerical value
function priorityValue(color) {
  if (color === 'red') {
    return 3;
  } else if (color === 'orange') {
    return 2;
  } else if (color === 'yellow') {
    return 1;
  } else {
    return 0;
  }
}

// Function to save the todo items to local storage
function saveToDoItems() {
  let todoItems = Array.from(toDoContainer.getElementsByClassName('todo-item'));
  let savedItems = todoItems.map(item => {
    let text = item.querySelector('.task-description').innerText;
    let textDecoration = getComputedStyle(item.querySelector('.task-description')).textDecoration;
    let priority = getComputedStyle(item).backgroundColor;
    return { text, textDecoration, priority };
  });
  localStorage.setItem('todoItems', JSON.stringify(savedItems));
}

// Function to load the todo items from local storage
function loadToDoItems() {
  let savedItems = JSON.parse(localStorage.getItem('todoItems'));
  if (savedItems) {
    savedItems.forEach(item => {
      createToDoItem(item.text, item.textDecoration, item.priority);
    });
  }
}

// Create a task action button
function createTaskActionButton(text, action) {
  let button = document.createElement('button');
  button.innerText = text;
  button.addEventListener('click', action);
  return button;
}

function createToDoItem(text, textDecoration, priority) {
  let todoItem = document.createElement('div');
  todoItem.classList.add('todo-item');
  todoItem.style.backgroundColor = priority;
  
  let taskDescription = document.createElement('p');
  taskDescription.classList.add('task-description');
  taskDescription.innerText = text;
  taskDescription.style.textDecoration = textDecoration;

  let taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  let lowPriorityButton = createTaskActionButton('Low', function () {
    todoItem.style.backgroundColor = 'yellow';
    sortToDoItems();
    saveToDoItems();
  });

  let mediumPriorityButton = createTaskActionButton('Medium', function () {
    todoItem.style.backgroundColor = 'orange';
    sortToDoItems();
    saveToDoItems();
  });

  let highPriorityButton = createTaskActionButton('High', function () {
    todoItem.style.backgroundColor = 'red';
    sortToDoItems();
    saveToDoItems();
  });

  let doneButton = createTaskActionButton('Done', function () {
    taskDescription.style.textDecoration = 'line-through';
    todoItem.style.backgroundColor = 'green';
    sortToDoItems();
    saveToDoItems();
  });

  let deleteButton = createTaskActionButton('Delete', function () {
    toDoContainer.removeChild(todoItem);
    saveToDoItems();
  });

  taskActions.appendChild(lowPriorityButton);
  taskActions.appendChild(mediumPriorityButton);
  taskActions.appendChild(highPriorityButton);
  taskActions.appendChild(doneButton);
  taskActions.appendChild(deleteButton);

  todoItem.appendChild(taskDescription);
  todoItem.appendChild(taskActions);

  toDoContainer.appendChild(todoItem);
  sortToDoItems();
  saveToDoItems();
}

addToDoButton.addEventListener('click', function () {
  const toDoText = inputField.value.trim();

  if (toDoText !== "") {
    createToDoItem(toDoText, 'white');
    inputField.value = "";
  }
});

// Load todo items from local storage on page load
window.addEventListener('load', function () {
  loadToDoItems();
});
