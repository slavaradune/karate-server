const mongo = require('mongodb');

const DATABASE = {
    DB_URL: 'mongodb+srv://admin:shinkyokushin@shinkyokushin-champ-knlct.mongodb.net/championship',
    DB: 'karate-master',
    MEMBERS: 'members',
    EVENTS: 'events',
    IMAGES: 'images',
    GROUPS: 'groups',
    PRICING: 'pricing',
    PAYMENTS: 'payments',
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
                if(success) {
                    success(result);
                }
            });
}


function addDocuments(collection, data, success) {
    dbo.collection(collection)
        .insertMany(data,
            function(err, res) {
                if (err) throw err;
                let result = {isOk: true};
                if(success) {
                    success(result);
                }
            });
}


function getData(collection, success, query) {
    if (!query) {
        query = {};
    }
    dbo.collection(collection)
        .find(query).toArray(function(err, res) {
        if (err) throw err;
        if (success) {
            success(res);
        }
    });
}

function getOneDocument(collection, success, query, params) {
    if (!query) {
        query = {};
    }
    if (!params) {
        params = {};
    }

    dbo.collection(collection).findOne(
        query,
        params,
        (err, data) => {
            if (err) throw err;
            if(success) {
                success(data);
            }
        },
    );
}

function changeData(collection, data, success) {
    if (typeof data._id === "string") {
        data._id = mongo.ObjectId(data._id);
    }
    dbo.collection(collection)
        .updateOne({"_id": data._id}, {$set: data}, (err, res) => {
            if (err) throw err;
            if (success) {
                success({isOk: true});
            }
        });
}

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

module.exports = {
    DATABASE,
    addDocument,
    addDocuments,
    changeData,
    getData,
    getOneDocument,
    dbConnect,
    dbDisconnect,
    clone,
};