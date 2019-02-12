let express = require('express');
let db = require('../db/dbImages');
let router = express.Router();


router.get('/', function(req, res, next) {
    let imageName = req.query.imageName;
    db.getImage(imageName, result => res.send(result ? result.image : undefined));

});

router.post('/', function(req, res, next) {
    db.addImage(req.body, result => res.send(result));
});

module.exports = router;
