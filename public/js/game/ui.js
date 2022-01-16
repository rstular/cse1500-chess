import { registerListeners } from "/js/game/ui/actions.js";
import { constructHtmlBoard } from "/js/game/ui/board.js";

export const initializeUI = () => {
    constructHtmlBoard();
    registerListeners();
};
