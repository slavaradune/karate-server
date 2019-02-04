var express = require('express');
var router = express.Router();

const DATA = [
    {id: "0", startDate: new Date("10/01/2019"), endDate: new Date("11/01/2019"), name: "Marathon 26 hours"},
    {id: "1", startDate: new Date("10/02/2019"), endDate: new Date("10/02/2019"), name: "Championship"},
    {id: "2", startDate: new Date("02/01/2019"), endDate: new Date("02/01/2019"), name: "Camp"},

];

router.get('/', function(req, res, next) {
    let id = req.query.id;
    let result = getDataById(id);
    res.send({result: result});
});

function getDataById(id) {
    return DATA[id];
}

module.exports = router;
