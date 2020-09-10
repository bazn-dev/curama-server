const mongoose = require('mongoose');
const config = require('../core/config.json');

module.exports.mongoDBLoader = async function() {
  mongoose.connect(config.uriDB, { useNewUrlParser: true });
};
