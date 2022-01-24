import { getElements } from "./domelements.js";
import { editDate } from "./dateEditor.js";

const functions = (() => {

    const taskFactory = (text, date, projectIndex) => {
        return {
            // newTask,
            text: text,
            date: date,
            projectIndex: projectIndex,
        };
    };

    // Projects factory function
    function projectFactory (name) {
        let tasks = [];
        return {
            name: name,
            tasks
        };
    };

    // When called, this function generates the input form for creating new task
    function promptDiv () {
       
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

    // When called, calls the factory function
    // And creates new task object
    function createTask (array) {
        const taskText = document.querySelector('.task-form-input');
        const taskDate = document.querySelector('.task-form-date');

        let task = taskFactory(taskText.value, taskDate.value, getElements.selectedProjectIndex);  // call factory function 

        array.push(task);
        
    };

    // Function that creates HTML for a task
    function createTaskHtml (array) {
        array.forEach((ele) => {
            
            const newTask = document.createElement('div');
            newTask.classList.add(ele.projectIndex);
            newTask.innerHTML = ` 
                <div class="task">
                    <p class="task-text">${ele.text}</p>
                    <p class="task-date">${ele.date}</p>
                    <div class="delete-task-button">X</div>
                </div>
            `
        getElements.taskOnlyContainer.append(newTask);
        });
        editDate.editDate();
    };

    // Function that renders tasks on DOM from an array
    function renderTasks (array) {
        getElements.taskOnlyContainer.innerHTML = '';
        
        createTaskHtml(array);
                enumerateElements('task');                           
                localStorage.setItem('projects', JSON.stringify(getElements.projectsArray));
    };

    //Function that sets the "data-number" attribute to each item in the array formed from given name
    function enumerateElements (name) {
        let allElements = Array.from(document.getElementsByClassName(name));
            allElements.forEach((ele) => {
                ele.parentElement.setAttribute('data-index', allElements.indexOf(ele)); // Numbering the new task
            })
    }


    // When called, this function hides the prompt form
    function hideInputForm (button) {
        
        getElements.newTask.style.display = 'flex';
        button.parentElement.remove();
    }

    // When called, this function hides "add task" button
    function hideAddTaskButton () {
        getElements.newTask.style.display = 'none';
    };

    // When called, this function shows "add task" Button again
    function showAddTaskButton () {
        getElements.newTask.style.display = 'flex';
    };


    // Function that renders tasks from local storage, if there are any
    // If not, it creates a "default project"
    function renderTasksFromLocalStorageOnStartup () {
        if (localStorage.projects) {    // if there are any projects
                    getElements.projectsArray = JSON.parse(localStorage.getItem('projects'));
                    renderProjects();
                    renderTasks(getElements.projectsArray[0].tasks);
        } else {    
            const defaultProject = projectFactory('Default Project');
            getElements.projectsArray.push(defaultProject);
            renderProjects();
        };    

        
    };


    // Function that grabs the input value and creates new project
    function createProject (button) {
        let projectInput = document.querySelector('#new-project-input').value;
        let newProject = projectFactory(projectInput);

        getElements.newProject.style.display ='flex';
        button.parentElement.remove();

        getElements.projectsArray.push(newProject);
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
            localStorage.setItem('projects', JSON.stringify(getElements.projectsArray));

        });
    };

    // Selects project - assigns an index number
    function selectProject (element) {
        let index = element.getAttribute('data-index');
        renderTasks(getElements.projectsArray[index].tasks);  // renders tasks array from clicked project

        getElements.selectedProjectIndex = index;  // saves the selected project index
    };

    // Local storage function
    function refreshLocalStorageProjects () {
        localStorage.setItem('projects', JSON.stringify(getElements.projectsArray));
    };

    // Renders all tasks when we click button "all tasks" and order them by date
    function renderTasksFromAllProjects () {

    let toBeRendered = [];
    getElements.taskOnlyContainer.innerHTML = '';   // resets to empty
        getElements.projectsArray.forEach((ele) => {
            ele.tasks.forEach((task) => {
                toBeRendered.push(task);
            });
        });

        toBeRendered.sort((a, b) => {  // Sort tasks by date
            let c = new Date(a.date);
            let d = new Date(b.date);
            return c-d;
        });

        createTaskHtml(toBeRendered);  // adds tasks from each project
        
        getElements.titleText.textContent = 'All tasks';  // Edits title text
    };


    // Hides editing of tasks, when "all tasks" is selected
    function hideAllDeleteTaskButtons () {

        let allDeleteTaskButtons = document.querySelectorAll('.delete-task-button');
            allDeleteTaskButtons.forEach((button) => {
                button.remove();
            });
    };

    // Updates the title text above the tasks
    function updateText () {
        let text = getElements.projectsArray[getElements.selectedProjectIndex].name   // Gets name of selected project
        getElements.titleText.textContent = `Tasks in ${text}`;
    };

    // When called, creates the "reset" button 
    function createResetButton () {
        const btn = document.createElement('button');
        btn.classList.add('reset-button');
        btn.textContent = 'Reset - delete all tasks and projects';

        getElements.contentContainer.append(btn);
    };

    // Removes reset button
    function removeResetButton () {
        document.querySelector('.reset-button').remove();  //remove reset button
    };

    // "Are you sure?" prompt
    function createAreYouSurePrompt () {
        document.querySelector('.reset-button').remove();  //remove reset button

        const prompt = document.createElement('div');  // create prompt div
        prompt.classList.add('are-you-sure');

        prompt.innerHTML = `
        <p>Confirm deleting all projects and tasks</p>
        <div id="are-you-sure-buttons">
            <button class="are-you-sure-yes">Yes</button>
            <button class="are-you-sure-no">No</button>
        </div>
        `
        getElements.contentContainer.append(prompt);
    };

    // Reset all
    function deleteAllTasksAndProjects () {
        localStorage.clear();
        location.reload();
    };

    return {
        promptDiv,
        hideInputForm,
        showAddTaskButton,
        hideAddTaskButton,
        createTask,
        renderTasks,
        renderTasksFromLocalStorageOnStartup,
        renderTasksFromAllProjects,
        refreshLocalStorageProjects,
        enumerateElements,
        promptNewProjectName,
        createProject,
        renderProjects,
        selectProject,
        hideAllDeleteTaskButtons,
        updateText,
        createResetButton,
        removeResetButton,
        createAreYouSurePrompt,
        deleteAllTasksAndProjects,
    };
})();

export { functions };