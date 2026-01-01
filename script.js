

//Select elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById("taskList")

//Function to add task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    //Add click event to toggle complete
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    })

    //Add right-click event to delete the task
    li.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        li.remove();
        saveTasks();
    });
    taskList.appendChild(li);

    taskInput.value = '';
    saveTasks();


}

addBtn.addEventListener('click', addTask);

//Switch theme


const themeBtn = document.getElementById('themeBtn')

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    saveTheme();
}

//Save theme preference
function saveTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
}

themeBtn.addEventListener('click', toggleTheme)



//Save and load tasks

//Save tasks to local storage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) return;

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed')
        }

        li.addEventListener('click', () => {
            li.classList.toggle(completed);
            saveTasks();
        });

        li.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
    })
}

//Load theme preference
function loadTheme() {
    const isDark = JSON.parse(localStorage.getItem('darkTheme'))
    if (isDark) {
        document.body.classList.add('dark-theme')
    }
}

window.onload = () => {
    loadTasks();
    loadTheme();
};


