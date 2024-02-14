/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui.js */ \"./src/modules/ui.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', _modules_ui_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadHomepage);\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/modules/projectList.js":
/*!************************************!*\
  !*** ./src/modules/projectList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProjectList)\n/* harmony export */ });\n/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ \"./src/modules/projects.js\");\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.js */ \"./src/modules/tasks.js\");\n\n\n\nclass ProjectList {\n    constructor() {\n        this.projects = [];\n        this.projects.push(new _projects_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Clean House'));\n    };\n\n    setProjects(projects) {\n        this.projects = projects;\n    };\n\n    getProjects() {\n        return this.projects;\n    };\n\n    getProject(projectName) {\n        return this.projects.find((project) => project.getName() === projectName);\n    };\n\n    contains(projectName) {\n        return this.projects.some((project) => project.getName() === projectName);\n    };\n\n    addProject(newProject) {\n        if (this.projects.find((project) => project.name === newProject.name)) return;\n        this.projects.push(newProject);\n    };\n\n    deleteProject(projectName) {\n        const projectToDelete = this.projects.find((project) => project.getName() === projectName);\n        this.projects.splice(this.projects.indexOf(projectToDelete), 1);\n    };\n\n    // Sort tasks methods here\n    \n};\n\n//# sourceURL=webpack://to-do-list/./src/modules/projectList.js?");

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\nclass Project {\n    constructor(name) {\n        this.name = name;\n        this.tasks = [];\n    };\n\n    setName(name) {\n        this.name = name;\n    };\n\n    getName() {\n        return this.name;\n    };\n\n    setTasks(tasks) {\n        this.tasks = tasks;\n    };\n\n    getTasks() {\n        return this.tasks;\n    };\n\n    getTask(taskName) {\n        return this.tasks.find((task) => task.getName() === taskName);\n    };\n\n    contains(taskName) {\n        return this.tasks.some((task) => task.getName() === taskName);\n    };\n\n    addTask(newTask) {\n        if (this.tasks.find((task) => task.getName() === newTask.name)) return;\n        this.tasks.push(newTask);\n    };\n\n    deleteTask(taskName) {\n        this.tasks = this.tasks.filter((task) => task.name !== taskName);\n    };\n\n    // Add due date filters here\n\n};\n\n//# sourceURL=webpack://to-do-list/./src/modules/projects.js?");

/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Storage)\n/* harmony export */ });\n/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ \"./src/modules/projects.js\");\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.js */ \"./src/modules/tasks.js\");\n/* harmony import */ var _projectList_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectList.js */ \"./src/modules/projectList.js\");\n\n\n\n\nclass Storage {\n    static saveTaskList(data) {\n        localStorage.setItem('projectList', JSON.stringify(data));\n    };\n\n    static getTaskList() {\n        const projectList = Object.assign(\n            new _projectList_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](), \n            JSON.parse(localStorage.getItem('projectList'))\n        );\n\n        projectList.setProjects(\n            projectList.getProjects()\n            .map((project) => Object.assign(new _projects_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), project))\n        );\n\n        projectList.getProjects()\n            .forEach((project) => project.setTasks(\n                project.getTasks().map((task) => Object.assign(new _tasks_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](), task))\n            )\n        );\n\n        return projectList;\n    };\n\n    static addProject(project) {\n        const projectList = Storage.getTaskList();\n        projectList.addProject(project);\n        Storage.saveTaskList(projectList);\n    };\n\n    static deleteProject(projectName) {\n        const projectList = Storage.getTaskList();\n        projectList.deleteProject(projectName);\n        Storage.saveTaskList(projectList);\n    };\n\n    static addTask(projectName, task) {\n        const projectList = Storage.getTaskList();\n        projectList.getProject(projectName).addTask(task);\n        Storage.saveTaskList(projectList);\n    };\n\n    static deleteTask(projectName, taskName) {\n        const projectList = Storage.getTaskList();\n        projectList.getProject(projectName).deleteTask(taskName);\n        Storage.saveTaskList(projectList);\n    };\n\n    // renameTask(projectName, taskName, newTaskName) {\n    //     const projectList = Storage.getTaskList();\n    //     projectList.getProject(projectName).getTask(taskName).setName(newTaskName);\n    //     Storage.saveTaskList(projectList);\n    // };\n\n    // Sort task storage methods here\n    \n};\n\n//# sourceURL=webpack://to-do-list/./src/modules/storage.js?");

/***/ }),

/***/ "./src/modules/tasks.js":
/*!******************************!*\
  !*** ./src/modules/tasks.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\n    constructor(name) {\n        this.name = name;\n    };\n\n    setName(name) {\n        this.name = name;\n    };\n\n    getName() {\n        return this.name;\n    };\n\n    // Add due dates\n\n};\n\n//# sourceURL=webpack://to-do-list/./src/modules/tasks.js?");

/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ \"./src/modules/projects.js\");\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.js */ \"./src/modules/tasks.js\");\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ \"./src/modules/storage.js\");\n\n\n\n\nclass UI {\n\n    // Load Content\n\n    static loadHomepage() {\n        UI.loadProjects();\n        UI.initAddProjectButton();\n        document.addEventListener('keydown', UI.handleKeyboardInput);\n    };\n\n    static loadProjects() {\n        _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getTaskList().getProjects().forEach((project) => {\n            UI.createProject(project.name);\n        });\n\n        UI.initAddProjectButton();\n    };\n\n    static loadTasks(projectName) {\n        _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getTaskList().getProject(projectName).getTasks().forEach((task) => UI.createTask(task.name));\n        UI.initAddTaskButtons();\n    };\n\n    static loadProjectContent(projectName) {\n        const taskHeader = document.querySelector('#task-header');\n        const taskBody = document.querySelector('#task-body');\n\n        taskHeader.innerHTML = `\n            <h3 data-project-title id=\"project-preview-title\" class=\"project-preview-title\">${projectName}</h3>\n            <p data-task-count class=\"task-count\"></p>`;\n\n        taskBody.innerHTML += `\n            <div id=\"tasks\" class=\"tasks\"></div>\n            <div id=\"delete-buttons\" class=\"delete-buttons\">\n                <button data-delete-completed-tasks-btn class=\"delete-btn delete-tasks-btn\">Clear Completed Tasks</button>\n                <button data-delete-selected-project-btn class=\"delete-btn delete-project-btn\">Delete Project</button>\n            </div>\n            <button data-modal-target=\"#add-task-modal\" id=\"add-task-btn\" class=\"add-todo-btn add-task-btn\">+ Add Task</button>`;\n        \n        UI.loadTasks(projectName);\n    };\n\n    // Project Content\n\n    static createProject(name) {\n        const projectsList = document.getElementById('projects-list');\n        projectsList.innerHTML += `\n        <button class=\"project-element\" data-project-button>    \n            <span>${name}</span>   \n        </button>`\n\n        UI.initProjectElements();\n    };\n\n    static initAddProjectButton() {\n        const addProjectButton = document.querySelector('#add-project-btn');\n        const buttonAddProjectModal = document.querySelector('#btn-add-project-modal');\n        const buttonCancelProjectModal = document.querySelector('#btn-cancel-project-modal');\n        const projectForm = document.querySelector('[data-new-project-form]');\n\n        addProjectButton.addEventListener('click', UI.openAddProjectModal);\n        buttonAddProjectModal.addEventListener('click', UI.addProject);\n        buttonCancelProjectModal.addEventListener('click', UI.closeAddProjectModal);\n        projectForm.addEventListener('submit', UI.handleAddProjectModalInput);\n    };\n\n    static openAddProjectModal() {\n        const addProjectModal = document.querySelector('#add-project-modal');\n        const addProjectButton = document.querySelector('#add-project-btn');\n        const overlay = document.querySelector('#overlay');\n\n        UI.closeAllModals();\n        addProjectModal.classList.add('active');\n        addProjectButton.classList.add('active');\n        overlay.classList.add('active');\n    };\n\n    static closeAddProjectModal() {\n        const addProjectModal = document.querySelector('#add-project-modal');\n        const addProjectButton = document.querySelector('#add-project-btn');\n        const addProjectModalInput = document.querySelector('#input-add-project-modal');\n        const overlay = document.querySelector('#overlay');\n\n        addProjectModal.classList.remove('active');\n        addProjectButton.classList.remove('active');\n        overlay.classList.remove('active');\n        addProjectModalInput.value = '';\n    };\n\n    static addProject() {\n        const addProjectModalInput = document.querySelector('#input-add-project-modal');\n        const projectName = addProjectModalInput.value;\n\n        if (projectName === '') {\n            alert(\"Project name can't be empty!\");\n            return;\n        };\n\n        if (_storage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getTaskList().contains(projectName)) {\n            addProjectModalInput.value = '';\n            alert('Project names must be different');\n            return;\n        };\n\n        _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addProject(new _projects_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](projectName));\n        UI.createProject(projectName);\n        UI.closeAddProjectModal();\n    };\n\n    static handleAddProjectModalInput(e) {\n        e.preventDefault();\n        if (e.key === 'Enter') UI.addProject();\n    };\n\n    static initProjectElements() {\n        const projectElements = document.querySelectorAll('.project-element');\n        projectElements.forEach((projectElement) => \n            projectElement.addEventListener('click', UI.handleProjectElement)\n        );\n    };\n\n    static handleProjectElement() {\n        const projectName = this.children[0].textContent;\n\n        UI.openProject(projectName, this);\n    };\n\n    static openProject(projectName, projectElement) {\n        const projectElements = document.querySelectorAll('.project-element');\n        const elements = [...projectElements];\n\n        elements.forEach((element) => element.classList.remove('active-project'));\n        projectElement.classList.add('active-project');\n        UI.closeAddProjectModal();\n        UI.loadProjectContent(projectName);\n        UI.clearProjectPreview();\n        UI.loadProjectContent(projectName);\n        UI.initDeleteProjectButton();\n        UI.initDeleteTasksButton();\n        UI.renderTaskCount();\n    };\n\n    static initDeleteProjectButton() {\n        const deleteSelectedProjectButton = document.querySelector('[data-delete-selected-project-btn]');\n        \n        deleteSelectedProjectButton.addEventListener('click', UI.deleteProject);\n    };\n\n    static deleteProject() {\n        const projectName = document.querySelector('#project-preview-title').textContent;\n        \n        _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].deleteProject(projectName);\n        UI.clearProjectPreview();\n        UI.clearProjects();\n        UI.loadProjects();\n    };\n\n    static clearProjectPreview() {\n        const projectPreviewTitle = document.getElementById('project-preview-title');\n        const taskBody = document.getElementById('task-body');\n\n        projectPreviewTitle.textContent = '';\n        taskBody.innerHTML = '';\n    };\n\n    static clearProjects() {\n        const projectsList = document.querySelector('#projects-list');\n        projectsList.textContent = '';\n    };\n\n    // Task Content\n\n    static createTask(name) {\n        const tasks = document.getElementById('tasks');\n        tasks.innerHTML += `\n            <div class=\"task\">\n                <input type=\"checkbox\" id=\"${name}\" class=\"task-checkbox\" />\n                <label for=\"${name}\">\n                    <span class=\"custom-checkbox\"></span>\n                    ${name}\n                </label>\n            </div>`;\n\n        UI.initTaskElements();\n    };\n\n    static initAddTaskButtons() {\n        const addTaskButton = document.querySelector('#add-task-btn');\n        const addTaskModalButton = document.querySelector('#btn-add-task-modal');\n        const cancelTaskModalButton = document.querySelector('#btn-cancel-task-modal');\n        const taskForm = document.querySelector('[data-new-task-form]');\n\n        addTaskButton.addEventListener('click', UI.openAddTaskModal);\n        addTaskModalButton.addEventListener('click', UI.addTask);\n        cancelTaskModalButton.addEventListener('click', UI.closeAddTaskModal);\n        taskForm.addEventListener('submit', UI.handleAddTaskModalInput);\n    };\n\n    static openAddTaskModal() {\n        const addTaskModal = document.querySelector('#add-task-modal');\n        const addTaskButton = document.querySelector('#add-task-btn');\n        const overlay = document.querySelector('#overlay');\n\n        addTaskModal.classList.add('active');\n        addTaskButton.classList.add('active');\n        overlay.classList.add('active');\n    };\n\n    static closeAddTaskModal() {\n        const addTaskModal = document.querySelector('#add-task-modal');\n        const addTaskButton = document.querySelector('#add-task-btn');\n        const addTaskModalInput = document.querySelector('#input-add-task-modal');\n        const overlay = document.querySelector('#overlay');\n\n        addTaskModal.classList.remove('active');\n        addTaskButton.classList.remove('active');\n        overlay.classList.remove('active');\n        addTaskModalInput.value = '';\n    };\n\n    static addTask() {\n        const projectName = document.getElementById('project-preview-title').textContent;\n        const addTaskModalInput = document.querySelector('[data-new-task-input]');\n        const taskName = addTaskModalInput.value;\n\n        if (taskName === '') {\n            alert(`Task name can't be empty`);\n            return;\n        };\n        if (_storage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getTaskList().getProject(projectName).contains(taskName)) {\n            alert('Task names must be different');\n            addTaskModalInput.value = '';\n            return;\n        };\n\n        _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addTask(projectName, new _tasks_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](taskName));\n        UI.createTask(taskName);\n        UI.closeAddTaskModal();\n        UI.renderTaskCount();\n    };\n\n    static handleAddTaskModalInput(e) {\n        e.preventDefault();\n        if (e.key === 'Enter') UI.addTask();\n    };\n\n    static initTaskElements() {\n        const taskElements = document.querySelectorAll('.task-checkbox');\n\n        taskElements.forEach((taskElement) => \n            taskElement.addEventListener('change', UI.handleTaskElement));\n    };\n\n    static handleTaskElement(e) {\n        if (e.target.checked) {\n            e.target.classList.add('task-complete');\n        } else {\n            e.target.classList.remove('task-complete');\n        };\n    };\n    \n    static renderTaskCount() {\n        const taskCountElement = document.querySelector('[data-task-count]');\n        const taskCount = document.querySelectorAll('.task-checkbox').length;\n        const taskString = taskCount === 1 ? \"task\" : \"tasks\";\n        taskCountElement.innerText = `${taskCount} ${taskString} remaining`;\n    }\n\n    static initDeleteTasksButton() {\n        const deleteCompletedTasksButton = document.querySelector('[data-delete-completed-tasks-btn]');\n        \n        deleteCompletedTasksButton.addEventListener('click', UI.deleteTasks);\n    };\n\n    static deleteTasks() {\n        const projectName = document.querySelector('#project-preview-title').textContent;\n        const taskNames = document.querySelectorAll('.task-checkbox:checked');\n\n        taskNames.forEach((task) => { \n            task = task.id;\n            _storage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].deleteTask(projectName, task);\n        });\n\n        UI.clearTasks();\n        UI.loadTasks(projectName);\n        UI.renderTaskCount();\n    };\n\n    static clearTasks() {\n        const tasksList = document.querySelector('#tasks');\n        tasksList.textContent = '';\n    };\n    \n    static closeAllModals() {\n        UI.closeAddProjectModal();\n        if (document.getElementById('add-task-btn')) {\n            UI.closeAddTaskModal();\n        };\n        if (document.getElementById('#tasks') && document.getElementById('#tasks').innerHTML !== '') {\n            UI.closeAllInputs();\n        };\n    };\n\n    static clear() {\n        UI.clearProjectPreview();\n        UI.clearProjects();\n        UI.clearTasks();\n    };\n\n    static handleKeyboardInput(e) {\n        if (e.key === 'Escape') UI.closeAllModals();\n    };\n\n};\n\n//# sourceURL=webpack://to-do-list/./src/modules/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;