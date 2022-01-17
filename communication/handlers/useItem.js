const {
    GameState,
    ItemsEnum,
    ChessColor,
} = require("../../communication/protodef");
const { GameManager } = require("../../game/controller");
const logger = require("../../logger");

function useItemHandler(socket, { item, itemData }) {
    const game = GameManager.getGame(socket.id);
    if (game === undefined) {
        logger.error(`Game not found for socket ${socket.id}`);
        return;
    }

    if (game.state !== protodef.GameState.PLAYING) {
        logger.debug(`Game ${game.gameId} is not in PLAYING state`);
        delete GameManager.connectionGameMap[socket.id];
        delete ConnectionManager.connections[socket.id];
        socket.close();
        return;
    }

    if (game.playerWhite == socket && game.board.turn() !== ChessColor.WHITE) {
        logger.error("Not your turn");
        return;
    } else if (
        game.playerBlack == socket &&
        game.board.turn() !== ChessColor.BLACK
    ) {
        logger.error("Not your turn");
        return;
    }

    if (item === ItemsEnum.Drunk) {
        if (socket.inventory[ItemsEnum.Drunk] === 0) {
            logger.error("You don't have any drunk");
            return;
        }

        logger.debug("Enqueuing " + item);
        socket.inventory[ItemsEnum.Drunk]--;
        if (game.playerWhite === socket) {
            game.queuedEvents.black.push(ItemsEnum.Drunk);
        } else {
            game.queuedEvents.white.push(ItemsEnum.Drunk);
        }
    }
}

module.exports = useItemHandler;
