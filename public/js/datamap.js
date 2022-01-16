import { GameState } from "/js/game/communication/protodef.js";

export const StateMap = {
    [GameState.WAITING_FOR_PLAYERS]: "Waiting for players",
    [GameState.PLAYING]: "In progress",
    [GameState.ABORTED]: "Aborted",
    [GameState.WON_WHITE]: "White won",
    [GameState.WON_BLACK]: "Black won",
    [GameState.DRAW]: "Draw"
}