const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterTasks(this.dataset.filter);
    });
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            <span class="taskText">${taskText}</span>
            <button class="icon-btn edit-icon" title="Modifier"><i class="fas fa-edit"></i></button>
            <button class="icon-btn delete-icon" title="Supprimer"><i class="fas fa-trash-alt"></i></button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';

        const deleteBtn = li.querySelector('.delete-icon');
        const editBtn = li.querySelector('.edit-icon');
        const checkbox = li.querySelector('input[type="checkbox"]');
        const taskSpan = li.querySelector('.taskText');

        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        editBtn.addEventListener('click', function() {
            const newText = prompt("Modifier la tâche:", taskSpan.textContent);
            if (newText !== null && newText.trim() !== '') {
                taskSpan.textContent = newText.trim();
            }
        });

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                taskSpan.style.textDecoration = 'line-through';
            } else {
                taskSpan.style.textDecoration = 'none';
            }
            filterTasks(document.querySelector('.filter-btn.active').dataset.filter);
        });

        filterTasks(document.querySelector('.filter-btn.active').dataset.filter);
    }
}

function filterTasks(filter) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        switch(filter) {
            case 'all':
                task.style.display = '';
                break;
            case 'todo':
                task.style.display = checkbox.checked ? 'none' : '';
                break;
            case 'done':
                task.style.display = checkbox.checked ? '' : 'none';
                break;
        }
    });
}