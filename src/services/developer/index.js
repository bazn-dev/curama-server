const CoreComponent = require('../../helpers/CoreComponent')
const service = require('./developer.service')


//
// let collections = Object.keys(mongoose.connections[0].collections)
// console.log(collections)
//

// todo оставить только методы

module.exports.connection = async (socket, dbHost, components) => {
  CoreComponent.setMethods(service)
  CoreComponent.connect(socket, dbHost, components)
}
