var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/play', function(req, res, next) {
    res.render('game', {
        title: 'Playing the chess game',
        color: {
            board: {
                dark: "black",
                light: "white"
            }
        }
    });
});

module.exports = router;