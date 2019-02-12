const dbCommon = require('./common');

////////////////// PRIVATE //////////////////////

function imageQuery(imageName) {
    return {imageName: imageName};
}

///////////////////// PUBLIC ///////////////

function getImage(imageName, success) {
    let query = imageQuery(imageName);
    dbCommon.getData(dbCommon.DATABASE.IMAGES, result => success(result[0]), query);
}

function addImage(image, success) {
    dbCommon.addDocument(dbCommon.DATABASE.IMAGES, image, success);
}

module.exports = {
    getImage,
    addImage,
};