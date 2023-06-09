module.exports.loaders = async function(data) {
  await require('./express').expressLoader(data.expressApp);
  await require('./socket-io').socketIOLoader(data.server);
  // await require('./mongodb').mongooseLoader();
  // await require('./passport').passportLoader();
};
