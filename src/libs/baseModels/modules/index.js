const config = require('./modules.config.json')
const log = require("../../../helpers/logger");
const moment = require("moment");
const model = require('./modules.model')

module.exports.connect = (socket) => {
  let context = { model }
  
  for (const apiMethodName of Object.keys(config.api)) {
    const methodName = config.api[apiMethodName].method
    socket.on(apiMethodName, async data => {
      let res = null
      try {
        const execResult = await require(`./methods/${methodName}`)(data, context)
        log.info(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${apiMethodName}] - Success`)
        res = {
          status: 'success',
          data: execResult
        }
      } catch (e) {
        log.error(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${apiMethodName}] - Error: ${e.message}`)
        res = {
          status: 'error',
          message: e.message
        }
      }
      socket.emit(apiMethodName, res)
    })
  }
}
