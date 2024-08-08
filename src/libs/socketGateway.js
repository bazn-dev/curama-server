const classes = require('./baseModels/classes')
const skills = require('./baseModels/skills')
const methods = require('../methods')

module.exports.connection = (socket, io) => {
  classes.connect(socket)
  skills.connect(socket)
  methods.connect(socket)
}
