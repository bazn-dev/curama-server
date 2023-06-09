const mongoose = require('mongoose')
const moment = require('moment')
const log = require('../libs/logger')
const Schema = mongoose.Schema

class CoreComponent {
  constructor(socket, dbHost = '', config, methods) {
    this._dbConnection = mongoose.createConnection(dbHost)
    this._name = config.name
    this._model = this._dbConnection.model(config.name, new Schema(config.schema))
    this.setMethods(methods)
    this.connect(socket, config.api)
  }
  
  get name() {
    return this._name
  }
  
  set name(value) {
    this._name = value
  }
  
  get model() {
    return this._model
  }
  
  set model(value) {
    this._model = value
  }
  
  async get() {
    return this.model.find({})
  }
  
  async add(data) {
    const newData = new this.model(data)
    return newData.save()
  }
  
  async edit(data) {
    return this.model.findOneAndUpdate({_id: data._id}, data)
  }
  
  async delete(data) {
    return await this.model.deleteOne({_id: data._id}).exec()
  }
  
  setMethods(methods) {
    for (let name of Object.keys(methods)) {
      this.prototype[name] = methods[name]
    }
  }
  
  connect(socket, api) {
    for (const apiMethodName of Object.keys(api)) {
      console.log(apiMethodName)
      const methodName = api[apiMethodName].method
      const successStatusMessage = api[apiMethodName].response.success.statusMessage
      socket.on(apiMethodName, async data => {
        let res = null
        try {
          const execResult = await this[methodName](data)
          log.info(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${apiMethodName}] - ${successStatusMessage}`)
          res = {
            ...api[apiMethodName].response.success,
            data: execResult
          }
        } catch (e) {
          log.error(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${apiMethodName}] - ${e.message}`)
          res = {
            ...api[apiMethodName].response.error
          }
        }
        console.log(res)
        socket.emit(apiMethodName, res)
      })
    }
  }
}

module.exports = CoreComponent
