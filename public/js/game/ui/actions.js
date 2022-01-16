import { socket } from "/js/game/communication/communication.js";
import { Messages, GameState } from "/js/game/communication/protodef.js";
import { gameInfo } from "/js/game/chessController.js";

export function registerListeners() {
    document.getElementById("button-resign").addEventListener("click", () => {
        if (gameInfo.state === GameState.PLAYING) {
            socket.sendMessage(Messages.RESIGN);
        }
    });
}
