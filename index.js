const getPrice = require('./getprice');
const cors = require('cors');
const express = require('express');
const app = express();
const cron = require('node-cron');
const port = 5000;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var data;
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log('Database created!');
  db.close();
});

/*
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db('used-price-car');


  dbo
    .collection('price')
    .find()
    .toArray(async function (err, result) {
      if (err) throw err;
      let oldData = result[0]['data']['model'];
      console.log(oldData['attrage']);
      let data = await getPrice.getData();
      let newData = {};

      newData['attrage'] = [...oldData['attrage'], data['attrage']];
      console.log(newData);

      db.close();
    });
});
/*
cron.schedule('* 5 * * *', function () {
  console.log('running a task every minute');
});
*/
app.use(express.json());
app.use(cors());

app.get('/:name', (req, res) => {
  let name = req.params.name;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('used-price-car');
    var query = { address: 'Park Lane 38' };

    dbo
      .collection('price')
      .find()
      .toArray(async function (err, result) {
        if (err) throw err;
        let oldData = result[0]['data']['model'];
        res.send(oldData);
        db.close();
      });
  });
});
app.get('/1', (req, res) => {
  console.log('กดเกดเ');
  res.send('ดกดเ้');
});

app.listen(port, () => {
  console.log('start server');
  //chatService.chat();
});
