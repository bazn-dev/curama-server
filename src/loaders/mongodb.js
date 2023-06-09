const mongoose = require('mongoose')

module.exports.mongooseLoader = async function() {
  await mongoose.connect(process.env.DB_HOST_2, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('debug', true);
};
