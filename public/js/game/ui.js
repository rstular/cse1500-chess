function pieceDragStart(e) {
    this.style.opacity = '0.4';
}

function pieceDragEnd(e) {
    this.style.opacity = '1';
}

const constructHtmlBoard = () => {
    const BOARD_ELEMENT = document.getElementById("board");

    const template_even = document.getElementById("template-even-row");
    const template_odd = document.getElementById("template-odd-row");

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            BOARD_ELEMENT.appendChild(i % 2 ? template_odd.content.cloneNode(true) : template_even.content.cloneNode(true));
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
