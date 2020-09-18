const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadTextSchema = new Schema({
  subject: String,
  html: String
});

module.exports = {
  model: mongoose.model('LeadText', leadTextSchema),
  schema: leadTextSchema
};