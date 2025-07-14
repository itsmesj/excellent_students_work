const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let isEditing = false;
let editingIndex = null;

function renderTasks(){
    taskList.innerHTML = '';
    tasks.forEach((task, index) =>{
        const li = document.createElement('li');
        if(task.completed) li.classList.add('completed');

        li.innerHTML =`
        <span>${task.text}</span>
        <div class = "action">
        <button onclick = "toggleComplete(${index})">${task.completed ? 'not done' : ' done'}</button>
        <button onclick = "editTask(${index})">Edit</button>
         <button onclick = "deleteTask(${index})">Delete</button>
         </div>
         `;
         taskList.appendChild(li);
    });
}

     function addTsk(){
        const text = taskInput.value.trim();
        if(!text) return alery('Please enter a task');

        if(isEditing){
            tasks[editingIndex].text = text;
            isEditing = false;
            editingIndex = null;
            addTaskBtn.textContent ='Add Task';
        }else  {
            tasks.push({ text, completed:false});
        }

        taskInput.value = '';
        sessionStorage.removeItem('lastTaskInput');
        saveTasks();
        renderTasks();
     }
     function editTask(index){
        taskInput.value = tasks[index].text;
        isEditing =true;
        editingIndex = index;
        addTaskBtn.textContent = 'Update Task';
        sessionStorage.removeItem('lastTaskInput', tasks[index].text);
     }

   function deleteTask(index){
    if(confirm('Delete this task?')){
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
   }

    function toggleComplete(index){
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

     function saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
     }

     toggleThemeBtn.addEventListener('click',() =>{
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark')? 'dark' : 'light');
     });

     function loadTheme(){
        if(localStorage.getItem('theme') ==='dark'){
            document.body.classList.add('dark');
        }
     }

window.onload = () => {
    loadTheme();
    renderTasks();
    const lastInput = sessionStorage.getItem('lastTaskInput');
    if (lastInput) taskInput.value = lastInput;
};

addTaskBtn.addEventListener('click', addTsk);








