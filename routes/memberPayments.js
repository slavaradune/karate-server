var express = require('express');
var router = express.Router();

let PAYMENTS = {
    "0" : [{key: 'September', paid: true}, {key: 'October', paid: true}],
    "1" : [{key: 'September', paid: true}, {key: 'October', paid: false}],
};
router.get('/', function(req, res, next) {
    let id = req.query.id;
    let result = getDataById(id);
    res.send({result: result});
});

router.post('/', function(req, res, next) {
    let body = req.body;
    let payments = PAYMENTS[body.id];
    for (let payment in payments) {
        if (payments[payment].key === body.month) {
            payments[payment].paid = body.paid;
        }
    }
    res.send({isOk: true});
});

function getDataById(id) {
    return PAYMENTS[id];
}

module.exports = router;
