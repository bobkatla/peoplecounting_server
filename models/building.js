const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    id: Number,
    image: String,
    name: String,
    area: String,
    count: Number
});