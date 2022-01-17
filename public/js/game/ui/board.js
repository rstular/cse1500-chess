import { gameInfo } from "/js/game/chessController.js";
import { sounds } from "/js/game/audio.js";
import { ChessColor, ChessPieceType } from "/js/game/communication/protodef.js";
import {
    squarePieceDrop,
    handleDragOver,
    pieceDragStart,
    pieceDragEnd,
} from "/js/game/ui/dnd.js";
import { doAssassination } from "/js/game/ui/inventory.js";

export function playMoveSound(move_flags) {
    if (gameInfo.board.in_checkmate()) {
        sounds.checkmate.play();
    } else if (
        gameInfo.board.in_stalemate() ||
        gameInfo.board.insufficient_material() ||
        gameInfo.board.in_threefold_repetition() ||
        gameInfo.board.in_draw()
    ) {
        sounds.draw.play();
    } else if (gameInfo.board.in_check()) {
        sounds.check.play();
    } else if (move_flags.includes("p")) {
        sounds.promotion.play();
    } else if (move_flags.includes("c") || move_flags.includes("e")) {
        sounds.capture.play();
    } else {
        sounds.move.play();
    }
}

export function getElementLabel(element) {
    if (
        typeof element.dataset.row === "undefined" ||
        typeof element.dataset.col === "undefined"
    ) {
        return null;
    }
    return calculateLabel(element.dataset.row, element.dataset.col);
}

export function calculateLabel(row, col) {
    if (gameInfo.playerColor === ChessColor.WHITE) {
        return String.fromCharCode(parseInt(col) + 0x61) + (8 - parseInt(row));
    } else {
        return (
            String.fromCharCode(7 - parseInt(col) + 0x61) + (1 + parseInt(row))
        );
    }
}

// When calling this function, player color is already set (must be!)
export function updateBoard(board_state) {
    if (board_state.length !== 8 || board_state[0].length !== 8) {
        throw new Error("Invalid board state");
    }

    const PIECE_TEMPLATE = document.getElementById("template-piece");

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const new_piece = PIECE_TEMPLATE.content.cloneNode(true);
            new_piece.firstElementChild.id = `piece-${i}-${j}`;

            let translatedRow =
                gameInfo.playerColor == ChessColor.WHITE ? i : 7 - i;
            let translatedCol =
                gameInfo.playerColor == ChessColor.WHITE ? j : 7 - j;

            const square = document.querySelectorAll(
                `[data-row="${translatedRow}"][data-col="${translatedCol}"]`
            )[0];
            const squareData = board_state[i][j];
            if (squareData === null) {
                square.innerHTML = "";
                continue;
            }
            switch (squareData.type) {
                case ChessPieceType.PAWN:
                    new_piece.querySelector(".piece-img").src =
                        "/images/pieces/pawn_" +
                        (squareData.color === ChessColor.WHITE
                            ? "white"
                            : "black") +
                        ".png";
                    break;
                case ChessPieceType.ROOK:
                    new_piece.querySelector(".piece-img").src =
                        "/images/pieces/rook_" +
                        (squareData.color === ChessColor.WHITE
                            ? "white"
                            : "black") +
                        ".png";
                    break;
                case ChessPieceType.KNIGHT:
                    new_piece.querySelector(".piece-img").src =
                        "/images/pieces/knight_" +
                        (squareData.color === ChessColor.WHITE
                            ? "white"
                            : "black") +
                        ".png";
                    break;
                case ChessPieceType.BISHOP:
                    new_piece.querySelector(".piece-img").src =
                        "/images/pieces/bishop_" +
                        (squareData.color === ChessColor.WHITE
                            ? "white"
                            : "black") +
                        ".png";
                    break;
                case ChessPieceType.QUEEN:
                    new_piece.querySelector(".piece-img").src =
                        "/images/pieces/queen_" +
                        (squareData.color === ChessColor.WHITE
                            ? "white"
                            : "black") +
                        ".png";
                    break;
                case ChessPieceType.KING:
                    new_piece.querySelector(".piece-img").src =
                        "/images/pieces/king_" +
                        (squareData.color === ChessColor.WHITE
                            ? "white"
                            : "black") +
                        ".png";
                    break;
                default:
                    console.error("Invalid piece type");
            }
            square.replaceChildren(new_piece);

            if (squareData.color === gameInfo.playerColor) {
                square
                    .querySelector(".piece-img")
                    .addEventListener("dragstart", pieceDragStart);
                square
                    .querySelector(".piece-img")
                    .addEventListener("dragend", pieceDragEnd);
            }
        }
    }
}

function squareClickHandler(event) {
    if (gameInfo.assassinMode) {
        const label = getElementLabel(event.currentTarget);
        doAssassination(label);
    }
}

export const constructHtmlBoard = () => {
    const BOARD_ELEMENT = document.getElementById("board");

    const template_even = document.getElementById("template-even-row");
    const template_odd = document.getElementById("template-odd-row");

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const generatedSquare =
                i % 2
                    ? template_odd.content.cloneNode(true)
                    : template_even.content.cloneNode(true);
            generatedSquare.firstElementChild.dataset.row = i;
            generatedSquare.firstElementChild.dataset.col = j;
            // Listen for clicks (used for assassinations)
            generatedSquare.firstElementChild.addEventListener(
                "click",
                squareClickHandler,
                true
            );
            BOARD_ELEMENT.appendChild(generatedSquare);
        }
    }

    BOARD_ELEMENT.querySelectorAll(".square").forEach((square) => {
        square.addEventListener("drop", squarePieceDrop, true);
        square.addEventListener("dragover", handleDragOver);
    });
};
