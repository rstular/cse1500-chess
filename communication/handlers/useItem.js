const {
    GameState,
    ItemsEnum,
    ChessColor,
    Messages,
} = require("../../communication/protodef");
const { GameManager } = require("../../game/controller");
const logger = require("../../logger");

function useItemHandler(socket, { item, itemData }) {
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
            game.queuedEvents.black.push({ type: ItemsEnum.Drunk });
        } else {
            game.queuedEvents.white.push({ type: ItemsEnum.Drunk });
        }
    } else if (item === ItemsEnum.Donderslag) {
        logger.debug("Donderslag");
        game.playerBlack.sendMessage(Messages.USE_ITEM, {
            item: item,
            itemData: {},
        });
        game.playerWhite.sendMessage(Messages.USE_ITEM, {
            item: item,
            itemData: {},
        });
        if (game.playerWhite === socket) {
            game.setState(GameState.WON_WHITE, {
                messageWhite:
                    "How lucky! A lightning strike blew your oponent's gunpowder up!",
                messageBlack: "Oh no! A lightning strike blew you up!",
            });
        } else {
            game.setState(GameState.WON_BLACK, {
                messageBlack:
                    "How lucky! A lightning strike blew your oponent's gunpowder up!",
                messageWhite: "Oh no! A lightning strike blew you up!",
            });
        }
    }
}

module.exports = useItemHandler;
