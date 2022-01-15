const ChessPiece = require("./piece");
const { ChessPieceType, ChessColor } = require("../communication/protodef");

class ChessBoard {
    constructor(board_state) {
        if (typeof board_state !== "undefined") {
            this.board = board_state;
        } else {
            this.board = [
                [
                    new ChessPiece(ChessPieceType.ROOK, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.KNIGHT, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.BISHOP, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.QUEEN, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.KING, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.BISHOP, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.KNIGHT, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.ROOK, ChessColor.WHITE)
                ],
                [
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.WHITE),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.WHITE)
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
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.PAWN, ChessColor.BLACK)
                ],
                [
                    new ChessPiece(ChessPieceType.ROOK, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.KNIGHT, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.BISHOP, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.QUEEN, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.KING, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.BISHOP, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.KNIGHT, ChessColor.BLACK),
                    new ChessPiece(ChessPieceType.ROOK, ChessColor.BLACK)
                ]
            ];
        }
    }
}

module.exports = ChessBoard;