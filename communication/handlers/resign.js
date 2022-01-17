const { GameState } = require("../../communication/protodef");
const { GameManager } = require("../../game/controller");

function resignHandler(socket, _data) {
    const game = GameManager.getGame(socket.id);
    if (game === undefined) {
        console.error(`Game not found for socket ${socket.id}`);
        return;
    }

    if (game.state !== GameState.PLAYING) {
        console.error(`Game ${game.gameId} is not in PLAYING state`);
        return;
    }

    if (game.playerWhite == socket) {
        game.setState(GameState.WON_BLACK);
    } else if (game.playerBlack == socket) {
        game.setState(GameState.WON_WHITE);
    } else {
        console.error(`Player not found for socket ${socket.id}`);
    }
}

module.exports = resignHandler;
