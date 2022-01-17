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

const ItemsEnum = {
    Assassination: "assassination",
    Drunk: "drunk",
    Donderslag: "donderslag",
};

const Items = {
    [ItemsEnum.Assassination]: {
        id: ItemsEnum.Assassination,
        name: "Balthazar's Assassination",
        description: "Remove a piece from the board. Especially effective when it comes to outlaws.",
        price: 4.99,
    },
    [ItemsEnum.Drunk]: {
        id: ItemsEnum.Drunk,
        name: "Willem's Bottle",
        description: "The opponent will play a random move after consuming vast amounts of 100-proof gin, straight from the Royal cellar!",
        price: 2.99,
    },
    [ItemsEnum.Donderslag]: {
        id: ItemsEnum.Donderslag,
        name: "Delftse Donderslag",
        description: "Those who know, know.",
        price: 1654.0,
    },
};

module.exports = {
    GameState,
    Messages,
    ChessColor,
    ChessPieceType,
    GameAbortedReason,
    ChessMoveType,
    ItemsEnum,
    Items,
};
