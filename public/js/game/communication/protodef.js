export const GameState = {
    WAITING_FOR_PLAYERS: 0,
    PLAYING: 1,
    WON_WHITE: 2,
    WON_BLACK: 3,
    DRAW: 4,
    ABORTED: 5,
};

export const GameAbortedReason = {
    PLAYER_DISCONNECTED: 0,
    PLAYER_CHEATING: 1,
};

export const Messages = {
    HANDSHAKE: 1,
    JOIN_GAME: 2,
    BOARD_UPDATE: 3,
    MOVE_PIECE: 4,
    SET_COLOR: 5,
    SET_STATE: 6,
    RESIGN: 7,
    REDEEM_PURCHASE: 8,
    SET_INVENTORY: 9,
    USE_ITEM: 10,
};

export const ChessMoveType = {
    REGULAR: 0,
    MONEY_REMOVE: 1,
};

export const ChessColor = {
    WHITE: "w",
    BLACK: "b",
    NONE: "n",
};

export const ChessPieceType = {
    PAWN: "p",
    ROOK: "r",
    KNIGHT: "n",
    BISHOP: "b",
    QUEEN: "q",
    KING: "k",
};

export const ItemsEnum = {
    Assassination: "assassination",
    Drunk: "drunk",
};

export const Items = {
    [ItemsEnum.Assassination]: {
        id: ItemsEnum.Assassination,
        name: "Assassination",
        description: "Remove a piece from the board",
        price: 4.99,
    },
    [ItemsEnum.Drunk]: {
        id: ItemsEnum.Drunk,
        name: "Drunk",
        description: "The opponent will play a random move",
        price: 2.99,
    },
};
