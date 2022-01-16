import { ChessColor, GameState } from "/js/game/protodef.js";
import { Chess } from "/js/lib/chess.js";

export const gameInfo = {
    playerColor: ChessColor.WHITE,
    playerTurn: ChessColor.WHITE,
    board: new Chess(),
    state: GameState.WAITING_FOR_PLAYERS,
};
