const gameController = require("../game/controller");
const { Messages } = require("./protodef");
const logger = require("../logger");
const handlers = require("./handlers/handlers");

function sendMessage(messageType, payload) {
    this.send(JSON.stringify({
        message: messageType,
        data: payload
    }));
}

function handleConnection(ws) {
    const conn = ws;
    conn.id = gameController.connectionId++;
    conn.sendMessage = sendMessage;

    logger.verbose(`New connection: ${conn.id}`);
    conn.on("message", (message) => {
        logger.debug(`Message received: ${message}`);
        handleMessage(conn, message);
    });
    conn.on("close", () => {
        logger.verbose(`Connection closed: ${conn.id}`);
    });

    gameController.ConnectionManager.addConnection(conn);
}

function handleMessage(socket, message) {
    let parsedData;
    try {
        parsedData = JSON.parse(message);
    } catch {
        logger.error("Invalid JSON");
        return;
    }

    switch (parsedData.message) {
        case Messages.HANDSHAKE:
            handlers.handshakeHandler(socket, parsedData.data);
            break;
        case Messages.JOIN_GAME:
            handlers.joinGameHandler(socket, parsedData.data);
            break;
        default:
            logger.error("Unknown message");
    }
}



module.exports = { handleMessage, handleConnection };