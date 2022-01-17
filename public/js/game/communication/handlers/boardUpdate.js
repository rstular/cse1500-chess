import { updateBoard } from "/js/game/ui/board.js";
import { gameInfo } from "/js/game/chessController.js";

export function handleBoardUpdate({ board }) {
    gameInfo.board.load(board);
    if (gameInfo.playerColor !== gameInfo.board.turn()) {
        disableInventoryUse();
    }
    updateBoard(gameInfo.board.board());
}
