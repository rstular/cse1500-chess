import { initializeUI } from "/js/game/ui.js";
import { initializeModal } from "/js/game/ui/modal.js";
import { initializeSocket } from "/js/game/communication/communication.js";

window.addEventListener("DOMContentLoaded", () => {
    initializeUI();
    initializeSocket();
    initializeModal();
});
