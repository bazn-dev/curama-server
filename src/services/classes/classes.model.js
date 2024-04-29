const mongoose = require("mongoose");
const config = require("./classes.config.json");
const Schema = mongoose.Schema

module.exports = mongoose.model(config.name, new Schema(config.schema))
