const mongoose = require("mongoose");

module.exports.getCollectionsByDatabase = async (data) => {
  console.log('getCollectionsByDatabase', data)
  const dbConnection = mongoose.createConnection(`mongodb+srv://alex:9789355qw@cluster0.agxth.mongodb.net/${data.db}?retryWrites=true&w=majority`)
  const connection = await dbConnection.on('open', async () => {})
  return await connection.db.listCollections().toArray()
}

module.exports.addCollectionInDataBase = async (data) => {
  console.log(data)
  const dbConnection = mongoose.createConnection(`mongodb+srv://alex:9789355qw@cluster0.agxth.mongodb.net/${data.db}?retryWrites=true&w=majority`)
  const connection = await dbConnection.on('open', async () => {})
  await connection.db.createCollection(data.name)
  return null
}

module.exports.renameCollectionInDataBase = async (data) => {
  console.log(data)
  const dbConnection = mongoose.createConnection(`mongodb+srv://alex:9789355qw@cluster0.agxth.mongodb.net/${data.db}?retryWrites=true&w=majority`)
  const connection = await dbConnection.on('open', async () => {})
  await connection.db.collection(data.oldName).rename(data.newName)
  return null
}

module.exports.dropCollectionInDataBase = async (data) => {
  console.log(data)
  const dbConnection = mongoose.createConnection(`mongodb+srv://alex:9789355qw@cluster0.agxth.mongodb.net/${data.db}?retryWrites=true&w=majority`)
  const connection = await dbConnection.on('open', async () => {})
  await connection.db.dropCollection(data.name)
  return null
}

module.exports.getAllDocumentsCollectionInDataBase = async (data) => {
  console.log(data)
  const dbConnection = mongoose.createConnection(`mongodb+srv://alex:9789355qw@cluster0.agxth.mongodb.net/${data.db}?retryWrites=true&w=majority`)
  const connection = await dbConnection.on('open', async () => {})
  console.log(await (await connection.db.collection(data.collection).find({})).toArray())
  return await (await connection.db.collection(data.collection).find({})).toArray()
}

module.exports.insertDocumentCollectionInDataBase = async (data) => {
  console.log(data)
  const dbConnection = mongoose.createConnection(`mongodb+srv://alex:9789355qw@cluster0.agxth.mongodb.net/${data.db}?retryWrites=true&w=majority`)
  const connection = await dbConnection.on('open', async () => {})
  await connection.db.collection(data.collection).insertOne(data.data)
  return null
}

// todo don't work
module.exports.updateDocumentCollectionInDataBase = async (data) => {
  console.log(data)
  const dbConnection = mongoose.createConnection(`mongodb+srv://alex:9789355qw@cluster0.agxth.mongodb.net/${data.db}?retryWrites=true&w=majority`)
  const connection = await dbConnection.on('open', async () => {})
  await connection.db.collection(data.collection).updateOne(
    {_id: mongoose.Types.ObjectId(data.data._id)},
    {$set: Object.assign({}, {a: 1, b: 2, c: 3}, {_id: undefined})}
  )
  return null
}

module.exports.deleteDocumentCollectionInDataBase = async (data) => {
  console.log(data.data._id)
  const dbConnection = mongoose.createConnection(`mongodb+srv://alex:9789355qw@cluster0.agxth.mongodb.net/${data.db}?retryWrites=true&w=majority`)
  const connection = await dbConnection.on('open', async () => {})
  await connection.db.collection(data.collection).deleteOne(
    {_id: mongoose.Types.ObjectId(data.data._id)}
  )
  return null
}

module.exports.createFile = async (data) => {
  console.log('Success created file')
  return 'Success created file'
}

module.exports.createFolder = async (data) => {
  console.log('Success created folder')
  throw new Error('Error created folder')
  return 'Success created folder'
}
