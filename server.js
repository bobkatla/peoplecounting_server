// dealling with security problem
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

// some requirements
const cors = require('cors');
// express.js connect later
const express = require('express');
const app = express();

// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());

// RESTful api
app.get('/', (req, res) => {res.json('it is working');});

app.post('/test', (req, res) => {
    const {something} = req.body;
    res.json(something);
});

app.post('/counting', (req, res) => console.log);

app.get('/getnumber/:id', (req, res) => console.log);

// run on port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});