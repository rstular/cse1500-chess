export const GameState = {
    WAITING_FOR_PLAYERS: 0b00000000,
    PLAYING: 0b00000001,
    WON_PLAYER_1: 0b00000100,
    WON_PLAYER_2: 0b00000101,
    DRAW: 0b00000110,
};

export const Messages = {
    HEALTH_CHECK: 0,
    HANDSHAKE: 1,
    JOIN_GAME: 2,
    BOARD_UPDATE: 3,
    TURN_UPDATE: 4,
    JOIN_GAME: 5,
    MOVE_PIECE: 6,
    SET_COLOR: 7,
};

export const ChessColor = {
    WHITE: 0,
    BLACK: 1,
}

export const ChessPieceType = {
    PAWN: 1,
    ROOK: 2,
    KNIGHT: 3,
    BISHOP: 4,
    QUEEN: 5,
    KING: 6,
};