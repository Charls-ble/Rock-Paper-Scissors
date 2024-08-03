const todoList = JSON.parse(localStorage.getItem('todolist')) || [{
  name:'type in the todobox...',
  dueDate: ''
}, { 
  name:'And set whatever date you like...',
  dueDate: ''
}];

renderTodoList();

function renderTodoList() {

    let todoListHTML = '';

    todoList.forEach((todoObject, index) => {
      const {name, dueDate} = todoObject;
      const html = `
      <div>${name}</div>
      <div>${dueDate}</div> 
      <button class="delete-button js-delete-todo-button" >Delete</button> 
      `;
      todoListHTML += html;
    });


    document.querySelector('.js-todo-list')
      .innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-todo-button')
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
          todoList.splice(index, 1); 
          renderTodoList();
          saveToStorage();
        })
      });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo (){
 const inputElement = document.querySelector('.js-name-input');
 const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input')

  const dueDate = dateInputElement.value;

 todoList.push({
  //name: name,
  //dueDate: dueDate
  name,
  dueDate
 });


 inputElement.value = '';

 renderTodoList();

 saveToStorage();

};

function saveToStorage (){
  localStorage.setItem('todolist', JSON.stringify(todoList));
}

