import { gameInfo } from "/js/game/chessController.js";
import { updateBoard } from "/js/game/ui.js";

export function handleMovePiece(move_object) {
    console.debug("Updating board:", move_object);
    gameInfo.board.move(move_object);
    updateBoard(gameInfo.board.board());
}