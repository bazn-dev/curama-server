const express = require('express');
const app = express();
const config = require('./src/config/config.json');

const startMessage = config.startMessage;
const port = process.env.PORT || config.port;

async function startServer() {
    const server = app.listen(port, () => console.log(`\n###############################\n# ${startMessage}: ${port} #\n###############################\n`));
    await require('./src/loaders').loaders({
        expressApp: app,
        server: server
    });
}

startServer();
