function joinGame() {
    const NICKNAME_INPUT = document.getElementById("nickname-input");
    const NICKNAME = NICKNAME_INPUT.value;

    // Save nickname to local storage
    window.localStorage.setItem("nickname", NICKNAME);
    window.location.href = "/play";
}

function sidebarSlide() {
    document.querySelector(".sidebar-left").style.width = "200px";
    document.querySelector(".hero-image").style.paddingLeft = "200px";
}

function initializePage() {
    const JOIN_GAME_BUTTON = document.getElementById("join-game-button");
    const NICKNAME_INPUT = document.getElementById("nickname-input");

    // Load user nickname from local storage and set the text input accordingly
    NICKNAME_INPUT.value = window.localStorage.getItem("nickname") ?? "";

    JOIN_GAME_BUTTON.addEventListener("click", joinGame);

    document
        .getElementById("rules-modal-link")
        .addEventListener("click", () => {
            const MODAL = document.getElementById("main-modal");
            MODAL.classList.add("shown");
            MODAL.classList.remove("hiding");
        });

    sidebarSlide();
}

function initializeModal() {
    document.querySelectorAll(".modal").forEach((modal) => {
        modal.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });

    document.querySelectorAll(".modal-container").forEach((container) => {
        container.addEventListener("click", (e) => {
            container.classList.add("hiding");
        });
    });
}

window.addEventListener("DOMContentLoaded", initializePage);
window.addEventListener("DOMContentLoaded", initializeModal);
