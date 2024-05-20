document.addEventListener("DOMContentLoaded", function() {
    // Check if there are existing tasks in local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    displayTasks(tasks);
});

function displayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        // Add buttons for marking as completed and deleting
        const buttonsDiv = document.createElement("div");
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => toggleCompletion(index);
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);

        buttonsDiv.appendChild(completeButton);
        buttonsDiv.appendChild(deleteButton);

        li.appendChild(buttonsDiv);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);
    displayTasks(tasks);
    taskInput.value = "";
}

function toggleCompletion(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    displayTasks(tasks);
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks(tasks);
}

function filterTasks() {
    const filter = document.getElementById("filter").value;
    const tasks = getTasks();

    if (filter === "completed") {
        const completedTasks = tasks.filter(task => task.completed);
        displayTasks(completedTasks);
    } else if (filter === "incomplete") {
        const incompleteTasks = tasks.filter(task => !task.completed);
        displayTasks(incompleteTasks);
    } else {
        displayTasks(tasks);
    }
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
