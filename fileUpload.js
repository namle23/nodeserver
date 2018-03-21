'use-strict';
const storage = require('@google-cloud/storage');
const fs = require('fs');

const gcs = storage({
    projectId: 'upload-197821',
    keyFilename: './upload-b890ac7482f2.json'
});

const bucketName = 'upload-temps'
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let FileUpload = {};

FileUpload.uploadToGcs = (req, res, next) => {
    if (!req.file) return next();

    const gcsname = req.file.originalname;
    const file = bucket.file(gcsname);

    const writeStream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    writeStream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    writeStream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });

    writeStream.end(req.file.buffer);
}

module.exports = FileUpload;