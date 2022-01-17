import {
    updateOpponentNickname,
    updateGameState,
} from "/js/game/ui/gameStatus.js";
import { showModalWithContent } from "/js/game/ui/modal.js";
import { gameInfo } from "/js/game/chessController.js";
import {
    GameState,
    GameAbortedReason,
    ChessColor,
} from "/js/game/communication/protodef.js";
import { disableInventoryUse } from "/js/game/ui/inventory.js";
import { updateTurnText, setMiscText } from "/js/game/ui/gameStatus.js";

export function handleSetState({ state, stateInfo }) {
    gameInfo.state = state;
    updateGameState(state);

    if (state === GameState.WAITING_FOR_PLAYERS) {
        setMiscText("...");
    } else if (state === GameState.PLAYING) {
        updateTurnText();
        updateOpponentNickname(stateInfo.opponentNickname);
        if (gameInfo.playerColor !== gameInfo.board.turn()) {
            disableInventoryUse();
        }
    } else if (state === GameState.ABORTED) {
        setMiscText("Game over");
        switch (stateInfo.reason) {
            case GameAbortedReason.PLAYER_DISCONNECTED:
                showModalWithContent(
                    "Game aborted",
                    "Your opponent has disconnected."
                );
                break;
            case GameAbortedReason.PLAYER_CHEATING:
                if (stateInfo.player === gameInfo.playerColor) {
                    showModalWithContent(
                        "Game aborted",
                        "You have been flagged as cheating."
                    );
                } else {
                    showModalWithContent(
                        "Game aborted",
                        "Your opponent has been flagged as cheating."
                    );
                }
                break;
            default:
                showModalWithContent(
                    "Game aborted",
                    "The game has been aborted."
                );
                console.error("Unknown game aborted reason:", stateInfo.reason);
                break;
        }
    } else if (state === GameState.WON_WHITE) {
        setMiscText("Game over");
        showModalWithContent(
            "Game over",
            gameInfo.playerColor === ChessColor.WHITE
                ? stateInfo.messageWhite || "You won!"
                : stateInfo.messageBlack || "You lost!"
        );
    } else if (state === GameState.WON_BLACK) {
        setMiscText("Game over");
        showModalWithContent(
            "Game over",
            gameInfo.playerColor === ChessColor.BLACK
                ? stateInfo.messageBlack || "You won!"
                : stateInfo.messageWhite || "You lost!"
        );
    } else if (state === GameState.DRAW) {
        setMiscText("Game over");
        showModalWithContent("Game over", "The game ended in a draw.");
    } else {
        console.error("Unknown game state:", state);
    }
}
