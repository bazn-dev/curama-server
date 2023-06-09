const CoreComponent = require('../../helpers/CoreComponent')
const service = require('./classes.service')
const config = require('./classes.config.json')

module.exports.connection = socket => {
  const core = new CoreComponent(socket, process.env.DB_HOST, config, service)
}
