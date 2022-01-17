import { enableInventoryUse } from "/js/game/ui/inventory.js";
import { gameInfo } from "/js/game/chessController.js";
import { playMoveSound, updateBoard } from "/js/game/ui/board.js";
import { addMove } from "/js/game/ui/gameStatus.js";
import { showModalWithContent } from "/js/game/ui/modal.js";
import { updateTurnText } from "/js/game/ui/gameStatus.js";

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
    updateTurnText();
    updateBoard(gameInfo.board.board());
    
    addMove(move_object.san);
}
