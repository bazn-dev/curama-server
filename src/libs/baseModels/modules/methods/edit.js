module.exports = async (requestParams, context) => {
	return context.model.findOneAndUpdate({_id: requestParams._id}, requestParams)
}
