const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childSchema = new Schema({
    username: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('Child', childSchema);