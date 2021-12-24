class ChessPiece {

    /**
     * Creates a new ChessPiece
     * @param {ChessPieceType} type type of the piece
     * @param {ChessPieceColor} color color of the piece
     */
    constructor(type, color) {
        if (typeof type !== "undefined") {
            this.type = type;
        }
        if (typeof color !== "undefined") {
            this.color = color;
        }
    }

    /**
     * Returns the type of the piece in question
     * @returns {ChessPieceType} type of the piece
     */
    getType() {
        return this.type;
    }

    /**
     * Returns the color of the piece in question
     * @returns {ChessPieceColor} color of the piece
     */
    getColor() {
        return this.color;
    }

    /**
     * Sets the type of the piece in question
     * @param {ChessPieceType} type type of the piece
     */
    setType(type) {
        this.type = type;
    }

    /**
     * Sets the color of the piece in question
     * @param {ChessPieceColor} color color of the piece
     */
    setColor(color) {
        this.color = color;
    }

    /**
     * 
     * @returns {object} JSON-serializable representation of the piece 
     */
    toJSON() {
        return {
            type: this.type ?? null,
            color: this.color ?? null
        };
    }
}

const ChessPieceType = {
    PAWN: 1,
    ROOK: 2,
    KNIGHT: 3,
    BISHOP: 4,
    QUEEN: 5,
    KING: 6,
};

const ChessPieceColor = {
    WHITE: 1,
    BLACK: 2,
};

class ChessBoard {
    constructor(board) {
        if (typeof board_state !== "undefined") {
            this.board = board_state;
        } else {
            this.board = [
                [
                    new ChessPiece(ChessPieceType.ROOK, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.KNIGHT, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.BISHOP, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.QUEEN, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.KING, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.BISHOP, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.KNIGHT, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.ROOK, ChessPieceColor.WHITE)
                ],
                [
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceIColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.WHITE)
                ],
                [
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece()
                ],
                [
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece()
                ],
                [
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece()
                ],
                [
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece(),
                    new ChessPiece()
                ],
                [
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessPieceColor.BLACK)
                ],
                [
                    new ChessPiece(ChessPieceType.ROOK, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.KNIGHT, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.BISHOP, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.QUEEN, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.KING, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.BISHOP, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.KNIGHT, ChessPieceColor.BLACK),
                    new ChessPiece(ChessPieceType.ROOK, ChessPieceColor.BLACK)
                ]
            ];
        }
    }
}


module.exports = {
    ChessPiece,
    ChessPieceType,
    ChessBoard,
}