module.exports.loaders = async function(data) {
  await require('./express').expressLoader(data.expressApp);
  await require('./socket-io').socketIOLoader(data.server);
  // await require('./gateway').connect();
  await require('./mongodb').connect();
  // await require('./passport').passportLoader();
};
