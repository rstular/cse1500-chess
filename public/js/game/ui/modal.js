function setContent(title, text) {
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-text").innerText = text;
}

export function showPaymentsModal() {
    const MODAL = document.getElementById("payments-modal");
    MODAL.classList.remove("hiding");
    MODAL.classList.add("shown");
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

export function hideAllModals() {
    document.querySelectorAll(".modal-container").forEach((modal) => {
        modal.classList.add("hiding");
    });
}

export function initializeModal() {
    document.querySelectorAll(".modal").forEach((modal) => {
        modal.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
        });
    });

    document.querySelectorAll(".modal-container").forEach((container) => {
        container.addEventListener("click", (e) => {
            container.classList.add("hiding");
        });
    });
}
