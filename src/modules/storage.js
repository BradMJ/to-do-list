import Project from "./projects.js";
import Task from "./tasks.js";
import ProjectList from "./projectList.js";

export default class Storage {
    static saveTaskList(data) {
        localStorage.setItem('projectList', JSON.stringify(data));
    };

    static getTaskList() {
        const projectList = Object.assign(
            new ProjectList(), 
            JSON.parse(localStorage.getItem('projectList'))
        );

        projectList.setProjects(
            projectList.getProjects()
            .map((project) => Object.assign(new Project(), project))
        );

        projectList.getProjects()
            .forEach((project) => project.setTasks(
                project.getTasks().map((task) => Object.assign(new Task(), task))
            )
        );

        return projectList;
    };

    static addProject(project) {
        const projectList = Storage.getTaskList();
        projectList.addProject(project);
        Storage.saveTaskList(projectList);
    };

    static deleteProject(projectName) {
        const projectList = Storage.getTaskList();
        projectList.deleteProject(projectName);
        Storage.saveTaskList(projectList);
    };

    static addTask(projectName, task) {
        const projectList = Storage.getTaskList();
        projectList.getProject(projectName).addTask(task);
        Storage.saveTaskList(projectList);
    };

    static deleteTask(projectName, taskName) {
        const projectList = Storage.getTaskList();
        projectList.getProject(projectName).deleteTask(taskName);
        Storage.saveTaskList(projectList);
    };

    // renameTask(projectName, taskName, newTaskName) {
    //     const projectList = Storage.getTaskList();
    //     projectList.getProject(projectName).getTask(taskName).setName(newTaskName);
    //     Storage.saveTaskList(projectList);
    // };

    // Sort task storage methods here
    
};