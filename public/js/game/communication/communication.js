import { WEBSOCKET_URL, KEEPALIVE_INTERVAL } from "/js/game/config.js";
import { Messages } from "/js/game/communication/protodef.js";

import { handleBoardUpdate } from "/js/game/communication/handlers/boardUpdate.js";
import { handleSetColor } from "/js/game/communication/handlers/setColor.js";
import { handleMovePiece } from "/js/game/communication/handlers/movePiece.js";
import { handleSetState } from "/js/game/communication/handlers/setState.js";
import { handleSetInventory } from "/js/game/communication/handlers/setInventory.js";
import { handleUseItem } from "/js/game/communication/handlers/useItem.js";

export var socket = new WebSocket(WEBSOCKET_URL);

export function initializeSocket() {
    socket.sendMessage = (messageType, payload = {}) => {
        console.debug("Sending message", messageType, payload);
        socket.send(
            JSON.stringify({
                message: messageType,
                data: payload,
            })
        );
    };
    socket.addEventListener("open", () => {
        console.log("Connected to server");
        socket.sendMessage(Messages.HANDSHAKE, {
            nickname: window.localStorage.getItem("nickname") ?? "",
        });
        socket.sendMessage(Messages.JOIN_GAME, {});
    });

    socket.addEventListener("error", (error) => {
        console.error(error);
    });

    setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.sendMessage(Messages.KEEPALIVE, {});
        }
    }, KEEPALIVE_INTERVAL);

    socket.addEventListener("message", (event) => {
        console.log(event.data);
        const message = JSON.parse(event.data);
        switch (message.message) {
            case Messages.BOARD_UPDATE:
                handleBoardUpdate(message.data);
                break;
            case Messages.SET_COLOR:
                handleSetColor(message.data);
                break;
            case Messages.MOVE_PIECE:
                handleMovePiece(message.data);
                break;
            case Messages.SET_STATE:
                handleSetState(message.data);
                break;
            case Messages.SET_INVENTORY:
                handleSetInventory(message.data);
                break;
            case Messages.USE_ITEM:
                handleUseItem(message.data);
                break;
            default:
                console.error("Unknown message type", message.message);
        }
    });
}
