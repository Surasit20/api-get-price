const getPrice = require('./getprice');
const cors = require('cors');
const express = require('express');
const app = express();
const cron = require('node-cron');
const port = 5000;

var MongoClient = require('mongodb').MongoClient;
var url =
  'mongodb+srv://Surasit:O8X7hT9y1nrZOyRU@cluster0.u3exbej.mongodb.net/used-price-car?retryWrites=true&w=majority';
var data;
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log('Database created!');
  db.close();
});

let update = async (dbo, newData) => {
  console.log(typeof newData);
  await dbo.collection('price').updateOne(
    {
      id: '638c3830eaf4f9129479c03f',
    },
    { $set: { data: { model: newData } } },
    function (err, res) {
      if (err) {
        console.log(err);
      }

      console.log(res);
    }
  );
};

cron.schedule('* * 1 * *', function () {
  console.log('start');
  MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db('used-price-car');

    await dbo
      .collection('price')
      .find()
      .toArray(async function (err, result) {
        if (err) throw err;
        let oldData = result[0]['data']['model'];
        //console.log(oldData['attrage']);
        let data = await getPrice.getData();
        let newData = {};
        //console.log(oldData);
        //newData['attrage'] = [...oldData['attrage'], data['attrage']];

        Object.keys(data).forEach((key) => {
          //console.log(key, data[key]);
          //console.log(key);
          let dataCar = oldData[key];
          //oldData[key] = oldData[key].push(data[key]);

          console.log('---------------');
          console.log(key);
          if (oldData[key] == undefined) {
            newData[key] = [data[key]];
          } else {
            newData[key] = [...dataCar, data[key]];
          }

          //console.log(oldData[key]);
        });
        await update(dbo, newData);

        /*
        console.log(newData);
        await dbo
          .collection('price')
          .updateOne(
            { _id: '638c3830eaf4f9129479c03f' },
            { $set: { data: { model: newData } } },
            function (err, res) {
              if (err) {
                console.log(err);
              }
  
              console.log('1 document updated');
            }
          );
          */
        //console.log(newData);
      });
  });
});

app.use(express.json());
app.use(cors());

app.get('/:name', (req, res) => {
  let name = req.params.name;
  console.log(`${name}11`);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('used-price-car');

    dbo
      .collection('price')
      .find()
      .toArray(async function (err, result) {
        if (err) throw err;
        let oldData = result[0]['data']['model'];

        Object.entries(oldData).forEach(([key, value]) => {
          if (`${key}\n` === name) {
            res.send(value);
          }
        });

        res.send(oldData[`${name}`]);

        db.close();
      });
  });
});

app.listen(port, () => {
  console.log('start server');
  //chatService.chat();
});
