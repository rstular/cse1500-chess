const ChessGame = require("../../game/chess_game");
const protodef = require("../../communication/protodef");
const { GameManager } = require("../../game/controller");

function joinGameHandler(socket, data) {
    let gameToJoin = GameManager.games.find(game => game.state === protodef.GameState.WAITING_FOR_PLAYERS);
    if (gameToJoin === undefined) {
        gameToJoin = new ChessGame(GameManager.id++);
        GameManager.games.push(gameToJoin);
    }
    if (gameToJoin.joinPlayer(socket) === protodef.GameState.PLAYING) {
        gameToJoin.start();
    }
}

module.exports = joinGameHandler;