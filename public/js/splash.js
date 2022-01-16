function joinGame() {
    const NICKNAME_INPUT = document.getElementById("nickname-input");
    const NICKNAME = NICKNAME_INPUT.value;

    // Save nickname to local storage
    window.localStorage.setItem("nickname", NICKNAME);
    window.location.href = "/play";
}

function initializePage() {
    const JOIN_GAME_BUTTON = document.getElementById("join-game-button");
    const NICKNAME_INPUT = document.getElementById("nickname-input");

    // Load user nickname from local storage and set the text input accordingly
    NICKNAME_INPUT.value = window.localStorage.getItem("nickname") ?? "";

    JOIN_GAME_BUTTON.addEventListener("click", joinGame);

    sidebarSlide();
}

let sidebarSlide = function () {
    document.querySelector('.sidebar-left').style.width = "150px";
    document.querySelector('.hero-image').style.marginLeft = "150px";
};

window.addEventListener("DOMContentLoaded", initializePage);
