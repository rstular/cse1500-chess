import { initializeInterface } from "/js/game/ui.js";
import { WEBSOCKET_URL } from "/js/game/config.js";
import { Messages } from "/js/game/protodef.js";

window.addEventListener("DOMContentLoaded", initializeInterface);

const socket = new WebSocket(WEBSOCKET_URL);

socket.addEventListener("open", () => {
    console.log("Connected to server");
    socket.send(JSON.stringify({
        message: Messages.HANDSHAKE,
        data: {
            nickname: window.localStorage.getItem("nickname") ?? "",
        }
    }
    ));
});

socket.addEventListener("error", (error) => {
    console.error(error);
});

socket.addEventListener("message", (event) => {
    console.log(event.data);
});