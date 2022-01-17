function generateRandomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

function getRandomFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}

module.exports = { generateRandomString, getRandomFromList };
