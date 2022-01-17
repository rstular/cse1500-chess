import { enableInventoryUse } from "/js/game/ui/inventory.js";
import { gameInfo } from "/js/game/chessController.js";
import { playMoveSound, updateBoard } from "/js/game/ui/board.js";
import { addMove } from "/js/game/ui/gameStatus.js";
import { showModalWithContent } from "/js/game/ui/modal.js";

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

    enableInventoryUse();
    updateBoard(gameInfo.board.board());
    
    addMove(move_object.san);
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
