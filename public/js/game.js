const constructHtmlBoard = () => {
    const BOARD_ELEMENT = document.getElementById("board");

    const template_even = document.getElementById("template-even-row");
    const template_odd = document.getElementById("template-odd-row");

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            if (i % 2) {
                BOARD_ELEMENT.appendChild(template_odd.content.cloneNode(true));
            } else {
                BOARD_ELEMENT.appendChild(template_even.content.cloneNode(true));
            }
        }
    }
}

window.addEventListener("DOMContentLoaded", constructHtmlBoard);