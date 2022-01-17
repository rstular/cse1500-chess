import { registerListeners } from "/js/game/ui/actions.js";
import { constructHtmlBoard } from "/js/game/ui/board.js";
import { initializePayPal } from "/js/game/ui/paypal.js";
import { registerButtonHandlers } from "/js/game/ui/inventory.js";

export const initializeUI = () => {
    constructHtmlBoard();
    registerListeners();
    registerButtonHandlers();
    initializePayPal();
};
