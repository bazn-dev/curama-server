module.exports.connect = async function (app) {
    const io = require('socket.io')(app, {
      cors: {
        origin: '*'
      }
    });
  
    console.log('load socket')
  
    io.on("connection", socket => {
      console.log("Add connection");
      require('../libs/socketGateway').connection(socket, io);
      socket.on('disconnect', data => io.emit('user disconnected', socket.userId));
    });
  };

