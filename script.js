const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateStats(){

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending =
        total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}

function renderTasks(){

    taskList.innerHTML = "";

    const keyword =
        searchInput.value.toLowerCase();

    tasks
    .filter(task =>
        task.text.toLowerCase()
        .includes(keyword))
    .forEach((task,index)=>{

        const li =
            document.createElement("li");

        li.classList.add("task");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>
                ${task.priority} ${task.text}
            </span>

            <div class="task-buttons">

                <button class="complete-btn"
                    onclick="toggleTask(${index})">
                    ✓
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${index})">
                    ✕
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask(){

    const text =
        taskInput.value.trim();

    if(text==="") return;

    tasks.push({
        text:text,
        priority:
            priority.value==="High"
            ? "🔴"
            : priority.value==="Medium"
            ? "🟡"
            : "🟢",
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value="";
}

function toggleTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    renderTasks();
}

addBtn.addEventListener(
    "click",
    addTask
);

searchInput.addEventListener(
    "input",
    renderTasks
);

renderTasks();