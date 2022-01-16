const GameState = {
    WAITING_FOR_PLAYERS: 0,
    PLAYING: 1,
    WON_WHITE: 2,
    WON_BLACK: 3,
    DRAW: 4,
    ABORTED: 5,
};

const GameAbortedReason = {
    PLAYER_DISCONNECTED: 0,
    PLAYER_CHEATING: 1,
};

const Messages = {
    HEALTH_CHECK: 0,
    HANDSHAKE: 1,
    JOIN_GAME: 2,
    BOARD_UPDATE: 3,
    TURN_UPDATE: 4,
    JOIN_GAME: 5,
    MOVE_PIECE: 6,
    SET_COLOR: 7,
    SET_STATE: 8,
    RESIGN: 9,
};

const ChessMoveType = {
    REGULAR: 0,
    MONEY_REMOVE: 1,
};

const ChessColor = {
    WHITE: "w",
    BLACK: "b",
    NONE: "n",
};

const ChessPieceType = {
    PAWN: "p",
    ROOK: "r",
    KNIGHT: "n",
    BISHOP: "b",
    QUEEN: "q",
    KING: "k",
};

module.exports = {
    GameState,
    Messages,
    ChessColor,
    ChessPieceType,
    GameAbortedReason,
    ChessMoveType,
};
