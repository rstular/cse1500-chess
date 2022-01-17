import { ItemsEnum } from "/js/game/communication/protodef.js";
import { sounds } from "/js/game/audio.js";
import { showModalWithContent } from "/js/game/ui/modal.js";

export function handleUseItem({ item, itemData }) {
    console.debug("useItemHandler", item, itemData);
    if (item === ItemsEnum.Drunk) {
        showModalWithContent(
            "Oh no!",
            "You were drunk, and you accidentally made a mistake."
        );
        sounds.drunk.play();
    } else if (item === ItemsEnum.Donderslag) {
        sounds.explosion.play();
    } else if (item === ItemsEnum.Assassination) {
        showModalWithContent(
            "Oh no!",
            `There's an assassin on the loose!\nPiece on field "${itemData.field.toUpperCase()}" just got brutally murdered.`
        );
        sounds.assassination.play();
    } else {
        console.error("Unknown item", item);
    }
}
