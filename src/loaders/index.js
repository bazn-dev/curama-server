module.exports.loaders = async function(data) {
  await require('./express').expressLoader(data.expressApp);
  await require('./mongodb').connect();
  await require('./socket').connect(data.server);
  await require('./telegram').connect();
  await require('./crons').connect();
};
