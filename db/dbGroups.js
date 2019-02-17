const mongo = require('mongodb');
const dbCommon = require('./common');

////////////////// PRIVATE //////////////////////

///////////////////// PUBLIC ///////////////

function getGroups(date, future, success) {
    dbCommon.getData(dbCommon.DATABASE.GROUPS, success);
}

function getGroup(id, success) {
    dbCommon.getData(dbCommon.DATABASE.GROUPS, result => success(result[0]), {_id: mongo.ObjectId(id)});
}

function addGroup(group, success) {
    dbCommon.addDocument(dbCommon.DATABASE.GROUPS, group, success);
}

module.exports = {
    getGroups,
    getGroup,
    addGroup,
};