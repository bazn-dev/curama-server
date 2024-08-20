const modules = require('./baseModels/modules')
const classes = require('./baseModels/classes')
const skills = require('./baseModels/skills')
const methods = require('../methods')

module.exports.connection = (socket, io) => {
  modules.connect(socket)
  classes.connect(socket)
  skills.connect(socket)
  methods.connect(socket)
}
