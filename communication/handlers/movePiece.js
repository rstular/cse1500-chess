const logger = require("../../logger");
const { Messages } = require("../protodef");

function handleMovePiece(socket, data) {
    logger.debug(`Updating board: ${data}`);
    const move_info = socket.game.board.move(data);
    if (move_info === null) {
        logger.error("Invalid move");
        // XXX: Sould end game here
        return;
    }
    if (socket.game.playerWhite == socket) {
        socket.game.playerBlack.sendMessage(Messages.MOVE_PIECE, data);
    } else {
        socket.game.playerWhite.sendMessage(Messages.MOVE_PIECE, data);
    }
}

module.exports = handleMovePiece;