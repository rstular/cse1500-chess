import { WEBSOCKET_URL } from "/js/game/config.js";
import { Messages } from "/js/game/protodef.js";

import { handleBoardUpdate } from "/js/game/communication/handlers/boardUpdate.js";
import { handleSetColor } from "/js/game/communication/handlers/setColor.js";

var socket = new WebSocket(WEBSOCKET_URL);

export function initializeSocket() {
    socket.sendMessage = (messageType, payload) => {
        console.debug("Sending message", messageType, payload);
        socket.send(JSON.stringify({
            message: messageType,
            data: payload
        }));
    };
    socket.addEventListener("open", () => {
        console.log("Connected to server");
        socket.sendMessage(Messages.HANDSHAKE, {
            nickname: window.localStorage.getItem("nickname") ?? "",
        });
        socket.sendMessage(Messages.JOIN_GAME, {
        });
    });

    socket.addEventListener("error", (error) => {
        console.error(error);
    });

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
            default:
                console.error("Unknown message type", message.message);
        }
    });
}

export const sendMessage = socket.sendMessage;