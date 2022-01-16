import { updateBoard } from "/js/game/ui/board.js";
import { gameInfo } from "/js/game/chessController.js";

export function handleBoardUpdate({ board }) {
    gameInfo.board.load(board);
    updateBoard(gameInfo.board.board());
}
