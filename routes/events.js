var express = require('express');
var router = express.Router();


const EVENTS = [
    {id: "0", startDate: new Date("10/01/2019"), endDate: new Date("11/01/2019"), name: "Marathon 26 hours"},
    {id: "1", startDate: new Date("10/02/2019"), endDate: new Date("10/02/2019"), name: "Championship"},
    {id: "2", startDate: new Date("02/01/2019"), endDate: new Date("02/01/2019"), name: "Camp"},

];

function findByDate(date, isFuture) {
    let retEvents = [];
    for (let event in EVENTS) {
        if ((isFuture && EVENTS[event].startDate >= date) ||
            (!isFuture && EVENTS[event].startDate < date)) {

            retEvents.push(EVENTS[event]);
        }
    }

    return retEvents;
}

router.get('/', function(req, res, next) {

    let date = new Date(+req.query.date);
    let future = req.query.future === "true";
    let eventsList = findByDate(date, future);

    res.send({results: eventsList});
});

router.post('/', function(req, res, next) {
    let body = req.body;
    body.startDate = new Date(+body.startDate);
    body.endDate = new Date(+body.endDate);
    EVENTS.push(body);
    res.send({isOk: true});
});

module.exports = router;
