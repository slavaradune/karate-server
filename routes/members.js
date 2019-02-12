let express = require('express');
let db = require('../db/dbMembers');
let router = express.Router();

router.get('/', function(req, res, next) {
    let id = req.query.id;
    if (id) {
        db.getMember(id, function (result) {
            res.send({result: result});
        });
    } else {
        db.getMembers(function (result) {
            res.send({results: result});
        });
    }
});

router.post('/', function(req, res, next) {
    let body = req.body;
    db.addMember(body, function (result) {
        res.send(result);
    });
});

module.exports = router;
