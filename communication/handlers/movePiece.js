const logger = require("../../logger");
const { Messages } = require("../protodef");
const { GameManager } = require("../../game/controller");
const protodef = require("../../communication/protodef");

function handleMovePiece(socket, data) {
    logger.debug(`Updating board: ${data}`);
    const game = GameManager.getGame(socket.id);
    const move_info = game.board.move(data);
    if (move_info === null) {
        logger.error("Invalid move");
        // XXX: Sould end game here
        return;
    }

    if (game.board.game_over()) {
        game.state = protodef.GameState.FINISHED;
    }

    if (game.playerWhite == socket) {
        game.playerBlack.sendMessage(Messages.MOVE_PIECE, move_info);
    } else {
        game.playerWhite.sendMessage(Messages.MOVE_PIECE, move_info);
    }
}

module.exports = handleMovePiece;