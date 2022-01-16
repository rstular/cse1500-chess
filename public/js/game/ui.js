import { ChessColor, ChessPieceType, Messages, GameState } from "/js/game/protodef.js";
import { gameInfo } from "/js/game/chessController.js";
import { sounds } from "/js/game/audio.js";
import { socket } from "/js/game/communication/communication.js";

function getElementLabel(element) {
    if (typeof element.dataset.row === "undefined" || typeof element.dataset.col === "undefined") {
        return null;
    }
    return calculateLabel(element.dataset.row, element.dataset.col);
}

function calculateLabel(row, col) {
    if (gameInfo.playerColor === ChessColor.WHITE) {
        return String.fromCharCode(parseInt(col) + 0x61) + (8 - parseInt(row));
    } else {
        return String.fromCharCode((7 - parseInt(col)) + 0x61) + (1 + parseInt(row));
    }
}

function pieceDragStart(e) {
    console.log("dragstart", e);
    this.style.opacity = "0.4";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("chess/moveinfo", e.target.id);
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

export function playMoveSound(move_flags) {
    if (gameInfo.board.in_checkmate()) {
        sounds.checkmate.play();
    } else if (gameInfo.board.in_stalemate()) {
        sounds.draw.play();
    } else if (gameInfo.board.insufficient_material()) {
        sounds.draw.play();
    } else if (gameInfo.board.in_threefold_repetition()) {
        sounds.draw.play();
    } else if (gameInfo.board.in_draw()) {
        sounds.draw.play();
    } else if (gameInfo.board.in_check()) {
        sounds.check.play();
    } else if (move_flags.includes("c") || move_flags.includes("e")) {
        sounds.capture.play();
    } else {
        sounds.move.play();
    }
}

function squarePieceDrop(e) {
    // Prevent opening a link or image when dragging
    e.preventDefault();
    // Check if the target id DIV (not an IMG, we are bubbling up here)
    if (e.currentTarget.tagName.toLowerCase() === "div" && gameInfo.state !== GameState.PLAYING) {
        // If so, stop propagation of the event
        e.stopPropagation();
        // Get DataTransfer payload
        const move_info = e.dataTransfer.getData("chess/moveinfo");
        // If it's not set, we don't care about the drop
        if (move_info === "") {
            return;
        }
        console.debug("drop", e);

        // Get the element that was dragged
        const SOURCE_ELEMENT = document.getElementById(move_info);

        // Get the source square
        const dragFrom = getElementLabel(SOURCE_ELEMENT.parentElement);
        // Get the target square
        const dragTo = getElementLabel(e.currentTarget);
        if (dragFrom === dragTo) {
            return;
        }

        const moveObject = {
            from: dragFrom,
            to: dragTo,
        };
        const moveWithInfo = gameInfo.board.move(moveObject);
        if (moveWithInfo == null) {
            sounds.invalid.play();
            return;
        }

        console.debug("Sending move", moveWithInfo);
        socket.sendMessage(Messages.MOVE_PIECE, moveObject);

        playMoveSound(moveWithInfo.flags);
        e.currentTarget.replaceChildren(SOURCE_ELEMENT);

        if (gameInfo.board.game_over()) {
            if (gameInfo.board.in_checkmate()) {
                showModalWithContent("Checkmate", "Checkmate!");
            } else if (gameInfo.board.in_stalemate()) {
                showModalWithContent("Stalemate", "Stalemate!");
            } else if (gameInfo.board.insufficient_material()) {
                showModalWithContent("Draw", "Draw!");
            } else if (gameInfo.board.in_threefold_repetition()) {
                showModalWithContent("Draw", "Draw!");
            } else if (gameInfo.board.in_draw()) {
                showModalWithContent("Draw", "Draw!");
            }
        }
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

            let translatedRow = gameInfo.playerColor == ChessColor.WHITE ? i : 7 - i;
            let translatedCol = gameInfo.playerColor == ChessColor.WHITE ? j : 7 - j;

            const square = document.querySelectorAll(`[data-row="${translatedRow}"][data-col="${translatedCol}"]`)[0];
            const squareData = board_state[i][j];
            if (squareData === null) {
                square.innerHTML = "";
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

            if (squareData.color === gameInfo.playerColor) {
                square.querySelector(".piece-img").addEventListener("dragstart", pieceDragStart);
                square.querySelector(".piece-img").addEventListener("dragend", pieceDragEnd);
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

    BOARD_ELEMENT.querySelectorAll(".square").forEach(square => {
        square.addEventListener("drop", squarePieceDrop, true);
        square.addEventListener("dragover", handleDragOver);
    });
}

export const initializeInterface = () => {
    constructHtmlBoard();
}
