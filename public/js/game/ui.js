import { ChessColor, ChessPieceType } from "/js/game/protodef.js";

function pieceDragStart(e) {
    this.style.opacity = '0.4';
}

function pieceDragEnd(e) {
    this.style.opacity = '1';
}

export function updateBoard(board_state) {
    if (board_state.length !== 8 || board_state[0].length !== 8) {
        throw new Error("Invalid board state");
    }

    const PIECE_TEMPLATE = document.getElementById("template-piece");

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            addPiece: {

                const new_piece = PIECE_TEMPLATE.content.cloneNode(true);

                const square = document.querySelectorAll(`[data-row='${i}'][data-col='${j}']`)[0];
                const squareData = board_state[i][j];
                switch (squareData.type) {
                    case ChessPieceType.PAWN:
                        new_piece.querySelector(".piece-img").src = "/images/pieces/pawn_" + (squareData.color === ChessColor.WHITE ? "white" : "black") + ".png";
                        break;
                    case ChessPieceType.ROOK:
                        new_piece.querySelector(".piece-img").src = "/images/pieces/rook_" + (squareData.color === ChessColor.WHITE ? "white" : "black") + ".png";
                        break;
                    case ChessPieceType.KNIGHT:
                        new_piece.querySelector(".piece-img").src = "/images/pieces/knight_" + (squareData.color === ChessColor.WHITE ? "white" : "black") + ".png";
                        break;
                    case ChessPieceType.BISHOP:
                        new_piece.querySelector(".piece-img").src = "/images/pieces/bishop_" + (squareData.color === ChessColor.WHITE ? "white" : "black") + ".png";
                        break;
                    case ChessPieceType.QUEEN:
                        new_piece.querySelector(".piece-img").src = "/images/pieces/queen_" + (squareData.color === ChessColor.WHITE ? "white" : "black") + ".png";
                        break;
                    case ChessPieceType.KING:
                        new_piece.querySelector(".piece-img").src = "/images/pieces/king_" + (squareData.color === ChessColor.WHITE ? "white" : "black") + ".png";
                        break;
                    default:
                        break addPiece;
                }
            }
        }
    }
}

const constructHtmlBoard = () => {
    const BOARD_ELEMENT = document.getElementById("board");

    const template_even = document.getElementById("template-even-row");
    const template_odd = document.getElementById("template-odd-row");

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const generatedSquare = i % 2 ? template_odd.content.cloneNode(true) : template_even.content.cloneNode(true);
            generatedSquare.firstElementChild.dataset.row = i;
            generatedSquare.firstElementChild.dataset.col = j;
            BOARD_ELEMENT.appendChild(generatedSquare);
        }
    }

    // const draggableElements = document.getElementsByClassName("piece draggable");
    // for (const element of draggableElements) {
    //     element.draggable = true;
    //     element.addEventListener("dragstart", pieceDragStart);
    //     element.addEventListener("dragend", pieceDragEnd);
    // }
}

export const initializeInterface = () => {
    constructHtmlBoard();
}
