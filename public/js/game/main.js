import { initializeInterface } from "/js/game/ui.js";
import { initializeModal } from "/js/game/modal.js";
import { initializeSocket } from "/js/game/communication/communication.js";

window.addEventListener("DOMContentLoaded", () => {
    initializeInterface();
    initializeSocket();
    initializeModal();
});
