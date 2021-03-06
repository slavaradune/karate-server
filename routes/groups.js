let express = require('express');
let router = express.Router();
let db = require('../db/dbGroups');

router.get('/', function(req, res, next) {
    db.getGroups(function (result) {
        res.send(result);
    });
});

router.post('/', function(req, res, next) {
    db.addGroup(req.body, function (result) {
        res.send(result);
    });
});

module.exports = router;
