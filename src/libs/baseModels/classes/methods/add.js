module.exports = async (requestParams, context) => {
	const newData = new context.model(requestParams)
	return newData.save()
}
