const classes = require('./classes')
const skills = require('./skills')
const methods = require('../methods')

module.exports.connection = (socket, io) => {
  classes.connect(socket)
  skills.connect(socket)
  methods.connect(socket)
}
