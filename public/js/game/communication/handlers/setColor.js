import { gameInfo } from "/js/game/chessController.js";

export function handleSetColor({ color }) {
    console.debug("Updating color", color);
    gameInfo.playerColor = parseInt(color);
}