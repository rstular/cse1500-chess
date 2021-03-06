import { sounds } from "/js/game/audio.js";
import { gameInfo } from "/js/game/chessController.js";
import { socket } from "/js/game/communication/communication.js";
import {
    GameState,
    Messages,
    ChessPieceType,
} from "/js/game/communication/protodef.js";
import { getElementLabel, playMoveSound, updateBoard } from "/js/game/ui/board.js";
import { addMove } from "/js/game/ui/gameStatus.js";
import { showModalWithContent } from "/js/game/ui/modal.js";
import { updateTurnText } from "/js/game/ui/gameStatus.js";
import { disableInventoryUse } from "/js/game/ui/inventory.js";

export function pieceDragStart(e) {
    console.log("dragstart", e);
    this.style.opacity = "0.4";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("chess/moveinfo", e.target.id);
}

export function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

export function pieceDragEnd(e) {
    console.log("dragend", e);
    this.style.opacity = "1";
}

export function squarePieceDrop(e) {
    // Prevent opening a link or image when dragging
    e.preventDefault();
    // Check if the target id DIV (not an IMG, we are bubbling up here)
    if (
        e.currentTarget.tagName.toLowerCase() === "div" &&
        gameInfo.state === GameState.PLAYING
    ) {
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
            promotion: ChessPieceType.QUEEN, // Promote to queen by default
        };
        const moveWithInfo = gameInfo.board.move(moveObject);
        // Check if move is valid
        if (moveWithInfo == null) {
            sounds.invalid.play();
            return;
        }
        // Perform the DnD
        e.currentTarget.replaceChildren(SOURCE_ELEMENT);
        // If we promoted, re-render the board
        if (moveWithInfo.flags.includes("p")) {
            updateBoard(gameInfo.board.board());
        }

        // Update the interface
        disableInventoryUse();
        updateTurnText();
        
        // Send the move to the server
        console.debug("Sending move", moveWithInfo);
        socket.sendMessage(Messages.MOVE_PIECE, moveObject);

        // Play the move sound
        playMoveSound(moveWithInfo.flags);

        addMove(moveWithInfo.san);
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
