import { ItemsEnum } from "/js/game/communication/protodef.js";
import { sounds } from "/js/game/audio.js";
import { showModalWithContent } from "/js/game/ui/modal.js";

export function handleUseItem({ item, itemData }) {
    console.debug("useItemHandler", item, itemData);
    if (item === ItemsEnum.Drunk) {
        showModalWithContent("Oh no!", "You're drunk!");
        sounds.drunk.play();
    } else if (item === ItemsEnum.Donderslag) {
        sounds.explosion.play();
    } else {
        console.error("Unknown item", item);
    }
}
