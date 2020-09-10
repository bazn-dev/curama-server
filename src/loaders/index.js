module.exports.loaders = async function({ expressApp }) {
  await require('./express').expressLoader(expressApp);
  await require('./mongodb').mongoDBLoader();
};
