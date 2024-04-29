const mongoose = require('mongoose')

module.exports.connect = async function() {
  await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('debug', true);
};
