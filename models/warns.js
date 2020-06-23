const mongoose = require('mongoose');
// Warns Schema
const Schema = new mongoose.Schema({
    Warns: Array,
    User: String,
    Guild: String,
});

module.exports = mongoose.model('warns', Schema);