import {
    updateOpponentNickname,
    updateGameState,
} from "/js/game/ui/gameStatus.js";
import { showModalWithContent } from "/js/game/ui/modal.js";
import { gameInfo } from "/js/game/chessController.js";
import {
    GameState,
    GameAbortedReason,
} from "/js/game/communication/protodef.js";

export function handleSetState({ state, stateInfo }) {
    gameInfo.state = state;
    updateGameState(state);

    if (state === GameState.WAITING_FOR_PLAYERS) {
    } else if (state === GameState.PLAYING) {
        updateOpponentNickname(stateInfo.opponentNickname);
    } else if (state === GameState.ABORTED) {
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
    }
}
