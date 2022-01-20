import { getElements } from "./domelements.js";
import { eventListeners } from "./eventlisteners.js";
import { taskFactory } from "./taskfactory.js";

const functions = (() => {

    // When called, this function generates the input form for creating new task
    function promptDiv () {
        getElements.newTask.style.display = 'none';
    
        const taskForm = document.createElement('div');
        taskForm.classList.add('task-form');
        taskForm.innerHTML = `
            <div class="task-form-container">
                <input type="text" placeholder="task name" class="task-form-input">
                <input type="date" class="task-form-date">
                <button class="task-add-button">Add</button>
                <button class="task-cancel-button">Cancel</button>
            </div>
        `
        getElements.contentContainer.appendChild(taskForm);
    }

    // When called, calls the constructor function from taskfactory.js
    // And creates new task object
    function createTask (array) {
        const taskText = document.querySelector('.task-form-input');
        const taskDate = document.querySelector('.task-form-date');

    

        let task = taskFactory(taskText.value, taskDate.value);  // call factory function 

        array.push(task);
        
    };

    // Function that renders tasks on DOM from an array
    function renderTasks (array) {
        getElements.taskOnlyContainer.innerHTML = '';
        array.forEach((ele) => {
            
                const newTask = document.createElement('div');
                newTask.innerHTML = ` 
                    <div class="task">
                        <p class="task-text">${ele.text}</p>
                        <p class="task-date">${ele.date}</p>
                        <div class="delete-task-button">X</div>
                    </div>
                `
            getElements.taskOnlyContainer.append(newTask);
            
            if (array === getElements.tasksArray) {
                enumerateElements('task');
                refreshLocalStorage();
            };
        });
    };

    //Function that sets the "data-number" attribute to each item in the array formed from given name
    function enumerateElements (name) {
        let allElements = Array.from(document.getElementsByClassName(name));
        allElements.forEach((ele) => {
            ele.parentElement.setAttribute('data-index', allElements.indexOf(ele)); // Numbering the new task
        })
    }


    // When called, this function hides the "add task" prompt form
    function hideInputForm (button) {
        
        getElements.newTask.style.display = 'flex';
        button.parentElement.remove();
    }


    // Function that renders tasks from local storage, if there are any
    function renderTasksFromLocalStorageOnStartup () {
        if (localStorage.length) {
            getElements.tasksArray = JSON.parse(localStorage.getItem('tasks'));
            renderTasks(getElements.tasksArray);
        };
    };

    // Function that sets or refreshes local storage when needed
    // Makes local storage = tasksArray
    function refreshLocalStorage () {
        localStorage.setItem('tasks', JSON.stringify(getElements.tasksArray));
    };

    // Function that prompts name of new project, when adding new project
    function promptNewProjectName () {
        getElements.newProject.style.display ='none';
        const prompt = document.createElement('div');
            prompt.classList.add('new-project-prompt');
            prompt.innerHTML = `
            <p id="new-project-prompt-text">Name of new project: </p>
            <input type="text" id="new-project-input">
            <button class="new-project-prompt-button">Add</button>
            `
        getElements.projectsContainer.append(prompt);
    };

    // Function that grabs the input value and creates new project
    function createProject (button) {
        let projectInput = document.querySelector('#new-project-input').value;
        let newProject = projectFactory(projectInput);

        getElements.newProject.style.display ='flex';
        button.parentElement.remove();

        getElements.projectsArray.push(newProject);
    };

    // Projects factory function
    function projectFactory (name) {
        let tasks = [];
        return {
            name: name,
            tasks
        };
    };

    // Render projects from projects array
    function renderProjects () {
        getElements.projectsContainer.innerHTML = '';
        
        getElements.projectsArray.forEach((ele) => {
            const newProject = document.createElement('div');
                newProject.classList.add('project');
                newProject.innerHTML = `
                    <div class="project-wrapper clickable">
                        <p class="project-innertext">${ele.name}</p>   
                    </div>
                    <p class="delete-project-button">X</p>
                    `
            getElements.projectsContainer.append(newProject);

            enumerateElements('project-wrapper'); // enumerates projects
        });
    };

    function selectProject (element) {
        let index = element.getAttribute('data-index');
        renderTasks(getElements.projectsArray[index].tasks);  // renders tasks array from clicked project

        getElements.selectedProjectIndex = index;  // saves the selected project index
    };




    return {
        promptDiv,
        hideInputForm,
        createTask,
        renderTasks,
        renderTasksFromLocalStorageOnStartup,
        refreshLocalStorage,
        enumerateElements,
        promptNewProjectName,
        createProject,
        renderProjects,
        selectProject,
    };
})();

export { functions };