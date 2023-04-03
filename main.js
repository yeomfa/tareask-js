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
let tasks = JSON.parse(localStorage.getItem('tasks')) || [{content: 'Improve programming habits 🤖', success: false}, {content: 'Enjoy every day of life 🦀', success: false}, {content: 'To be a better person 🌀', success: false}];
let isDark = JSON.parse(localStorage.getItem('theme'));
console.log(isDark);
const emojis = ["🐙", "📱", "🐺", "🦋", "🕷", "🐢", "🐴", "🦄", "🤖", "🐵", "🦉", "🐛", "🦞", "🦀", "🐮", "🐧", "🐸", "🦕", "🐯", "🐠", "🐍", "🦑", "🐝", "🦈", "🐳", "🦐", "🦂", "🌀", "🐭", "🐞", "🐻", "🐊", "🐷", "🦅", "🦎", "🐋", "🐙", "🐘", "🦇", "🦟", "🐠", "🐬", "🐢", "🐺", "🐨", "📷", "🐡", "🐦", "🎧", "🦔", "🐌", "🎓", "🚀", "🐜", "🦃", "🐔", "🦜", "🦔", "🏫", "🐼", "🕸️", "🦌", "🐑", "🐣", "📚", "🦕", "🕹️", "🦈"];

// console.log(tasks);
// localStorage.setItem('tasks', JSON.stringify(tasks));
// console.log(JSON.parse(localStorage.getItem('tasks')));

// Functions
const saveTasks = tasks => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

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
  if (tasks.length !== 0) {
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
  } else {
    const template = document.createElement('div');
    template.classList.add('message');
    template.textContent = 'Add a todo!';

    todoList.prepend(template);
  }
  saveTasks(tasks);
  changeTheme(isDark);
}
chargeTasks(tasks);

const addTask = taskContent => {
  if (taskContent.length > 1) {
    const random = Math.floor(Math.random() * emojis.length);
    tasks.push({content: `${taskContent} ${emojis[random]}`, success: false});
    saveTasks(tasks);
    chargeTasks(tasks);
    checkHeight();
    inputTask.value = '';
  }
  changeTheme(isDark);
}

const removeTask = taskPos => {
  const taskToRemove = tasks[taskPos].content;
  tasks = tasks.filter(task => task.content != taskToRemove); 
  saveTasks(tasks);
  chargeTasks(tasks);
  checkHeight();
  changeTheme(isDark);
}

const successTask = (taskPosCollection, taskPosArr) => {
  tasks[taskPosArr].success = true;
  const taskToSuccess = [...allTodosContent][taskPosCollection];
  taskToSuccess.classList.add('success');
  saveTasks(tasks);
}

const checkHeight = () => {
  if (todoList.clientHeight >= 400) {
    todoList.style.overflowY = 'scroll';
  } else {
    todoList.style.overflowY = 'hidden';
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
  localStorage.setItem('theme', isDark);
});
