const CoreComponent = require('../../helpers/CoreComponent')
const service = require('./modules.service')
const config = require('./modules.config.json')

module.exports.connection = socket => {
  const core = new CoreComponent(socket, process.env.DB_HOST, config, service)
}
