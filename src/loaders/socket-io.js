module.exports.socketIOLoader = async function (app) {
  const io = require('socket.io')(app, {
    cors: {
      origin: '*'
    }
  });

  // For auth
  // io.use((socket, next) => {
  //   auth.connection(socket);
  //
  //   console.log('token', socket.handshake.auth.token);
  //   const isEnable = false;
  //   /*const isEnable = jwt({
  //     secret: 'secret',
  //     userProperty: 'payload',
  //     getToken: getTokenFromHeaders,
  //     algorithms: ['sha1', 'RS256', 'HS256'],
  //   });*/
  //
  //   if (isEnable) {
  //     next();
  //   } else {
  //     console.error('access denied');
  //   }
  // })
  console.log('load socket')

  io.on("connection", socket => {
    console.log("Add connection");
    require('../services').connection(socket, io);
    socket.on('disconnect', data => io.emit('user disconnected', socket.userId));
  });
};
