import { gameInfo } from "/js/game/chessController.js";
import { updateInventoryCount } from "/js/game/ui/inventory.js";

export function handleSetInventory({ inventory }) {
    console.debug("Updating inventory:", inventory);
    gameInfo.inventory = inventory;
    updateInventoryCount();
}
