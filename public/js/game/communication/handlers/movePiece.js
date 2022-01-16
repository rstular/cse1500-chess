import { gameInfo } from "/js/game/chessController.js";
import { updateBoard, playMoveSound } from "/js/game/ui.js";
import { showModalWithContent } from "/js/game/modal.js";

export function handleMovePiece(move_object) {
    console.debug("Updating board:", move_object);
    gameInfo.board.move(move_object);
    if (typeof move_object.flags === "string") {
        try {
            playMoveSound(move_object.flags);
        } catch (e) {
            console.error(e);
        }
    }
    updateBoard(gameInfo.board.board());

    if (gameInfo.board.game_over()) {
        if (gameInfo.board.in_checkmate()) {
            showModalWithContent("Checkmate", "Checkmate!");
        } else if (gameInfo.board.in_stalemate()) {
            showModalWithContent("Stalemate", "Stalemate!");
        } else if (gameInfo.board.insufficient_material()) {
            showModalWithContent("Draw", "Draw!");
        } else if (gameInfo.board.in_threefold_repetition()) {
            showModalWithContent("Draw", "Draw!");
        } else if (gameInfo.board.in_draw()) {
            showModalWithContent("Draw", "Draw!");
        }
    }
}