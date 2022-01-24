import { eventListeners } from "./eventlisteners.js"
import { functions } from "./functions.js";

// Listens for all clicks on "body"

eventListeners.listen();


eventListeners.keyboardSupport();

functions.renderTasksFromLocalStorageOnStartup();
functions.updateText();  




