import { ChessColor, ChessPieceType } from "/js/game/protodef.js";
import { gameInfo } from "/js/game/chessController.js";

function pieceDragStart(e) {
    console.log("dragstart", e);
    this.style.opacity = "0.4";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text", e.target.id);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

function pieceDragEnd(e) {
    console.log("dragend", e);
    this.style.opacity = "1";
}

function squarePieceDrop(e) {
    e.preventDefault();
    if (e.currentTarget.tagName.toLowerCase() === "div") {
        e.stopPropagation();
        console.debug("drop", e);
        e.currentTarget.replaceChildren(document.getElementById(e.dataTransfer.getData("text")));
    }
}

export function updateBoard(board_state) {
    if (board_state.length !== 8 || board_state[0].length !== 8) {
        throw new Error("Invalid board state");
    }

    const PIECE_TEMPLATE = document.getElementById("template-piece");

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            const new_piece = PIECE_TEMPLATE.content.cloneNode(true);
            new_piece.firstElementChild.id = `piece-${i}-${j}`;

            let translatedRow = gameInfo.playerColor == ChessColor.WHITE ? i : 7 - i;
            let translatedCol = gameInfo.playerColor == ChessColor.WHITE ? j : 7 - j;

            const square = document.querySelectorAll(`[data-row="${translatedRow}"][data-col="${translatedCol}"]`)[0];
            const squareData = board_state[i][j];
            if (squareData === null) {
                continue;
            }
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
                    console.error("Invalid piece type");
            }
            square.replaceChildren(new_piece);
            square.querySelector(".piece-img").addEventListener("dragstart", pieceDragStart);
            square.querySelector(".piece-img").addEventListener("dragend", pieceDragEnd);

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

    BOARD_ELEMENT.querySelectorAll(".square").forEach(square => {
        square.addEventListener("drop", squarePieceDrop, true);
        square.addEventListener("dragover", handleDragOver);
    });
}

export const initializeInterface = () => {
    constructHtmlBoard();
}
