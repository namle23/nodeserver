let express = require('express');
let multer = require('multer');
let path = require('path');
let app = express();

//Access-Control-Allow-Origin
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//allow access to folder
app.use('/uploads', express.static(__dirname + '/uploads'));

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

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

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
