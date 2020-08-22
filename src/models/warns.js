const mongoose = require("mongoose");
// Warns Schema
const Schema = new mongoose.Schema({
    Warns: mongoose.Schema.Types.Array,
    User: mongoose.Schema.Types.String,
    Guild: mongoose.Schema.Types.String
});

module.exports = mongoose.model("warns", Schema);
