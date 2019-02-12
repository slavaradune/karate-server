let express = require('express');
let db = require('../db/dbEvents');
let router = express.Router();


router.get('/', function(req, res, next) {
    let id = req.query.id;
    if (id) {
        db.getEvent(id, result => res.send({result: result}));
    } else {
        let date = new Date(+req.query.date);
        let future = req.query.future;
        db.getEvents(date, future, result => res.send({results: result}));
    }
});

router.post('/', function(req, res, next) {
    let body = req.body;
    body.startDate = new Date(+body.startDate);
    body.endDate = new Date(+body.endDate);
    db.addEvent(body, result => res.send(result));
});

module.exports = router;
