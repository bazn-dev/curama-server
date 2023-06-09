const modules = require('./modules')
const classes = require('./classes')
const skills = require('./skills')

module.exports.connection = (socket, io) => {
  modules.connection(socket)
  classes.connection(socket)
  skills.connection(socket)
  // developer.connection(socket)
}
