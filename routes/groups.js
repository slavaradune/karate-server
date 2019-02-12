let express = require('express');
let router = express.Router();
let db = require('../db/dbMembers');

router.get('/', function(req, res, next) {
    db.getGroups(function (result) {
        res.send({result: result});
    });
});

router.post('/', function(req, res, next) {
    db.addGroup(req.body, function (result) {
        res.send(result);
    });
});

module.exports = router;
