const handshakeHandler = require("./handshake");
const joinGameHandler = require("./joinGame");
const movePieceHandler = require("./movePiece");
const resignHandler = require("./resign");
const redeemPurchaseHandler = require("./redeemPurchase");

module.exports = {
    handshakeHandler,
    joinGameHandler,
    movePieceHandler,
    resignHandler,
    redeemPurchaseHandler,
};
