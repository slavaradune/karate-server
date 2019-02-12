const mongo = require('mongodb');

const DATABASE = {
    DB_URL: 'mongodb+srv://admin:shinkyokushin@shinkyokushin-champ-knlct.mongodb.net/championship',
    DB: 'karate-master',
    MEMBERS: 'members',
    EVENTS: 'events',
    IMAGES: 'images'
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

function addDocument(collection, data, success) {
    dbo.collection(collection)
        .insertOne(data,
            function(err, res) {
                if (err) throw err;
                let result = {isOk: true};
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

function changeData(collection, id, data, success) {
    dbo.collection(collection)
        .updateOne({"_id": mongo.ObjectId(id)}, {$set: data}, (err, res) => {
            if (err) throw err;
            success({isOk: true});
        });
}

module.exports = {
    DATABASE,
    addDocument,
    changeData,
    getData,
    dbConnect,
    dbDisconnect
};