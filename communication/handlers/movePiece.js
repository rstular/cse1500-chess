const logger = require("../../logger");
const { GameManager, ConnectionManager } = require("../../game/controller");
const { getRandomFromList } = require("../../utils");
const {
    Messages,
    GameState,
    ChessColor,
    ItemsEnum,
} = require("../../communication/protodef");

function handleMovePiece(socket, data) {
    logger.debug(`Updating board: ${data.from} -> ${data.to}`);
    const game = GameManager.getGame(socket.id);
    // Check if game exists
    if (game === undefined) {
        logger.error(`Game not found for socket ${socket.id}`);
        return;
    }

    // Check if game is currently in PLAYING state
    if (game.state !== GameState.PLAYING) {
        logger.debug(`Game ${game.gameId} is not in PLAYING state`);
        delete GameManager.connectionGameMap[socket.id];
        delete ConnectionManager.connections[socket.id];
        socket.close();
        return;
    }

    // Check if it's the player's turn
    if (
        (game.playerWhite == socket &&
            game.board.turn() !== ChessColor.WHITE) ||
        (game.playerBlack == socket && game.board.turn() !== ChessColor.BLACK)
    ) {
        logger.error("Not your turn");
        return;
    }

    // Check if we need to handle a queued event for white
    if (game.playerWhite == socket && game.queuedEvents.white.length > 0) {
        while (game.queuedEvents.white.length > 0) {
            const event = game.queuedEvents.white.pop();
            // If player is drunk, make a random move.
            if (event.type === ItemsEnum.Drunk) {
                const moveToMake = getRandomFromList(game.board.moves());
                const move_info = game.board.move(moveToMake);
                game.playerBlack.sendMessage(Messages.MOVE_PIECE, move_info);
                game.playerWhite.sendMessage(Messages.BOARD_UPDATE, {
                    board: game.board.fen(),
                });
                game.playerWhite.sendMessage(Messages.USE_ITEM, {
                    item: ItemsEnum.Drunk,
                    itemData: {},
                });
                break;
            } else {
                logger.error(`Unknown event type: ${event.type}`);
            }
        }
    } else if (
        game.playerBlack == socket &&
        game.queuedEvents.black.length > 0
    ) {
        // Check if we need to handle a queued event for black
        while (game.queuedEvents.black.length > 0) {
            const event = game.queuedEvents.black.pop();
            // If player is drunk, make a random move.
            if (event.type === ItemsEnum.Drunk) {
                const moveToMake = getRandomFromList(game.board.moves());
                const move_info = game.board.move(moveToMake);
                game.playerWhite.sendMessage(Messages.MOVE_PIECE, move_info);
                game.playerBlack.sendMessage(Messages.BOARD_UPDATE, {
                    board: game.board.fen(),
                });
                game.playerBlack.sendMessage(Messages.USE_ITEM, {
                    item: ItemsEnum.Drunk,
                    itemData: {},
                });
                break;
            }
        }
        // Handle a norml move
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

    // Check if the game is over
    game.checkGameOver();
}

module.exports = handleMovePiece;
