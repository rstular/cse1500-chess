const ChessPiece = {
    NONE: 0,
    PAWN: 1,
    ROOK: 2,
    KNIGHT: 3,
    BISHOP: 4,
    QUEEN: 5,
    KING: 6,
};

class ChessBoard {
    constructor() {
        this.board = [];
        this.board[0] = [
            ChessPiece.ROOK,
            ChessPiece.KNIGHT,
            ChessPiece.BISHOP,
            ChessPiece.QUEEN,
            ChessPiece.KING,
            ChessPiece.BISHOP,
            ChessPiece.KNIGHT,
            ChessPiece.ROOK,
        ];
        this.board[1] = [
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
        ];
        this.board[2] = [
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
        ];
        this.board[3] = [
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
        ];
        this.board[4] = [
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
        ];
        this.board[5] = [
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
            ChessPiece.NONE,
        ];
        this.board[6] = [
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
            ChessPiece.PAWN,
        ];
        this.board[7] = [
            ChessPiece.ROOK,
            ChessPiece.KNIGHT,
            ChessPiece.BISHOP,
            ChessPiece.QUEEN,
            ChessPiece.KING,
            ChessPiece.BISHOP,
            ChessPiece.KNIGHT,
            ChessPiece.ROOK,
        ];
        this.turn = 0;
    }
}

module.exports = {
    ChessPiece,
    ChessBoard,
}