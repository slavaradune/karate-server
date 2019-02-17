let express = require('express');
let db = require('../db/dbPayments');
let dbMembers = require('../db/dbMembers');
let router = express.Router();

router.get('/', function(req, res, next) {
    let id = req.query.id;
    db.getPayments(id, function (result) {
        res.send({result: result});
    });
});

router.post('/', function(req, res, next) {
    let body = req.body;
    db.setPayment(body.id, body.group, body.key, body.value, function (result) {
        res.send(result);
    });
});

router.post('/newPayments', function(req, res, next) {
    let body = req.body;
    dbMembers.getMembers(
        members => {
                db.setNewPayments(members, body.payments_group, function (result) {
                    res.send(result);
            });
        }
    );

});

module.exports = router;
