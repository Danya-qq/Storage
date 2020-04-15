'use strict';
const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');
let itemsArray = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];


let todoData = [];

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    headerInput.value = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + '<button class="todo-complete"></button>' + '</div>';

        if (item.completed){
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        };

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function(){
        todoData.pop();
        li.remove(); 
        localStorage.removeItem('todo')
    
        });

        localStorage.setItem('todo', JSON.stringify(todoData));
        
    
    });
   
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false      
      };
      if (headerInput.value.trim() == '') return;
      todoData.push(newTodo);
      
      render();
});

itemsArray.forEach(function(item){
    todoData.push(item)
    
})

render();







