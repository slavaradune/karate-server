const mongo = require('mongodb');
const dbCommon = require('./common');

////////////////// PRIVATE //////////////////////


///////////////////// PUBLIC ///////////////

function getPayments(id, success) {
    dbCommon.getData(dbCommon.DATABASE.MEMBERS, result => success(result[0].payments), {'_id': mongo.ObjectId(id)});
}

function setPayment(id, key, value, success) {
    dbCommon.getData(dbCommon.DATABASE.MEMBERS, result => {
        for (let pay in result[0].payments) {
            if (result[0].payments[pay].key === key) {
                result[0].payments[pay].paid = value;
            }
        }
        dbCommon.changeData(dbCommon.DATABASE.MEMBERS, id, result[0], success);
    }, {'_id': mongo.ObjectId(id)});

}

module.exports = {
    getPayments,
    setPayment,
};