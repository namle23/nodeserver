let express = require('express');
let multer = require('multer');
let path = require('path');
let app = express();

const fileUpload = require('./fileUpload.js');

let storageMulter = multer.memoryStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let storage_multiple = multer.memoryStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: storageMulter });
let uploads = multer({ storage: storage_multiple }).any('files', 20);

app.use(express.static(__dirname + '/public'));

app.post('/upload', upload.single('file'), fileUpload.uploadToGcs, function (req, res) {
  const data = req.body;

  // if (req.file && req.file.cloudStoragePublicUrl) {
  //   data.fileUrl = req.file.cloudStoragePublicUrl;
  // }
});

app.post('/uploads', fileUpload.uploadToGcs, function (req, res) {

});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, () => console.log(`Listening on 3000`));


