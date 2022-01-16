export function setContent(title, text) {
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-text").innerText = text;
}

export function showModal() {
    document.getElementById("main-modal").style.display = "block";
}

export function showModalWithContent(title, text) {
    setContent(title, text);
    showModal();
}

export function initializeModal() {
    window.onclick = (evt) => {
        if (evt.target.classList.contains("modal")) {
            evt.target.style.display = "none";
        }
    }

    const closeButtonList = document.getElementsByClassName("modal-close");
    for (const closeButton of closeButtonList) {
        closeButton.onclick = (evt) => {
            evt.target.parentElement.parentElement.style.display = "none";
        }
    }
}