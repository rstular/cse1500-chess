function setContent(title, text) {
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-text").innerText = text;
}

export function showModal() {
    const MODAL = document.getElementById("main-modal");
    MODAL.classList.add("shown");
    MODAL.classList.remove("hiding");
}

export function showModalWithContent(title, text) {
    setContent(title, text);
    showModal();
}

export function initializeModal() {
    document.getElementById("main-modal").addEventListener("click", () => {
        document.getElementById("main-modal").classList.add("hiding");
    });
}
