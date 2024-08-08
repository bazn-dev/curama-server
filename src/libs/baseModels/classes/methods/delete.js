module.exports = async (requestParams, context) => {
	return await context.model.deleteOne({_id: requestParams}).exec()
}
