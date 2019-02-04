var express = require('express');
var router = express.Router();


const MEMBERS = [
    {name: {title: "Dr.", first: "Slava", last: "Radune"}, id: "0", rank: 'Dan 2', groups: ["1", "2"]},
    {name: {title: "Dr.", first: "Diana", last: "Radune"}, id: "1", rank: 'Dan 1', groups: ["1"]},
    {name: {title: "Mr.", first: "Artiom", last: "Radune"}, id: "2", rank: 'Dan 2', groups: ["2"]},
];

router.get('/', function(req, res, next) {

    res.send({results: MEMBERS});
});

module.exports = router;
