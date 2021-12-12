function saveTask() {
    const taskInfoBox = document.getElementById("taskInfoBox");
    const deadlineDateBox = document.getElementById("deadlineDateBox");
    const deadlineTimeBox = document.getElementById("deadlineTimeBox");

    const taskInfo = taskInfoBox.value;
    const deadlineDate = deadlineDateBox.value;
    const deadlineTime = deadlineTimeBox.value;

    const task = { taskInfo, deadlineDate, deadlineTime };

    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }

    allTasks.push(task);

    allTasksJsonString = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksJsonString);

    displayAllTasks();

    taskInfoBox.value = "";
    deadlineDateBox.value = "";
    deadlineTimeBox.value = "";
    taskInfoBox.focus();

}

function displayAllTasks() {

    const container = document.getElementById("container");

    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }

    container.innerHTML = "";

    let index = 0;
    for (let task of allTasks) {
        const div = document.createElement("div");
        div.setAttribute("id", "card");
        container.appendChild(div);

        const innerDiv = document.createElement("div");
        innerDiv.setAttribute("id", "cardText");
        innerDiv.innerHTML = task.taskInfo;
        div.appendChild(innerDiv);

        const innerBottomDiv = document.createElement("div");
        innerBottomDiv.setAttribute("id", "cardDateTime");
        innerBottomDiv.innerHTML = task.deadlineDate + "<br>" + task.deadlineTime;
        div.appendChild(innerBottomDiv);

        const button = document.createElement("button");
        button.setAttribute("class", "close");
        button.setAttribute("type", "button");
        div.appendChild(button);

        function removeTask() {
            div.style.display = "none";
            allTasks = JSON.parse(allTasksJsonString);
            index = allTasks.indexOf(task);
            allTasks.splice(index, 1);
            localStorage.setItem("allTasks", JSON.stringify(allTasks));
        }

        function displayCloseButton() {
            span.style.opacity = "1";
        }

        function hideCloseButton() {
            span.style.opacity = "0";
        }

        const span = document.createElement("span");
        span.setAttribute("class", "glyphicon glyphicon-remove card");
        span.style.opacity = "0";
        span.onclick = function () { removeTask() };
        span.onmouseover = function () { displayCloseButton() };
        span.onmouseout = function () { hideCloseButton() };
        button.appendChild(span);
    }
}

displayAllTasks();