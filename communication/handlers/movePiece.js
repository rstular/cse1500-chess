const logger = require("../../logger");
const { Messages } = require("../protodef");
const { GameManager, ConnectionManager } = require("../../game/controller");
const { getRandomFromList } = require("../../utils");
const {
    GameState,
    ChessColor,
    ItemsEnum,
} = require("../../communication/protodef");

function handleMovePiece(socket, data) {
    logger.debug(`Updating board: ${data.from} -> ${data.to}`);
    const game = GameManager.getGame(socket.id);
    if (game === undefined) {
        logger.error(`Game not found for socket ${socket.id}`);
        return;
    }

    if (game.state !== GameState.PLAYING) {
        logger.debug(`Game ${game.gameId} is not in PLAYING state`);
        delete GameManager.connectionGameMap[socket.id];
        delete ConnectionManager.connections[socket.id];
        socket.close();
        return;
    }

    if (
        (game.playerWhite == socket &&
            game.board.turn() !== ChessColor.WHITE) ||
        (game.playerBlack == socket && game.board.turn() !== ChessColor.BLACK)
    ) {
        logger.error("Not your turn");
        return;
    }

    if (game.playerWhite == socket && game.queuedEvents.white.length > 0) {
        while (game.queuedEvents.white.length > 0) {
            const event = game.queuedEvents.white.pop();
            if (event.type === ItemsEnum.Drunk) {
                const moveToMake = getRandomFromList(game.board.moves());
                const move_info = game.board.move(moveToMake);
                game.playerBlack.sendMessage(Messages.MOVE_PIECE, move_info);
                game.playerWhite.sendMessage(Messages.BOARD_UPDATE, {
                    board: game.board.fen(),
                });
                break;
            } else {
                logger.error(`Unknown event type: ${event.type}`);
            }
        }
    } else if (game.playerBlack == socket && game.queuedEvents.black.length > 0) {
        while (game.queuedEvents.black.length > 0) {
            const event = game.queuedEvents.black.pop();
            if (event.type === ItemsEnum.Drunk) {
                const moveToMake = getRandomFromList(game.board.moves());
                const move_info = game.board.move(moveToMake);
                game.playerWhite.sendMessage(Messages.MOVE_PIECE, move_info);
                game.playerBlack.sendMessage(Messages.BOARD_UPDATE, {
                    board: game.board.fen(),
                });
                break;
            }
        }
    } else {
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
    }
}

module.exports = handleMovePiece;
