const mongoose = require("mongoose");
const config = require("./skills.config.json");
const Schema = mongoose.Schema

module.exports = mongoose.model(config.name, new Schema(config.schema))
