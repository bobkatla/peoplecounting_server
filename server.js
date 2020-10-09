// dealling with security problem
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

// connect other files in the system
const Building = require('./models/building');
// some requirements
const cors = require('cors');
const mongoose = require('mongoose');
// express.js connect later
const express = require('express');
const app = express();

// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());

// set up mongo
const monConnOnline = mongoose.createConnection(
  process.env.MONGO_KEY, 
    { useNewUrlParser: true, useUnifiedTopology: true});
const onlModel = monConnOnline.model('Building', Building);

// RESTful api
// for testing
app.get('/', (req, res) => {res.json('it is working');});
app.post('/test', (req, res) => {
    const {something} = req.body;
    res.json(something);
});

// for counting the people inside a building
app.put('/countplus', (req, res) => {
    const {id} = req.body;

    onlModel.find({id}, (err, docs) => {
        if(err) {
          console.log(err);
        } else {
          if(docs.length === 0){
            res.status(400).json("error building does not exist");
          } else {
            onlModel.updateOne({id}, {$inc: {count: 1}})
            .then(() => {
                res.status(200).json("update the bulding successfully");
            });
          }
        }
      });
});
app.put('/countminus', (req, res) => {
  const {id} = req.body;

  onlModel.find({id}, (err, docs) => {
      if(err) {
        console.log(err);
      } else {
        if(docs.length === 0){
          res.status(400).json("error building does not exist");
        } else {
          onlModel.updateOne({id}, {$inc: {count: -1}})
          .then(() => {
              res.status(200).json("update the bulding successfully");
          });
        }
      }
    });
});

// for admin work of adding new building
app.post('/addbuilding', (req, res) => {
    const {id, image, name, area} = req.body;

    onlModel.find({id}, (err, docs) => {
      if(err) {
        console.log(err);
      } else {
        if(docs.length === 0){
          const newBuilding = new onlModel({
              id,
              image,
              name,
              area,
              count: 0
          });
      
          newBuilding.save().then(doc => {
              // console.log(doc);
              res.status(200).json("successfully adding new building")
          }).catch(err => res.status(400).json('error adding building'));
        } else {
          res.status(400).json("the id already existed");
        }
      }
    });
});

// query to get a whole building
app.get('/getnumber/:id', (req, res) => {
    const {id} = req.params;

    onlModel.find({id}, (err, docs) => {
        if(err) {
            console.log(err);
          } else {
            if(docs.length === 0){
              res.status(400).json("error building does not exist");
            } else {
              res.status(200).json(docs[0]);
            }
          }
    });
});

// get all building
app.get('/getall', (req, res) => {
    onlModel.find({}, (err, docs) => {
        if(err) {
            console.log(err);
          } else {
            if(docs.length === 0){
              res.status(400).json("list is empty");
            } else {
              res.status(200).json(docs);
            }
          }
    });
});

app.get('/getsum', (req, res) => {
  onlModel.aggregate([{
    $group: {
      _id: "",
      count: { $sum: "$count" }
    }
  }])
  .then((group) => res.status(200).json(group[0].count))
  .catch(err => console.log(err));
});

// run on port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});