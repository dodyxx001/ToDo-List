import { getElements } from "./domelements.js";
import { taskFactory } from "./taskfactory.js";
import { eventListeners } from "./eventlisteners.js"
import { functions } from "./functions.js";

// Listens for all clicks on "body"
eventListeners.listen();

functions.renderTasksFromLocalStorageOnStartup();



