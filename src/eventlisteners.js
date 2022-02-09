import { getElements } from "./domelements.js";
import { functions } from "./functions.js";

const eventListeners = (() => {
    function listen () {
        getElements.body.addEventListener('click', (e) => {

            // Enable removing tasks with their X buttons
            if (e.target.classList.contains('delete-task-button')){
                e.target.parentElement.parentElement.remove();  // removes dom element  
                functions.enumerateElements('task');  // re- enumerate tasks
                         
                getElements.projectsArray[getElements.selectedProjectIndex].tasks.splice(e.target.parentElement.parentElement.getAttribute('data-index'), 1);
                functions.refreshLocalStorageProjects();
                // }
            };

            // Enable adding new task with "+ New Task" button
            if (e.target.classList.contains('add-new-task-button')){
                functions.promptDiv();
                functions.hideAddTaskButton();
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
                functions.renderProjects();
            };

            // Selecting projects
            if (e.target.classList.contains('project-wrapper')){
                functions.selectProject(e.target.parentElement);
                functions.showAddTaskButton(); // if it was hidden, makes it visible
                functions.updateText();
                functions.removeResetButton();

            };
            if (e.target.classList.contains('project-innertext')){
                functions.selectProject(e.target.parentElement.parentElement);
                functions.showAddTaskButton(); // if it was hidden, makes it visible
                functions.updateText();
                functions.removeResetButton();

            };

            // Adding tasks to a project ( when a project is selected)
            if (e.target.classList.contains('task-add-button') && (getElements.selectedProjectIndex > -1)) {
                
                functions.createTask(getElements.projectsArray[getElements.selectedProjectIndex].tasks)
                functions.renderTasks(getElements.projectsArray[getElements.selectedProjectIndex].tasks)
                functions.hideInputForm(e.target);
            };

            // Enabling 'all tasks' button - render all tasks, default and from all rpojects
            // Creates reset button
            if (e.target.classList.contains('all-tasks-button')) {
                functions.renderTasksFromAllProjects();
                functions.hideAllDeleteTaskButtons();
                functions.hideAddTaskButton();

                functions.createResetButton();

                // functions.orderTasksByDate();
            };

            // "reset" button functionality - create prompt
            if (e.target.classList.contains('reset-button')) {
                functions.createAreYouSurePrompt();
            };

            // "reset" prompt functionality - "yes" and "no" buttons
            if (e.target.classList.contains('are-you-sure-yes')) {
                functions.deleteAllTasksAndProjects();
            };

            if (e.target.classList.contains('are-you-sure-no')) {
                document.querySelector('.are-you-sure').remove();
                functions.createResetButton();
            };


        });
    };



    function keyboardSupport () {
        getElements.body.addEventListener('keydown', (e) => {

            if (e.key === '+') {
                functions.promptDiv();
                functions.hideAddTaskButton();

                document.querySelector('.task-form-input').focus();
               
            };

            if (e.key === 'Enter') {
                document.querySelector('.task-add-button').click();
            };
        });
    };


    return {
        listen,
        keyboardSupport,
    }
})();

export { eventListeners };