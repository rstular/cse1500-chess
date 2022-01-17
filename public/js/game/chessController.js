import {
    ChessColor,
    GameState,
    ItemsEnum,
} from "/js/game/communication/protodef.js";
import { Chess } from "/js/lib/chess.js";

export const gameInfo = {
    playerColor: ChessColor.NONE,
    board: new Chess(),
    state: GameState.WAITING_FOR_PLAYERS,
    inventory: Object.values(ItemsEnum).reduce((acc, item) => {
        acc[item] = 0;
        return acc;
    }, {}),
};
