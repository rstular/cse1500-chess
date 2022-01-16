import { StateMap } from "/js/datamap.js";
import { GameState, ChessColor } from "/js/game/communication/protodef.js";
import { gameInfo } from "/js/game/chessController.js";

export function updateOpponentNickname(nickname) {
    document.getElementById("").innerText = nickname;
}

export function updateGameState(state) {
    document.getElementById("game-status-text").innerText = StateMap[state];

    const STATUS_CONTAINER = document.getElementById("game-status");
    STATUS_CONTAINER.className = "";
    switch (state) {
        case GameState.WAITING_FOR_PLAYERS:
            STATUS_CONTAINER.classList.add("waiting-for-players");
            break;
        case GameState.PLAYING:
            STATUS_CONTAINER.classList.add("playing");
            break;
        case GameState.ABORTED:
            STATUS_CONTAINER.classList.add("aborted");
            break;
        case GameState.DRAW:
            STATUS_CONTAINER.classList.add("draw");
            break;
        case GameState.WON_WHITE:
            if (gameInfo.playerColor === ChessColor.WHITE) {
                STATUS_CONTAINER.classList.add("won");
            } else {
                STATUS_CONTAINER.classList.add("lost");
            }
            break;
        case GameState.WON_BLACK:
            if (gameInfo.playerColor === ChessColor.BLACK) {
                STATUS_CONTAINER.classList.add("won");
            } else {
                STATUS_CONTAINER.classList.add("lost");
            }
            break;
        default:
            console.error("Unknown game state:", state);
    }
}

export function addMove(moveText, moveColor = ChessColor.NONE) {
    const MOVE_LIST_CONTAINER = document.getElementById("move-list");

    const new_move = document
        .getElementById("template-move")
        .content.cloneNode(true);

    new_move.querySelector(".move-text").innerText = moveText;
    MOVE_LIST_CONTAINER.appendChild(new_move);
}
