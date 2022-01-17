const express = require("express");
const router = express.Router();
var { GameManager, ConnectionManager } = require("../game/controller");
var PaymentDatabase = require("../payments/paymentDatabase");
var protodef = require("../communication/protodef");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "Best chess ever",
        players: ConnectionManager.getPlayerList(),
        nGamesPlayed: GameManager.nGamesCompleted,
        amountSpent: PaymentDatabase.moneySpent
    });
});

router.get("/play", function (req, res, next) {
    res.render("game", {
        title: "Playing the chess game",
        color: {
            board: {
                dark: "#3b3b3b",
                light: "#e6e6e6",
            },
        },
    });
});

module.exports = router;
