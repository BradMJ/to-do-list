import Project from "./projects.js";
import Task from "./tasks.js";
import Storage from "./storage.js";

export default class UI {

    // Load Content

    static loadHomepage() {
        UI.loadProjects();
        UI.initAddProjectButton();
        document.addEventListener('keydown', UI.handleKeyboardInput);
        console.log('UI.loadHomepage is working')
    };

    static loadProjects() {
        Storage.getTaskList().getProjects().forEach((project) => {
            UI.createProject(project.name);
        });

        UI.initAddProjectButton();
    };

    static loadTasks(projectName) {
        Storage.getTaskList().getProject(projectName).getTasks().forEach((task) => UI.createTask(task.name));
        UI.initAddTaskButtons();
    };

    static loadProjectContent(projectName) {
        const taskHeader = document.querySelector('#task-header');
        const taskBody = document.querySelector('#task-body');

        taskHeader.innerHTML = `
            <h3 data-project-title id="project-preview-title" class="project-preview-title">${projectName}</h3>
            <p data-task-count class="task-count"></p>`;

        taskBody.innerHTML += `
            <div id="tasks" class="tasks"></div>
            <div id="delete-buttons" class="delete-buttons">
                <button data-delete-completed-tasks-btn class="delete-btn delete-tasks-btn">Clear Completed Tasks</button>
                <button data-delete-selected-project-btn class="delete-btn delete-project-btn">Delete Project</button>
            </div>
            <button data-modal-target="#add-task-modal" id="add-task-btn" class="add-todo-btn add-task-btn">+ Add Task</button>`;
        
        UI.loadTasks(projectName);
    };

    // Project Content

    static createProject(name) {
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML += `
        <button class="project-element" data-project-button>    
            <span>${name}</span>   
        </button>`

        UI.initProjectElements();
    };

    static initAddProjectButton() {
        const addProjectButton = document.querySelector('#add-project-btn');
        const buttonAddProjectModal = document.querySelector('#btn-add-project-modal');
        const buttonCancelProjectModal = document.querySelector('#btn-cancel-project-modal');
        const projectForm = document.querySelector('[data-new-project-form]');

        addProjectButton.addEventListener('click', UI.openAddProjectModal);
        buttonAddProjectModal.addEventListener('click', UI.addProject);
        buttonCancelProjectModal.addEventListener('click', UI.closeAddProjectModal);
        projectForm.addEventListener('submit', UI.handleAddProjectModalInput);
    };

    static openAddProjectModal() {
        const addProjectModal = document.querySelector('#add-project-modal');
        const addProjectButton = document.querySelector('#add-project-btn');
        const overlay = document.querySelector('#overlay');

        UI.closeAllModals();
        addProjectModal.classList.add('active');
        addProjectButton.classList.add('active');
        overlay.classList.add('active');
    };

    static closeAddProjectModal() {
        const addProjectModal = document.querySelector('#add-project-modal');
        const addProjectButton = document.querySelector('#add-project-btn');
        const addProjectModalInput = document.querySelector('#input-add-project-modal');
        const overlay = document.querySelector('#overlay');

        addProjectModal.classList.remove('active');
        addProjectButton.classList.remove('active');
        overlay.classList.remove('active');
        addProjectModalInput.value = '';
    };

    static addProject() {
        const addProjectModalInput = document.querySelector('#input-add-project-modal');
        const projectName = addProjectModalInput.value;

        if (projectName === '') {
            alert("Project name can't be empty!");
            return;
        };

        if (Storage.getTaskList().contains(projectName)) {
            addProjectModalInput.value = '';
            alert('Project names must be different');
            return;
        };

        Storage.addProject(new Project(projectName));
        UI.createProject(projectName);
        UI.closeAddProjectModal();
    };

    static handleAddProjectModalInput(e) {
        e.preventDefault();
        if (e.key === 'Enter') UI.addProject();
    };

    static initProjectElements() {
        const projectElements = document.querySelectorAll('.project-element');
        projectElements.forEach((projectElement) => 
            projectElement.addEventListener('click', UI.handleProjectElement)
        );
    };

    static handleProjectElement() {
        const projectName = this.children[0].textContent;

        UI.openProject(projectName, this);
    };

    static openProject(projectName, projectElement) {
        const projectElements = document.querySelectorAll('.project-element');
        const elements = [...projectElements];

        elements.forEach((element) => element.classList.remove('active-project'));
        projectElement.classList.add('active-project');
        UI.closeAddProjectModal();
        UI.loadProjectContent(projectName);
        UI.clearProjectPreview();
        UI.loadProjectContent(projectName);
        UI.initDeleteProjectButton();
        UI.initDeleteTasksButton();
    };

    static initDeleteProjectButton() {
        const deleteSelectedProjectButton = document.querySelector('[data-delete-selected-project-btn]');
        
        deleteSelectedProjectButton.addEventListener('click', UI.deleteProject);
    };

    static deleteProject() {
        const projectName = document.querySelector('#project-preview-title').textContent;
        
        Storage.deleteProject(projectName);
        UI.clearProjectPreview();
        UI.clearProjects();
        UI.loadProjects();
    };

    static clearProjectPreview() {
        const projectPreviewTitle = document.getElementById('project-preview-title');
        const taskBody = document.getElementById('task-body');

        projectPreviewTitle.textContent = '';
        taskBody.innerHTML = '';
    };

    static clearProjects() {
        const projectsList = document.querySelector('#projects-list');
        projectsList.textContent = '';
    };

    // Task Content

    static createTask(name) {
        const tasks = document.getElementById('tasks');
        tasks.innerHTML += `
            <div class="task">
                <input type="checkbox" id="${name}" class="task-checkbox" />
                <label for="${name}">
                    <span class="custom-checkbox"></span>
                    ${name}
                </label>
            </div>`;

        UI.initTaskElements();
    };

    static initAddTaskButtons() {
        const addTaskButton = document.querySelector('#add-task-btn');
        const addTaskModalButton = document.querySelector('#btn-add-task-modal');
        const cancelTaskModalButton = document.querySelector('#btn-cancel-task-modal');
        const taskForm = document.querySelector('[data-new-task-form]');

        addTaskButton.addEventListener('click', UI.openAddTaskModal);
        addTaskModalButton.addEventListener('click', UI.addTask);
        cancelTaskModalButton.addEventListener('click', UI.closeAddTaskModal);
        taskForm.addEventListener('submit', UI.handleAddTaskModalInput);
    };

    static openAddTaskModal() {
        const addTaskModal = document.querySelector('#add-task-modal');
        const addTaskButton = document.querySelector('#add-task-btn');
        const overlay = document.querySelector('#overlay');

        addTaskModal.classList.add('active');
        addTaskButton.classList.add('active');
        overlay.classList.add('active');
    };

    static closeAddTaskModal() {
        const addTaskModal = document.querySelector('#add-task-modal');
        const addTaskButton = document.querySelector('#add-task-btn');
        const addTaskModalInput = document.querySelector('#input-add-task-modal');
        const overlay = document.querySelector('#overlay');

        addTaskModal.classList.remove('active');
        addTaskButton.classList.remove('active');
        overlay.classList.remove('active');
        addTaskModalInput.value = '';
    };

    static addTask() {
        const projectName = document.getElementById('project-preview-title').textContent;
        const addTaskModalInput = document.querySelector('[data-new-task-input]');
        const taskName = addTaskModalInput.value;

        if (taskName === '') {
            alert(`Task name can't be empty`);
            return;
        };
        if (Storage.getTaskList().getProject(projectName).contains(taskName)) {
            alert('Task names must be different');
            addTaskModalInput.value = '';
            return;
        };

        Storage.addTask(projectName, new Task(taskName));
        console.log(projectName);
        console.log(taskName);
        UI.createTask(taskName);
        UI.closeAddTaskModal();
    };

    static handleAddTaskModalInput(e) {
        e.preventDefault();
        if (e.key === 'Enter') UI.addTask();
    };

    static initTaskElements() {
        const taskElements = document.querySelectorAll('.task-checkbox');

        taskElements.forEach((taskElement) => 
            taskElement.addEventListener('change', UI.handleTaskElement));
    };

    static handleTaskElement(e) {
        if (e.target.checked) {
            e.target.classList.add('task-complete');
        } else {
            e.target.classList.remove('task-complete');
        };
    };

    static initDeleteTasksButton() {
        const deleteCompletedTasksButton = document.querySelector('[data-delete-completed-tasks-btn]');
        
        deleteCompletedTasksButton.addEventListener('click', UI.deleteTasks);
    };

    static deleteTasks() {
        const projectName = document.querySelector('#project-preview-title').textContent;
        const taskNames = document.querySelectorAll('.task-checkbox:checked');

        taskNames.forEach((task) => { 
            task = task.id;
            Storage.deleteTask(projectName, task);
        });

        UI.clearTasks();
        UI.loadTasks(projectName);
    };

    static clearTasks() {
        const tasksList = document.querySelector('#tasks');
        tasksList.textContent = '';
    };
    
    static closeAllModals() {
        UI.closeAddProjectModal();
        if (document.getElementById('add-task-btn')) {
            UI.closeAddTaskModal();
        };
        if (document.getElementById('#tasks') && document.getElementById('#tasks').innerHTML !== '') {
            UI.closeAllInputs();
        };
    };

    static clear() {
        UI.clearProjectPreview();
        UI.clearProjects();
        UI.clearTasks();
    };

    static handleKeyboardInput(e) {
        if (e.key === 'Escape') UI.closeAllModals();
    };

};