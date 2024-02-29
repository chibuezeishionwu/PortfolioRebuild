// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (!nextId) {
        nextId = 1;
    } else {
        nextId++;
    }
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskId = task.id || generateTaskId();

    // Get today's date
    const today = dayjs();
    const dueDate = dayjs(task.dueDate, "YYYY-MM-DD");
    const daysUntilDue = dueDate.diff(today, "days");

    // Determine the background color based on the due date status
    let backgroundColor = "";
    if (daysUntilDue < 0) {
        backgroundColor = "bg-danger"; // Past due (red)
    } else if (daysUntilDue < 3) {
        backgroundColor = "bg-warning"; // Nearing deadline (yellow)
    } else {
        backgroundColor = "bg-success"; // Deadline is far (green)
    }
    const card = `
    <div id="task-${taskId}" class="task-card card mb-2 ${backgroundColor}" data-id="${taskId}">
        <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text"><strong>Due Date:</strong> ${task.dueDate}</p>
            <button class="btn btn-danger delete-btn" data-id="${taskId}"><i class="fas fa-trash"></i></button>
        </div>
    </div>
`;
return card;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();

    taskList.forEach(task => {
        const card = createTaskCard(task);
        $(`#${task.status}-cards`).append(card);
    });

    $(".task-card").draggable({
        revert: "invalid",
        zIndex: 1000
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const title = $("#task-title").val().trim();
    const description = $("#task-description").val().trim();
    const dueDate = $("#due-date").val().trim();
    if (title !== "" && dueDate !== "") {
        const newTask = {
            id: generateTaskId(),
            title: title,
            description: description,
            status: "todo",
            dueDate: dueDate
        };
        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
        $("#task-title").val("");
        $("#task-description").val("");
        $("#due-date").val("");
        $("#formModal").modal("hide");
    } else {
        alert("Please fill out all required fields.");
    }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = $(this).data("id");
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data("id");
    const newStatus = $(this).attr("id");
    const taskIndex = taskList.findIndex(task => task.id === taskId);
    taskList[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    if (!taskList) {
        taskList = [];
    }
    if (!nextId) {
        nextId = 1;
        localStorage.setItem("nextId", JSON.stringify(nextId));
    }

    renderTaskList();

    // Add Task Form Submission
    $("#addTaskForm").submit(handleAddTask);

    // Delete Task Button Click
    $(document).on("click", ".delete-btn", handleDeleteTask);

   // Make Lanes Droppable
   $(".lane").droppable({
        accept: ".task-card",
        drop: handleDrop,
    
    });

    // Date Picker
    $("#due-date").datepicker();
});
