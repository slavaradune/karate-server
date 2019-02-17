const dbCommon = require('./common');
////////////////// PRIVATE //////////////////////



///////////////////// PUBLIC ///////////////
function getPrices(success) {
    dbCommon.getData(dbCommon.DATABASE.PRICING, result => success(result[0]));
}

function addPrice(price, success) {
    dbCommon.addDocument(dbCommon.DATABASE.PRICING, price, success);
}

function changePrice(price, success) {
    dbCommon.changeData(dbCommon.DATABASE.PRICING, price, success);
}


module.exports = {
    getPrices,
    addPrice,
    changePrice,
};