import { getElements } from "./domelements.js";
import { functions } from "./functions.js";

const eventListeners = (() => {
    function listen () {
        getElements.body.addEventListener('click', (e) => {

            // Enable removing tasks with their X buttons
            if (e.target.classList.contains('delete-task-button')){
                getElements.tasksArray.splice(e.target.parentElement.parentElement.getAttribute('data-index'), 1);  // removes object from array
                e.target.parentElement.parentElement.remove();  // removes dom element  
                functions.refreshLocalStorage(); // removes from local storage
            };

            // Enable adding new task with "+ New Task" button
            if (e.target.classList.contains('add-new-task-button')){
                functions.promptDiv();
            };

            // Enable "add" button in the form
            // - creates new task object, renders from "tasks" array and hides the input form
            if (e.target.classList.contains('task-add-button') && !getElements.selectedProjectIndex){
                functions.createTask(getElements.tasksArray);  
                functions.renderTasks(getElements.tasksArray);
                functions.hideInputForm(e.target);
            };

            // Enable "cancel" button in the form
            // - hides input form and shows the "+ New Task button"
            if (e.target.classList.contains('task-cancel-button')){
                functions.hideInputForm(e.target);
            };

            // Enable "+ New Project" button
            if (e.target.classList.contains('add-new-project-button')){
                functions.promptNewProjectName();
            };

            // Enable "add" button in new project prompt
            if (e.target.classList.contains('new-project-prompt-button')){
                functions.createProject(e.target);
                functions.renderProjects();
            };

            // Enable removing project with their X buttons
            if (e.target.classList.contains('delete-project-button')){
                getElements.projectsArray.splice(e.target.parentElement.getAttribute('data-index'), 1);  // removes object from array
                e.target.parentElement.remove();
            };

            // Selecting projects
            if (e.target.classList.contains('project-wrapper')){
                functions.selectProject(e.target.parentElement);
            };
            if (e.target.classList.contains('project-innertext')){
                functions.selectProject(e.target.parentElement.parentElement);
            };


            // Adding tasks to a project ( when a project is selected)
            if (e.target.classList.contains('task-add-button') && (getElements.selectedProjectIndex > -1)) {
                
                functions.createTask(getElements.projectsArray[getElements.selectedProjectIndex].tasks)
                functions.renderTasks(getElements.projectsArray[getElements.selectedProjectIndex].tasks)
                functions.hideInputForm(e.target);
                console.log(getElements.projectsArray[getElements.selectedProjectIndex])

            };


        })
    }

    return {
        listen,
    }
})();

export { eventListeners };