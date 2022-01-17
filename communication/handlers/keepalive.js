const logger = require("../../logger");

function handleKeepalive(socket, _data) {
    logger.debug(`Received keepalive from socket ID ${socket.id}`);
}

module.exports = handleKeepalive;
