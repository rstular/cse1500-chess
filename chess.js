class ChessPiece {
    constructor(type, color) {
        if (typeof type !== "undefined") {
            this.type = type;
        }
        if (typeof color !== "undefined") {
            this.color = color;
        }
    }
    getType() {
        return this.type;
    }
    getColor() {
        return this.color;
    }
    setType(type) {
        this.type = type;
    }
    setColor(color) {
        this.color = color;
    }

    /**
     * 
     * @returns {object} JSON-serializable representation of the piece 
     */
    toJSON() {
        return {
            type: this.type || null,
            color: this.color || null
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

class ChessBoard {
    constructor(board_state) {
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