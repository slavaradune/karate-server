
let MEMBERS = [
    {name: {first: "Slava", last: "Radune"}, id: "0", rank: 'Dan 2', groups: ["1", "2"],
        payments: [{key: 'September', paid: true}, {key: 'October', paid: true}]},
    {name: {first: "Diana", last: "Radune"}, id: "1", rank: 'Dan 1', groups: ["1"],
        payments: [{key: 'September', paid: true}, {key: 'October', paid: false}]},
    {name: {first: "Artiom", last: "Radune"}, id: "2", rank: 'Dan 2', groups: ["2"],
        payments: [{key: 'September', paid: true}, {key: 'October', paid: true}, {key: 'November', paid: false}]},
];

function getDataById(dataBase, id) {
    for (let doc in dataBase) {
        if (dataBase[doc].id === id) {
            return dataBase[doc];
        }
    }
}

function getNextId(dataBase) {
    let maxId = 0;
    for (let doc in dataBase) {
        if (+dataBase[doc].id > maxId) {
            maxId = +dataBase[doc].id;
        }
    }
    return "" + (maxId + 1);
}

function getMembers() {
    return MEMBERS;
}

function getMember(id) {
    return getDataById(MEMBERS, id);
}

function addMember(member) {
    member.id = getNextId(MEMBERS);
    MEMBERS.push(member);
}

function changeMember(member) {
    let newMembers = MEMBERS.filter(item => {
        return item.id !== member.id;
    });
    newMembers.push(member);
    MEMBERS = newMembers;
}

function getPayments(id) {
    return getDataById(MEMBERS, id).payments;
}

function setPayment(id, month, value) {
    let payments = getDataById(MEMBERS, id).payments;
    for (let pay in payments) {
        if (payments[pay].key === month) {
            payments[pay].paid = value === 'true';
        }
    }
}


module.exports = {
    getMembers,
    getMember,
    addMember,
    changeMember,
    getPayments,
    setPayment,
};