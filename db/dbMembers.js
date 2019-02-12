const mongo = require('mongodb');
const dbCommon = require('./common');

////////////////// PRIVATE //////////////////////



///////////////////// PUBLIC ///////////////
function getMembers(success) {
    dbCommon.getData(dbCommon.DATABASE.MEMBERS, success);
}

function getMember(id, success) {
    dbCommon.getData(dbCommon.DATABASE.MEMBERS, result => success(result[0]), {_id: mongo.ObjectId(id)});
}

function addMember(member, success) {
    dbCommon.addDocument(dbCommon.DATABASE.MEMBERS, member, success);
}

function changeMember(member, success) {
    dbCommon.changeData(dbCommon.DATABASE.MEMBERS, {'_id': mongo.ObjectId(member._id)}, member, success);

}


module.exports = {
    getMembers,
    getMember,
    addMember,
    changeMember,
};