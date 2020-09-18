const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  isLetterSent: Boolean
});

module.exports = {
  model: mongoose.model('Lead', leadSchema),
  schema: leadSchema
};