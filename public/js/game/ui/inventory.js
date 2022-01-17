import { ItemsEnum } from "/js/game/communication/protodef.js";
import { socket } from "/js/game/communication/communication.js";
import { gameInfo } from "/js/game/chessController.js";
import { Messages } from "/js/game/communication/protodef.js";

export function updateInventoryCount() {
    const inventory = document.getElementById("inventory");
    const inventoryItems = inventory.querySelectorAll(".inventory-item");
    for (const item of inventoryItems) {
        const itemId = item.getAttribute("data-item-id");
        const itemCount = gameInfo.inventory[itemId];
        item.querySelector(".item-count").innerText = itemCount;
    }
}

export function redeemItems(orderId) {
    console.debug(`Redeeming items from order ID: ${orderId}`);
    socket.sendMessage(Messages.REDEEM_PURCHASE, { orderId });
}

export function enableInventoryUse() {
    const buttons = document.querySelectorAll(".inventory-button");
    for (const button of buttons) {
        button.disabled = false;
    }
}

export function disableInventoryUse() {
    const buttons = document.querySelectorAll(".inventory-button");
    for (const button of buttons) {
        button.disabled = true;
    }
}

export function showInventory() {
    const MODAL = document.getElementById("inventory-modal");
    MODAL.classList.remove("hiding");
    MODAL.classList.add("shown");
}

function handleButtonClick(itemId) {
    console.log("Handling button click for item:", itemId);
}

export function registerButtonHandlers() {
    document.getElementById("btn-drunk").addEventListener("click", () => {
        handleButtonClick(ItemsEnum.Drunk);
    });
    document
        .getElementById("btn-assassination")
        .addEventListener("click", () => {
            handleButtonClick(ItemsEnum.Assassination);
        });
}
