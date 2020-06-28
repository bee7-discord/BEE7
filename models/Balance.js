const { Schema, model } = require('mongoose');

module.exports = model("Balance", new Schema({
    UserId: String,
}));