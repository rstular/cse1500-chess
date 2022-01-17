import { ItemsEnum, Messages } from "/js/game/communication/protodef.js";
import { socket } from "/js/game/communication/communication.js";
import { gameInfo } from "/js/game/chessController.js";
import { sounds } from "/js/game/audio.js";

export const inventoryInfo = {
    buttonsDisabled: true,
};

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

export function recomputeButtons() {
    const inventory = document.getElementById("inventory");
    const inventoryItems = inventory.querySelectorAll(".inventory-item");
    for (const item of inventoryItems) {
        const itemId = item.getAttribute("data-item-id");
        const itemCount = gameInfo.inventory[itemId];
        if (itemCount > 0 && !inventoryInfo.buttonsDisabled) {
            item.querySelector(".inventory-button").disabled = false;
        } else {
            item.querySelector(".inventory-button").disabled = true;
        }
    }
}

export function enableInventoryUse() {
    inventoryInfo.buttonsDisabled = false;
    recomputeButtons();
}

export function disableInventoryUse() {
    inventoryInfo.buttonsDisabled = true;
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
    if (gameInfo.inventory[itemId] <= 0) {
        console.error(
            "Tried to use item that doesn't exist or is out of stock"
        );
        return;
    }

    switch (itemId) {
        case ItemsEnum.Drunk:
            gameInfo.inventory[itemId]--;
            socket.sendMessage(Messages.USE_ITEM, {
                item: itemId,
                itemData: {},
            });
            sounds.drunk.play();
            updateInventoryCount();
            recomputeButtons();
            break;
        case ItemsEnum.Donderslag:
            gameInfo.inventory[itemId]--;
            socket.sendMessage(Messages.USE_ITEM, {
                item: itemId,
                itemData: {},
            });
            sounds.explosion.play();
            updateInventoryCount();
            recomputeButtons();
            break;
        default:
            sounds.invalid.play();
            console.error("Unhandled item ID:", itemId);
    }
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
    document.getElementById("btn-donderslag").addEventListener("click", () => {
        handleButtonClick(ItemsEnum.Donderslag);
    });
}
