const logger = require("../../logger");
const { Messages } = require("../protodef");
const { GameManager, ConnectionManager } = require("../../game/controller");
const protodef = require("../../communication/protodef");

function handleMovePiece(socket, data) {
    logger.debug(`Updating board: ${data}`);
    const game = GameManager.getGame(socket.id);

    if (game.state !== protodef.GameState.PLAYING) {
        logger.debug(`Game ${game.gameId} is not in PLAYING state`);
        delete GameManager.connectionGameMap[socket.id];
        delete ConnectionManager.connections[socket.id];
        socket.close();
        return;
    }

    const move_info = game.board.move(data);
    if (move_info === null) {
        logger.error("Invalid move");
        return;
    }

    if (game.playerWhite == socket) {
        game.playerBlack.sendMessage(Messages.MOVE_PIECE, move_info);
    } else {
        game.playerWhite.sendMessage(Messages.MOVE_PIECE, move_info);
    }

    if (game.board.game_over()) {
        if (
            game.board.in_draw() ||
            game.board.in_stalemate() ||
            game.board.in_threefold_repetition() ||
            game.board.insufficient_material()
        ) {
            game.setState(protodef.GameState.DRAW);
        } else if (game.board.in_checkmate()) {
            game.setState(
                game.board.turn() === protodef.ChessColor.WHITE
                    ? protodef.GameState.WON_BLACK
                    : protodef.GameState.WON_WHITE
            );
        }
        GameManager.nGamesCompleted++;
    }
}

module.exports = handleMovePiece;
