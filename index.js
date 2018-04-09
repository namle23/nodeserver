const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// const deleteFile = (file) => {
//   fs.unlink('' + file, (error) => {
//     if (error) throw error;
//   });
// }

// let timeOuts = [];

// app.post('/upload', (req, res) => {
//   const timer = setTimeout(() => deleteFile(req.body.file), time_remaining(req.body.date));
//   timeOuts.push(timer);
// });

// fs.unlink('./uploads/JSONconfigurator/data2.json', () => {
//   console.log('Done');
// });

//allow access to folder
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/src', express.static(__dirname + '/src'));

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/JSONconfigurator');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let storage_multiple = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/JSONmodels');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: storage });
let uploads = multer({ storage: storage_multiple }).any('files', 20);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/public'));

app.post('/upload', upload.single('file'), (req, res) => {
  return res.json('success');
});

app.post('/uploads', function (req, res) {
  uploads(req, res, function (error) {
    if (error) {
      return res.end('Error uploading file!');
    }
    res.end('Files uploaded!');
  })
});

app.listen(3000, () => console.log(`Listening on 3000`));


