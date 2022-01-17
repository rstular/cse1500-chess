var express = require("express");
var router = express.Router();
var { GameManager, ConnectionManager } = require("../game/controller");
var protodef = require("../communication/protodef");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "Best chess ever",
        players: ConnectionManager.getPlayerList(),
        nGamesPlayed: GameManager.nGamesCompleted,
        active_games: GameManager.games.filter(
            (game) => game.state === protodef.GameState.PLAYING
        ).length,
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
