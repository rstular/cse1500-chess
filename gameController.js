var utils = require("./utils");
var protodef = require("./public/stylesheets/protodef");
var chess = require("./chess");

class ChessGame {
    constructor(gameId) {
        this.gameId = gameId;
        this.playerA = null;
        this.playerB = null;
        this.inviteCode = utils.generateRandomString(6); // To be used for implementing invite-only games
        this.state = protodef.GameState.WAITING_FOR_PLAYERS;
        this.board = new chess.ChessBoard();
    }

    joinPlayer(player) {
        if (this.playerA === null) {
            this.playerA = player;
        } else if (this.playerB === null) {
            this.playerB = player;
        } else {
            throw new Error("Game is full");
        }
    }
}

module.exports = ChessGame;