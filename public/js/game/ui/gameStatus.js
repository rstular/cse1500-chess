import { StateMap } from "/js/datamap.js";
import { GameState, ChessColor } from "/js/game/communication/protodef.js";
import { gameInfo } from "/js/game/chessController.js";
import {
    enableInventoryUse,
    disableInventoryUse,
} from "/js/game/ui/inventory.js";

export function updateOpponentNickname(nickname) {
    document.getElementById("opponent-nickname").innerText = nickname;
}

export function setMiscText(text) {
    document.getElementById("misc-status").innerText = text;
}

export function updateTurnText() {
    document.getElementById("misc-status").innerText =
        gameInfo.board.turn() === gameInfo.playerColor
            ? "Your turn"
            : "Opponent's turn";
}

function disableResignButton() {
    document.getElementById("button-resign").disabled = true;
}

function enableResignButton() {
    document.getElementById("button-resign").disabled = false;
}

function disableShopButton() {
    document.getElementById("button-p2w").disabled = true;
}

function enableShopButton() {
    document.getElementById("button-p2w").disabled = false;
}

export function updateGameState(state) {
    document.getElementById("game-status-text").innerText = StateMap[state];

    if (state === GameState.PLAYING) {
        enableResignButton();
        enableInventoryUse();
    } else {
        disableResignButton();
        disableInventoryUse();
    }
    if (
        state === GameState.PLAYING ||
        state === GameState.WAITING_FOR_PLAYERS
    ) {
        enableShopButton();
    } else {
        disableShopButton();
    }

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
