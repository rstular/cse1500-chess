var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Best chess ever' });
});

router.get('/play', function(req, res, next) {
    res.render('game', {
        title: 'Playing the chess game',
        color: {
            board: {
                dark: "#103275",
                light: "#7aa7ff"
            }
        }
    });
});

module.exports = router;