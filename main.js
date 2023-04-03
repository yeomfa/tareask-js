'use strict';

// DOM
const app = document.querySelector('.app');
const title = document.querySelector('.title');
const todoList = document.querySelector('.todo-list');
const btnAddTask = document.querySelector('.btn-add-task');
const allBtnsSuccess = document.getElementsByClassName('btn-success');
const allBtnsDelete = document.getElementsByClassName('btn-delete');
const allTodos = document.getElementsByClassName('todo');
const allTodosContent = document.getElementsByClassName('todo-content');
const inputTask = document.querySelector('.input-task-content');
const toggleTheme = document.querySelector('.theme-toggle');
const btnGithub = document.querySelector('a');

// Variables
let tasks = [{content: 'Terminar de aprender JavaScript 🤖', success: false}, {content: 'Terminar de aprender rust 🦀', success: false}, {content: 'Avanzar en DevOps 🌀', success: false}];
let isDark = false;

// Functions
const changeTheme = isDark => {
  const [theme, icon] = isDark ? ['dark', 'sun'] : ['light', 'moon'];

  app.style.background = `var(--${theme}-gradient)`;
  btnGithub.style.color = `var(--${theme}-focus)`;
  inputTask.style.backgroundColor = `var(--${theme}-container)`;
  inputTask.style.color = `var(--${theme}-focus)`;
  title.style.color = `var(--${theme}-focus)`;
  todoList.style.backgroundColor = `var(--${theme}-container)`;
  [...allTodos].forEach(td => {
    td.style.color = `var(--${theme}-text)`;
    td.style.borderColor = `var(--${theme}-border)`;
  });
  toggleTheme.innerHTML = `<i class='bx bxs-${icon}'></i>`;
  toggleTheme.style.color = `var(--${theme}-focus)`;
}
changeTheme(isDark);

const insertEvents = () => {
  const btnsSuccess = [...allBtnsSuccess];
  const btnsDelete = [...allBtnsDelete];
  btnsSuccess.forEach((btn, i) => {
    const pos = tasks.length - 1 - i;
    btn.addEventListener('click', () => {
      successTask(i, pos);
    });
  });
  btnsDelete.forEach((btn, i) => {
    const pos = tasks.length - 1 - i;
    btn.addEventListener('click', () => {
      removeTask(pos);
    });
  });
}

const chargeTasks = tasks => {
  todoList.innerHTML = '';
  tasks.forEach(task => {
    const template = document.createElement('div');
    template.classList.add('todo');
    template.innerHTML = 
      ` <p class="todo-content ${task.success ? 'success' : ''}">${task.content}</p>
        <div class="options">
          <button class="btn-success"><i class='bx bx-check' ></i></button>
          <button class="btn-delete"><i class='bx bx-x' ></i></button>
        </div>`;
    todoList.prepend(template);
  });
  insertEvents();
}
chargeTasks(tasks);

const addTask = taskContent => {
  if (taskContent.length > 1) {
    tasks.push({content: taskContent, success: false});
    chargeTasks(tasks);
    inputTask.value = '';
  }
  checkHeight();
  changeTheme(isDark);
}

const removeTask = taskPos => {
  const taskToRemove = tasks[taskPos].content;
  tasks = tasks.filter(task => task.content != taskToRemove); 
  chargeTasks(tasks);
}

const successTask = (taskPosCollection, taskPosArr) => {
  tasks[taskPosArr].success = true;
  const taskToSuccess = [...allTodosContent][taskPosCollection];
  taskToSuccess.classList.add('success');
}

const checkHeight = () => {
  if (todoList.clientHeight >= 400) {
    todoList.style.overflowY = 'scroll';
  }
}

// Event Handler
btnAddTask.addEventListener('click', e => {
  e.preventDefault();
  const task = inputTask.value;
  addTask(task);
})

toggleTheme.addEventListener('click', () => {
  isDark = !isDark;
  changeTheme(isDark);
});
