const mongo = require('mongodb');
const dbCommon = require('./common');

////////////////// PRIVATE //////////////////////

function dateQuery(date, isFuture) {
    if (isFuture) {
        return {startDate: {$gte: date}}
    } else {
        return {startDate: {$lt: date}}
    }
}

///////////////////// PUBLIC ///////////////

function getEvents(date, future, success) {
    let query = dateQuery(date, future);
    dbCommon.getData(dbCommon.DATABASE.EVENTS, success, query);
}

function getEvent(id, success) {
    dbCommon.getData(dbCommon.DATABASE.EVENTS, result => success(result[0]), {_id: mongo.ObjectId(id)});
}

function addEvent(event, success) {
    dbCommon.addDocument(dbCommon.DATABASE.EVENTS, event, success);
}

module.exports = {
    getEvents,
    getEvent,
    addEvent,
};