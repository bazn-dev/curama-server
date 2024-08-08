module.exports = (reqParams, context) => {
  console.log(typeof reqParams)
  const newData = new context.models.task(reqParams)
  return newData.save()
}
