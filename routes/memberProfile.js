var express = require('express');
var router = express.Router();

const DATA = {
    "0" : {name: "Slava"},
    "1" : {name: "Diana"},
    "2" : {name: "Artiom"},
};

router.get('/', function(req, res, next) {
    let id = req.query.id;
    let result = getDataById(id);
    res.send({result: result});
});

function getDataById(id) {
    return DATA[id];
}

module.exports = router;
