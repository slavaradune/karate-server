const mongo = require('mongodb');

const DATABASE = {
    DB_URL: 'mongodb+srv://admin:shinkyokushin@shinkyokushin-champ-knlct.mongodb.net/championship',
    DB: 'karate-master',
    MEMBERS: 'members',
};

let db;
let dbo;

const dbConnect = function () {
    mongo.MongoClient.connect(DATABASE.DB_URL, function(err, database) {
        db = database;
        dbo = db.db(DATABASE.DB);
    });
};

const dbDisconnect = function () {
    db.close();
};

////////////////// PRIVATE //////////////////////
function addDocument(collection, data, success) {
    dbo.collection(collection)
        .insertOne(data,
            function(err, res) {
                if (err) throw err;
                let result = {isOk: true, message: "User created successfully"};
                success(result);
            });
}


function getData(collection, success, query) {
    if (!query) {
        query = {};
    }
    dbo.collection(collection)
        .find(query).toArray(function(err, res) {
        if (err) throw err;
        success(res);
    });
}

//

//
// function getDataById(dataBase, id) {
//     for (let doc in dataBase) {
//         if (dataBase[doc].id === id) {
//             return dataBase[doc];
//         }
//     }
// }


///////////////////// PUBLIC ///////////////
function getMembers(success) {
    getData(DATABASE.MEMBERS, success);
}

function getMember(id) {
    getData(DATABASE.MEMBERS, success, {id: mongo.ObjectId(id)});
}

function addManyMembers(members, success) {
    addDocuments(DATABASE.MEMBERS, members, success);
}

function addMember(member, success) {
    addDocument(DATABASE.MEMBERS, member, success);
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
    dbConnect,
    dbDisconnect,
    getMembers,
    getMember,
    addMember,
    addManyMembers,
    changeMember,
    getPayments,
    setPayment,
};