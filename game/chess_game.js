const utils = require("../utils");
const protodef = require("../communication/protodef");
const ChessBoard = require("../chess/board");
const logger = require("../logger");

class ChessGame {
    constructor(gameId) {
        this.gameId = gameId;
        this.playerA = null;
        this.playerB = null;
        this.inviteCode = utils.generateRandomString(6); // To be used for implementing invite-only games
        this.isPrivate = false;
        this.state = protodef.GameState.WAITING_FOR_PLAYERS;
        this.board = new ChessBoard();
    }

    joinPlayer(player) {
        if (this.playerA === null) {
            this.playerA = player;
            logger.debug(`Player ${player.nickname} joined game ${this.gameId} as player A`);
        } else if (this.playerB === null) {
            this.playerB = player;
            logger.debug(`Player ${player.nickname} joined game ${this.gameId} as player B`);
        } else {
            logger.debug(`Player ${player.nickname} tried to join game ${this.gameId} but it was full`);
            throw new Error("Game is full");
        }

        if (this.playerA !== null && this.playerB !== null) {
            // Both players have joined
            // Randomize who starts
            if (Math.random() < 0.5) {
                [this.playerA, this.playerB] = [this.playerB, this.playerA];
            }
            // Set the game state as "playing"
            this.state = protodef.GameState.PLAYING;
            this.playerA.sendMessage(protodef.Messages.SET_COLOR, { color: protodef.ChessColor.WHITE });
            this.playerB.sendMessage(protodef.Messages.SET_COLOR, { color: protodef.ChessColor.BLACK });
        }
        return this.state;
    }

    start() {
        if (this.state !== protodef.GameState.PLAYING) {
            throw new Error("Game is not in PLAYING state");
        }
        logger.debug(`Starting game ${this.gameId}`);
        this.playerA.sendMessage(protodef.Messages.BOARD_UPDATE, this.board);
        this.playerB.sendMessage(protodef.Messages.BOARD_UPDATE, this.board);
    }
}

module.exports = ChessGame;