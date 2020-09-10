const express = require('express');
const app = express();
const config = require('./src/core/config.json');

const startMessage = config.startMessage;
const port = process.env.PORT || config.port;

async function startServer() {
  await require('./src/loaders').loaders({expressApp: app});
  app.listen(port, () => console.log(`\n###############################\n# ${startMessage}: ${port} #\n###############################\n`));
}

startServer();
