const mongoose = require('mongoose');

const moneySchema = new mongoose.Schema({
    userID: String,
    money: Number,
});

module.exports = mongoose.model("Money", moneySchema);