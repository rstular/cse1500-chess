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

    if (socket.inventory[item] === 0) {
        logger.error("You don't have any of this item");
        return;
    }
    socket.inventory[item]--;

    if (item === ItemsEnum.Drunk) {
        logger.debug("Enqueuing " + item);
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
    } else if (item === ItemsEnum.Assassination) {
        if (game.board.get(itemData.field) === null) {
            logger.error("You can't assassinate a piece that doesn't exist");
            return;
        } else if (game.board.get(itemData.field).type === "k") {
            logger.error("You can't assassinate a king");
            return;
        }
        game.board.remove(itemData.field);

        if (game.playerWhite === socket) {
            game.playerBlack.sendMessage(Messages.USE_ITEM, {
                item: item,
                itemData: { field: itemData.field },
            });
        } else {
            game.playerWhite.sendMessage(Messages.USE_ITEM, {
                item: item,
                itemData: { field: itemData.field },
            });
        }

        game.sendBoardUpdate();
        game.checkGameOver();
    } else {
        logger.error("Unknown item: " + item);
    }
}

module.exports = useItemHandler;
