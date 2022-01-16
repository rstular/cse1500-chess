const utils = require("../utils");
const protodef = require("../communication/protodef");
const logger = require("../logger");
const { Chess } = require("../lib/chess");
const WebSocket = require("ws");
const { GameManager } = require("../game/controller");

class ChessGame {
    constructor(gameId) {
        this.gameId = gameId;
        this.playerWhite = null;
        this.playerBlack = null;
        this.inviteCode = utils.generateRandomString(6); // To be used for implementing invite-only games
        this.isPrivate = false;
        this.state = protodef.GameState.WAITING_FOR_PLAYERS;
        this.board = new Chess();
    }

    joinPlayer(player) {
        if (this.playerWhite === null) {
            this.playerWhite = player;
            GameManager.setGame(player.id, this);
            logger.debug(
                `Player ${player.nickname} joined game ${this.gameId} as player A`
            );
        } else if (this.playerBlack === null) {
            this.playerBlack = player;
            GameManager.setGame(player.id, this);
            logger.debug(
                `Player ${player.nickname} joined game ${this.gameId} as player B`
            );
        } else {
            logger.debug(
                `Player ${player.nickname} tried to join game ${this.gameId} but it was full`
            );
            throw new Error("Game is full");
        }

        if (this.playerWhite !== null && this.playerBlack !== null) {
            // Both players have joined
            // Randomize who starts
            if (Math.random() < 0.5) {
                [this.playerWhite, this.playerBlack] = [
                    this.playerBlack,
                    this.playerWhite,
                ];
            }
            // Set the game state as "playing"
            this.state = protodef.GameState.PLAYING;
            this.playerWhite.sendMessage(protodef.Messages.SET_COLOR, {
                color: protodef.ChessColor.WHITE,
            });
            this.playerBlack.sendMessage(protodef.Messages.SET_COLOR, {
                color: protodef.ChessColor.BLACK,
            });
        }
        return this.state;
    }

    start() {
        if (this.state !== protodef.GameState.PLAYING) {
            throw new Error("Game is not in PLAYING state");
        }
        logger.debug(`Starting game ${this.gameId}`);
        this.playerWhite.sendMessage(protodef.Messages.BOARD_UPDATE, {
            board: this.board.fen(),
        });
        this.playerBlack.sendMessage(protodef.Messages.BOARD_UPDATE, {
            board: this.board.fen(),
        });
        this.playerWhite.sendMessage(protodef.Messages.SET_STATE, {
            state: this.state,
            stateInfo: { opponentNickname: this.playerBlack.nickname },
        });
        this.playerBlack.sendMessage(protodef.Messages.SET_STATE, {
            state: this.state,
            stateInfo: { opponentNickname: this.playerWhite.nickname },
        });
    }

    abort(reason, player) {
        logger.debug(`Aborting game ${this.gameId}`);
        this.state = protodef.GameState.ABORTED;

        const abortInfo = {
            reason,
            player:
                player === this.playerWhite
                    ? protodef.ChessColor.WHITE
                    : protodef.ChessColor.BLACK,
        };

        this.setState(protodef.GameState.ABORTED, abortInfo);
    }

    setState(state, stateInfo = {}) {
        this.state = state;
        if (
            this.playerWhite !== null &&
            this.playerWhite.readyState === WebSocket.OPEN
        ) {
            this.playerWhite.sendMessage(protodef.Messages.SET_STATE, {
                state,
                stateInfo,
            });
        }
        if (
            this.playerBlack !== null &&
            this.playerBlack.readyState === WebSocket.OPEN
        ) {
            this.playerBlack.sendMessage(protodef.Messages.SET_STATE, {
                state,
                stateInfo,
            });
        }
    }
}

module.exports = ChessGame;
