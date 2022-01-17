import { socket } from "/js/game/communication/communication.js";
import { Messages, GameState } from "/js/game/communication/protodef.js";
import { gameInfo } from "/js/game/chessController.js";
import { showPaymentsModal } from "/js/game/ui/modal.js";
import { showInventory } from "/js/game/ui/inventory.js";

export function registerListeners() {
    document.getElementById("button-resign").addEventListener("click", () => {
        if (gameInfo.state === GameState.PLAYING) {
            socket.sendMessage(Messages.RESIGN);
        }
    });
    document.getElementById("button-p2w").addEventListener("click", () => {
        if (
            gameInfo.state === GameState.PLAYING ||
            gameInfo.state === GameState.WAITING_FOR_PLAYERS
        ) {
            showPaymentsModal();
        }
    });
    document
        .getElementById("button-inventory")
        .addEventListener("click", showInventory);
}
