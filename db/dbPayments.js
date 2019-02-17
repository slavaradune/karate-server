const mongo = require('mongodb');
const dbCommon = require('./common');
const dbPricing = require('./dbPricing');

////////////////// PRIVATE //////////////////////
function getPrice(groups, pricing){
    let price = 0;
    for (let group in groups) {
        if (pricing[groups[group]]) {
            price += pricing[groups[group]];
        }
    }
    return price;
}

function updatePaymentsAccordingToPricing(newPayments, member, pricing){
    let payments = dbCommon.clone(newPayments);
    let groups = member.groups;
    let price = getPrice(groups, pricing);
    for (let payments_grp in payments) {
        for (let p in payments[payments_grp].payments) {
            payments[payments_grp].payments[p].required = price;
            payments[payments_grp].payments[p].paid = 0;
        }
    }
    return payments;
}

function getDefaultPayments(success) {
    let query = {type: 'groups'};
    let params = {sort: {date: -1}};
    dbCommon.getOneDocument(dbCommon.DATABASE.PAYMENTS, result => success([result]), query, params);
}

///////////////////// PUBLIC ///////////////

function getPayments(id, success) {
    dbCommon.getData(dbCommon.DATABASE.MEMBERS, result => success(result[0].payments_group), {'_id': mongo.ObjectId(id)});
}

function setPayment(id, group, key, value, success) {
    dbCommon.getData(dbCommon.DATABASE.MEMBERS, result => {
        let payments_group = result[0].payments_group;
        for (let grp in payments_group) {
            if (payments_group[grp].name === group) {
                for (let pay in payments_group[grp].payments) {
                    if (payments_group[grp].payments[pay].key === key) {
                        payments_group[grp].payments[pay].paid = +value;
                    }
                }
            }
        }
        dbCommon.changeData(dbCommon.DATABASE.MEMBERS, result[0], success);
    }, {'_id': mongo.ObjectId(id)});
}

function setNewPayments(members, payments, success) {
    dbPricing.getPrices(pricing => {
        for (let member in members) {
            let newPayments = updatePaymentsAccordingToPricing(payments, members[member], pricing);
            members[member].payments_group = members[member].payments_group.concat(newPayments);
            dbCommon.changeData(dbCommon.DATABASE.MEMBERS, members[member]);
        }
        dbCommon.addDocuments(dbCommon.DATABASE.PAYMENTS, payments, success);
    });
}

function updateDefaultPayment(member, success) {
    dbPricing.getPrices(pricing => {
        getDefaultPayments (payments => {
            let newPayments = updatePaymentsAccordingToPricing(payments, member, pricing);
            member.payments_group = newPayments;
            success(member);
        })
    })
}

function filterPaid(members, paid) {
    return members.filter(item => {
        for (let payment_group in item.payments_group) {
            for (let p in item.payments_group[payment_group].payments){
                let payItem = item.payments_group[payment_group].payments[p];
                let paymentDone = (payItem.required - payItem.paid <= 0);
                if (!paymentDone) {
                    return !paid;
                }
            }
        }
        return paid;
    });
}

module.exports = {
    getPayments,
    setPayment,
    setNewPayments,
    updateDefaultPayment,
    filterPaid,
};