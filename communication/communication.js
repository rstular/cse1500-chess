const { ConnectionManager, GameManager } = require("../game/controller");
const {
    Messages,
    GameAbortedReason,
    ChessColor,
    ItemsEnum,
    GameState,
} = require("./protodef");
const logger = require("../logger");
const handlers = require("./handlers/handlers");

function sendMessage(messageType, payload) {
    logger.debug(`Sending message ${messageType}`);
    console.log(payload);
    this.send(
        JSON.stringify({
            message: messageType,
            data: payload,
        })
    );
}

function handleConnection(ws) {
    const conn = ws;
    conn.id = ConnectionManager.id++;
    conn.inventory = Object.values(ItemsEnum).reduce((acc, item) => {
        acc[item] = 0;
        return acc;
    }, {});
    conn.sendMessage = sendMessage;

    logger.verbose(`New connection: ${conn.id}`);
    conn.on("message", (message) => {
        logger.debug(`Message received: ${message}`);
        handleMessage(conn, message);
    });
    conn.on("close", () => {
        let game = GameManager.getGame(conn.id);
        if (game && game.state === GameState.PLAYING) {
            game.abort(GameAbortedReason.PLAYER_DISCONNECTED, ChessColor.NONE);
        }
        game.removePlayer(conn);
        delete ConnectionManager.connections[conn.id];
        delete GameManager.connectionGameMap[conn.id];
        logger.verbose(`Connection closed: ${conn.id}`);
    });

    ConnectionManager.addConnection(conn);
}

function handleMessage(socket, message) {
    let parsedData;
    try {
        parsedData = JSON.parse(message);
    } catch {
        logger.error("Invalid JSON");
        return;
    }

    switch (parsedData.message) {
        case Messages.HANDSHAKE:
            handlers.handshakeHandler(socket, parsedData.data);
            break;
        case Messages.JOIN_GAME:
            handlers.joinGameHandler(socket, parsedData.data);
            break;
        case Messages.MOVE_PIECE:
            handlers.movePieceHandler(socket, parsedData.data);
            break;
        case Messages.RESIGN:
            handlers.resignHandler(socket, parsedData.data);
            break;
        case Messages.REDEEM_PURCHASE:
            handlers.redeemPurchaseHandler(socket, parsedData.data);
            break;
        case Messages.USE_ITEM:
            handlers.useItemHandler(socket, parsedData.data);
            break;
        default:
            logger.error("Unknown message");
    }
}

module.exports = { handleMessage, handleConnection };
