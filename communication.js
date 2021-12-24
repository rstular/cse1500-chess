const gameController = require("./gameController");
const { Messages } = require("./protodef");
const logger = require("./logger");

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
            handleHandshake(socket, parsedData.data);
            break;
        default:
            logger.error("Unknown message");
    }
}

function handleHandshake(socket, data) {
    socket.nickname = data.nickname;
    logger.debug(`Set nickname for socket ${socket.id} to ${socket.nickname}`);
}

module.exports = { handleMessage };