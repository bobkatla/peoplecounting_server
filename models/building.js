const mongoose = require('mongoose');

// module.exports = mongoose.model('Sensor', new mongoose.Schema({
//     id: Number,
//     name: String,
//     address: String,
//     time: Date,
//     temperature: Number
// }));

module.exports = new mongoose.Schema({
    id: Number,
    name: String,
    area: String,
    count: Number
});