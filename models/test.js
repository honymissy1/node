const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const info = new Schema({
    name: {type: String},
    age:{type: Number}
})

module.exports = mongoose.model('data', info);