const CoreComponent = require('../../helpers/CoreComponent')
const service = require('./skills.service')
const config = require('./skills.config.json')

module.exports.connection = socket => {
  const core = new CoreComponent(socket, process.env.DB_HOST, config, service)
}
