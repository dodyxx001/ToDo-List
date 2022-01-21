const getElements = (() => {

    // let tasksArray = [];
    let projectsArray = [];
    
    let selectedProjectIndex = 0;

    const body = document.querySelector('body');
    const newTask = document.querySelector('#add-new-task-button');
    const newProject = document.querySelector('#add-project');
    const contentContainer = document.querySelector('content');
    const taskOnlyContainer = document.querySelector('#task-container');
    const projectsContainer = document.querySelector('#projects-container');
    const titleText = document.querySelector('#tasks');




    return {
        // tasksArray,
        projectsArray,
        selectedProjectIndex,
        newTask,
        newProject,
        contentContainer,
        body,
        taskOnlyContainer,
        projectsContainer,
        titleText
    };
})();

export {getElements};