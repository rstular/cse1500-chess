const handshakeHandler = require("./handshake");
const joinGameHandler = require("./joinGame");
const movePieceHandler = require("./movePiece");
const resignHandler = require("./resign");
const redeemPurchaseHandler = require("./redeemPurchase");
const useItemHandler = require("./useItem");
const keepaliveHandler = require("./keepalive");

module.exports = {
    handshakeHandler,
    joinGameHandler,
    movePieceHandler,
    resignHandler,
    redeemPurchaseHandler,
    useItemHandler,
    keepaliveHandler,
};
