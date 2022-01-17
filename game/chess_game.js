const utils = require("../utils");
const {
    GameState,
    ChessColor,
    Messages,
} = require("../communication/protodef");
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
        this.state = GameState.WAITING_FOR_PLAYERS;
        this.queuedEvents = {
            white: [],
            black: [],
        };
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
            this.state = GameState.PLAYING;
            this.playerWhite.sendMessage(Messages.SET_COLOR, {
                color: ChessColor.WHITE,
            });
            this.playerBlack.sendMessage(Messages.SET_COLOR, {
                color: ChessColor.BLACK,
            });
        }
        return this.state;
    }

    removePlayer(player) {
        if (player === this.playerWhite) {
            this.playerWhite = null;
        } else if (player === this.playerBlack) {
            this.playerBlack = null;
        }
    }

    start() {
        if (this.state !== GameState.PLAYING) {
            throw new Error("Game is not in PLAYING state");
        }
        logger.debug(`Starting game ${this.gameId}`);
        this.playerWhite.sendMessage(Messages.BOARD_UPDATE, {
            board: this.board.fen(),
        });
        this.playerBlack.sendMessage(Messages.BOARD_UPDATE, {
            board: this.board.fen(),
        });
        this.playerWhite.sendMessage(Messages.SET_STATE, {
            state: this.state,
            stateInfo: { opponentNickname: this.playerBlack.nickname },
        });
        this.playerBlack.sendMessage(Messages.SET_STATE, {
            state: this.state,
            stateInfo: { opponentNickname: this.playerWhite.nickname },
        });
    }

    sendBoardUpdate() {
        if (
            this.playerWhite !== null &&
            this.playerWhite.readyState === WebSocket.OPEN
        ) {
            this.playerWhite.sendMessage(Messages.BOARD_UPDATE, {
                board: this.board.fen(),
            });
        }
        if (
            this.playerBlack !== null &&
            this.playerBlack.readyState === WebSocket.OPEN
        ) {
            this.playerBlack.sendMessage(Messages.BOARD_UPDATE, {
                board: this.board.fen(),
            });
        }
    }

    abort(reason, player) {
        logger.debug(`Aborting game ${this.gameId}`);
        this.state = GameState.ABORTED;

        const abortInfo = {
            reason,
            player:
                player === this.playerWhite
                    ? ChessColor.WHITE
                    : ChessColor.BLACK,
        };

        this.setState(GameState.ABORTED, abortInfo);
    }

    setState(state, stateInfo = {}) {
        this.state = state;
        if (
            this.playerWhite !== null &&
            this.playerWhite.readyState === WebSocket.OPEN
        ) {
            this.playerWhite.sendMessage(Messages.SET_STATE, {
                state,
                stateInfo,
            });
        }
        if (
            this.playerBlack !== null &&
            this.playerBlack.readyState === WebSocket.OPEN
        ) {
            this.playerBlack.sendMessage(Messages.SET_STATE, {
                state,
                stateInfo,
            });
        }
    }

    checkGameOver() {
        if (this.board.game_over()) {
            if (
                this.board.in_draw() ||
                this.board.in_stalemate() ||
                this.board.in_threefold_repetition() ||
                this.board.insufficient_material()
            ) {
                this.setState(GameState.DRAW);
            } else if (this.board.in_checkmate()) {
                this.setState(
                    this.board.turn() === ChessColor.WHITE
                        ? GameState.WON_BLACK
                        : GameState.WON_WHITE
                );
            }
            GameManager.nGamesCompleted++;
        }
    }
}

module.exports = ChessGame;
