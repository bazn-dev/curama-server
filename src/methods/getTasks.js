module.exports = (reqParams, context) => {
  return context.models.task.find({})
}
