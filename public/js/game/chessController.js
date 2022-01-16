import { ChessColor, GameState } from "/js/game/communication/protodef.js";
import { Chess } from "/js/lib/chess.js";

export const gameInfo = {
    playerColor: ChessColor.NONE,
    board: new Chess(),
    state: GameState.WAITING_FOR_PLAYERS,
};
