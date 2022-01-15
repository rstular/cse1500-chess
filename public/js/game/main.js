import { initializeInterface } from "/js/game/ui.js";
import { initializeSocket } from "/js/game/communication/communication.js";

window.addEventListener("DOMContentLoaded", () => {
    initializeInterface();
    initializeSocket();
});
