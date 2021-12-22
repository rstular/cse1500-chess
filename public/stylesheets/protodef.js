const GameState = {
    WAITING_FOR_PLAYERS: 0b00000000,
    PLAYING: 0b00000001,
    WON_PLAYER_1: 0b00000100,
    WON_PLAYER_2: 0b00000101,
    DRAW: 0b00000110,
};

const Messages = {
    HEALTH_CHECK: 0,
    HANDSHAKE: 1,
    BOARD_UPDATE = 2,
    TURN_UPDATE = 3,
}

(function(exports) {
    exports.GameState
})

module.exports = { GameState, Messages };