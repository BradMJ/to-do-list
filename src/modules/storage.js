import Project from "./projects";
import Task from "./tasks";
import ProjectList from "./projectList";

export default class Storage {
    saveTaskList(data) {
        localStorage.setItem('projectList', JSON.stringify(data));
    };

    getTaskList() {
        const projectList = Object.assign(
            new ProjectList(), 
            JSON.parse(localStorage.getItem('projectList'))
        );

        projectList.setProjects(
            projectList.getProjects()
            .map((projects) => Object.assign(new Project(), project))
        );

        projectList.getProjects()
            .forEach((project) => project.setTasks(
                project.getTasks().map((task) => Object.assign(new Task(), task))
            )
        );

        return projectList;
    };

    addProject(project) {
        const projectList = Storage.getTaskList();
        projectList.addProject(project);
        Storage.saveTaskList(projectList);
    };

    deleteProject(projectName) {
        const projectList = Storage.getTaskList();
        projectList.deleteProject(projectName);
        Storage.saveTaskList(projectList);
    };

    addTask(projectName, task) {
        const projectList = Storage.getTaskList();
        projectList.getProject(projectName).addTask(task);
        Storage.saveTaskList(projectList);
    };

    deleteTask(projectName, taskName) {
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