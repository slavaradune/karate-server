const mongo = require('mongodb');
const dbCommon = require('./common');
const dbPayments = require('./dbPayments');
////////////////// PRIVATE //////////////////////



///////////////////// PUBLIC ///////////////
function getMembers(success) {
    dbCommon.getData(dbCommon.DATABASE.MEMBERS, success);
}

function getMember(id, success) {
    dbCommon.getData(dbCommon.DATABASE.MEMBERS, result => success(result[0]), {_id: mongo.ObjectId(id)});
}

function addMember(member, success) {
    dbPayments.updateDefaultPayment(member, newMember => {
        dbCommon.addDocument(dbCommon.DATABASE.MEMBERS, newMember, success);
    });
}

function changeMember(member, success) {
    dbCommon.changeData(dbCommon.DATABASE.MEMBERS, member, success);
}


module.exports = {
    getMembers,
    getMember,
    addMember,
    changeMember,
};