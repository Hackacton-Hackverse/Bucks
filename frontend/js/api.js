function clickCompleteTask(task_id, element){
    var content  = document.getElementById("main-content-frame-bottom-card-3");

    const postData = {
        user_id: 1,
        task_id: task_id
    };
    
    fetch('http://127.0.0.1:5000/complete-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            contentt = element.parentNode.parentNode.parentNode.content;
            content.innerHTML += contentt
            element.parentNode.parentNode.parentNode.remove();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function clickDeleteTask(task_id, element){
    const postData = {
        user_id: 1,
        task_id: task_id
    };
    
    fetch('http://127.0.0.1:5000/delete-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            element.parentNode.parentNode.parentNode.remove();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function createTask(event) {
    event.preventDefault();

    var task = "";
    // Data to send in the request body
    const postData = {
        user_id: 1,
        title: document.getElementById('create-task-title').value,
        subtitle: document.getElementById('create-task-subtitle').value,
        comments: document.getElementById('create-task-comments').value,
        due_date: document.querySelector('input[type="datetime-local"]').value,
    };

    fetch('http://127.0.0.1:5000/create-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var content  = document.getElementById("main-content-frame-bottom-card-1");
            content.innerHTML += 
            `<div class="main-content-frame-bottom-card-task">
                <div class="main-content-frame-bottom-card-task-title">`+document.getElementById('create-task-title').value+`</div>
                <div class="main-content-frame-bottom-card-task-subtitle">`+document.getElementById('create-task-subtitle').value+`</div>
                <div style="display: none" id="comment">`+document.getElementById('create-task-comments').value+`</div>
                <div style="display: none" id="taskid">`+document.getElementById('create-task-comments').value+`</div>
                <div class="main-content-frame-bottom-card-task-deadline">Deadline</div>
                <div class="main-content-frame-bottom-card-task-deadline-bar-to-do"></div>
                <div class="main-content-frame-bottom-card-task-bottom">
                    <div class="main-content-frame-bottom-card-task-bottom-expire-date">`+document.querySelector('input[type="datetime-local"]').value+`</div>
                    <div class="main-content-frame-bottom-card-task-bottom-buttons">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" class="main-content-frame-bottom-card-task-bottom-button" onclick="clickCompleteTask(`+data.task_id+`, this)">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Flat_cross_icon.svg" class="main-content-frame-bottom-card-task-bottom-button" onclick="clickDeleteTask(`+data.task_id+`, this)">
                    </div>
                </div>
            </div>`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function listToDoTasks() {
    // Data to send in the request body
    const postData = {
        user_id: 1
    };

    var content  = document.getElementById("main-content-frame-bottom-card-1");
    
    fetch('http://127.0.0.1:5000/get-tasks/to-do', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Iterate over the data array and log each task
            data.forEach(task => {
                content.innerHTML += 
                `<div class="main-content-frame-bottom-card-task">
                    <div class="main-content-frame-bottom-card-task-title">`+task.title+`</div>
                    <div class="main-content-frame-bottom-card-task-subtitle">`+task.subtitle+`</div>
                    <div style="display:none;" id="taskid">`+task.task_id+`</div>
                    <div class="main-content-frame-bottom-card-task-deadline">Deadline</div>
                    <div class="main-content-frame-bottom-card-task-deadline-bar-to-do"></div>
                    <div class="main-content-frame-bottom-card-task-bottom">
                        <div class="main-content-frame-bottom-card-task-bottom-expire-date">`+task.due_date+`</div>
                        <div class="main-content-frame-bottom-card-task-bottom-buttons">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" class="main-content-frame-bottom-card-task-bottom-button" onclick="clickCompleteTask(`+task.task_id+`)">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Flat_cross_icon.svg" class="main-content-frame-bottom-card-task-bottom-button" onclick="clickDeleteTask(`+task.task_id+`, this)">
                        </div>
                    </div>
                </div>`;
            });
            listExpiredTasks();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function listExpiredTasks() {
    // Data to send in the request body
    const postData = {
        user_id: 1
    };

    var content  = document.getElementById("main-content-frame-bottom-card-2");
    
    fetch('http://127.0.0.1:5000/get-tasks/expired', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Iterate over the data array and log each task
            data.forEach(task => {
                content.innerHTML += 
                `<div class="main-content-frame-bottom-card-task">
                    <div class="main-content-frame-bottom-card-task-title">`+task.title+`</div>
                    <div class="main-content-frame-bottom-card-task-subtitle">`+task.subtitle+`</div>
                    <div style="display:none;" id="taskid">`+task.task_id+`</div>
                    <div class="main-content-frame-bottom-card-task-deadline">Deadline</div>
                    <div class="main-content-frame-bottom-card-task-deadline-bar-expired"></div>
                    <div class="main-content-frame-bottom-card-task-bottom">
                        <div class="main-content-frame-bottom-card-task-bottom-expire-date">`+task.due_date+`</div>
                        <div class="main-content-frame-bottom-card-task-bottom-buttons">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" class="main-content-frame-bottom-card-task-bottom-button">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Flat_cross_icon.svg" class="main-content-frame-bottom-card-task-bottom-button" onclick="clickDeleteTask(`+task.task_id+`, this)">
                        </div>
                    </div>
                </div>`;
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function listDoneTasks() {
    // Data to send in the request body
    const postData = {
        user_id: 1
    };

    var content  = document.getElementById("main-content-frame-bottom-card-3");
    
    fetch('http://127.0.0.1:5000/get-tasks/done', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Iterate over the data array and log each task
            data.forEach(task => {
                content.innerHTML += 
                `<div class="main-content-frame-bottom-card-task">
                    <div class="main-content-frame-bottom-card-task-title">`+task.title+`</div>
                    <div class="main-content-frame-bottom-card-task-subtitle">`+task.subtitle+`</div>
                    <div style="display:none;" id="taskid">`+task.task_id+`</div>
                    <div class="main-content-frame-bottom-card-task-deadline">Deadline</div>
                    <div class="main-content-frame-bottom-card-task-deadline-bar-done"></div>
                    <div class="main-content-frame-bottom-card-task-bottom">
                        <div class="main-content-frame-bottom-card-task-bottom-expire-date">`+task.due_date+`</div>
                        <div class="main-content-frame-bottom-card-task-bottom-buttons">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" class="main-content-frame-bottom-card-task-bottom-button">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Flat_cross_icon.svg" class="main-content-frame-bottom-card-task-bottom-button" onclick="clickDeleteTask(`+task.task_id+`, this)">
                        </div>
                    </div>
                </div>`;
            });
            listDoneTasks();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


listToDoTasks();