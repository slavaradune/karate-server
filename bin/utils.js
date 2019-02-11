let db = require("../db/db");
const mongo = require('mongodb');

const DATABASE = {
    DB_URL: 'mongodb+srv://admin:shinkyokushin@shinkyokushin-champ-knlct.mongodb.net/championship',
    DB: 'karate-master',
    MEMBERS: 'members',
};

let MEMBERS = [
    {name: {first: "Slava", last: "Radune"}, id: "0", rank: 'Dan 2', groups: ["1", "2"],
        payments: [{key: 'September', paid: true}, {key: 'October', paid: true}]},
    {name: {first: "Diana", last: "Radune"}, id: "1", rank: 'Dan 1', groups: ["1"],
        payments: [{key: 'September', paid: true}, {key: 'October', paid: false}]},
    {name: {first: "Artiom", last: "Radune"}, id: "2", rank: 'Dan 2', groups: ["2"],
        payments: [{key: 'September', paid: true}, {key: 'October', paid: true}, {key: 'November', paid: false}]},
];


function addDocuments(collection, data) {
    mongo.MongoClient.connect(DATABASE.DB_URL, function(err, database) {
        let db = database;
        let dbo = db.db(DATABASE.DB);
        dbo.collection(collection)
            .insertMany(data,
                function(err, res) {
                    if (err) throw err;
                });
        db.close();
    });

}


addDocuments(DATABASE.MEMBERS, MEMBERS);