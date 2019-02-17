let express = require('express');
let db = require('../db/dbPricing');
let router = express.Router();


router.get('/', function(req, res, next) {
    db.getPrices(result => res.send(result));
});

router.post('/', function(req, res, next) {
    let body = req.body;
    db.addPrice(body, result => res.send(result));
});

module.exports = router;
