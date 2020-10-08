// dealling with security problem
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

// connect other files in the system
const Building = require('./models/building');
// some requirements
const cors = require('cors');
// express.js connect later
const express = require('express');
const app = express();

// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());

// set up mongo
const monConnOnline = mongoose.createConnection(
    'mongodb+srv://bobkatla:conmeocon1@sit314.jhepn.mongodb.net/sit314?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true});
const onlModel = monConnOnline.model('Building', Building);

// RESTful api
app.get('/', (req, res) => {res.json('it is working');});

app.post('/test', (req, res) => {
    const {email, password} = req.body;
    res.json(email);
});

app.post('/counting', (req, res) => {
    const {id} = req.body;

    onlModel.find({id}, (err, docs) => {
        if(err) {
          console.log(err);
        } else {
          if(docs.length === 0){
            res.status(400).json("error building does not exist");
          } else {
            onlModel.updateOne({id}, {$push: {count: ???}})
            .then(() => {
                res.status(200).json("update the bulding successfully");
            });
          }
        }
      });
});

app.post('/addbuilding', (req, res) => {
    const {id, name, area} = req.body;
    const newBuilding = new onlModel({
        id,
        name,
        area,
        count: 0
    });

    newSensorOnl.save().then(doc => {
        // console.log(doc);
        res.status(200).json("successfully adding new building")
    }).catch(err => res.status(400).json('error adding building'));
});

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

// run on port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});