const telegramBot = require('../plugins/telegram')
const {message} = require('telegraf/filters');

module.exports.telegramConnect = async function() {
    require('../services/telegramGateway').connect();
}

module.exports.socketConnect = async function (app) {
    const io = require('socket.io')(app, {
      cors: {
        origin: '*'
      }
    });
  
    console.log('load socket')
  
    io.on("connection", socket => {
      console.log("Add connection");
      require('../services/socketGateway').connection(socket, io);
      socket.on('disconnect', data => io.emit('user disconnected', socket.userId));
    });
  };

