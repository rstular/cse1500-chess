const logger = require("../../logger");

function handleHandshake(socket, data) {
    socket.nickname = data.nickname;
    logger.debug(`Set nickname for socket ${socket.id} to ${socket.nickname}`);
}

module.exports = handleHandshake;