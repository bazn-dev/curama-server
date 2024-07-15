const gateway = require('./gateway');

module.exports.loaders = async function(data) {
  await require('./express').expressLoader(data.expressApp);
  // await require('./socket-io').socketIOLoader(data.server);
  await gateway.telegramConnect();
  await gateway.socketConnect();
  await require('./mongodb').connect();
  await require('./crons').start();
  // await require('./passport').passportLoader();
};
