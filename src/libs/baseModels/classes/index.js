const config = require('./classes.config.json')
const log = require("../../../helpers/logger");
const moment = require("moment");
const model = require('./classes.model')

module.exports.connect = (socket) => {
  let context = { model }
  
  for (const apiMethodName of Object.keys(config.api)) {
    const methodName = config.api[apiMethodName].method
    const successStatusMessage = config.api[apiMethodName].response.success.statusMessage
    socket.on(apiMethodName, async data => {
      let res = null
      try {
        const execResult = await require(`./methods/${methodName}`)(data, context)
        log.info(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${apiMethodName}] - ${successStatusMessage}`)
        res = {
          ...config.api[apiMethodName].response.success,
          data: execResult
        }
      } catch (e) {
        log.error(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${apiMethodName}] - ${e.message}`)
        res = {
          ...config.api[apiMethodName].response.error
        }
      }
      socket.emit(apiMethodName, res)
    })
  }
}
