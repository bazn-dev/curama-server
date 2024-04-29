const mongoose = require("mongoose");
const fs = require("fs");
const moment = require("moment");
const Schema = mongoose.Schema
const ClassesModel = require('../services/classes/classes.model')
const SkillsModel = require('../services/skills/skills.model')
const log = require("../plugins/logger");

function generateFile(dir, file, data) {
	data = typeof data === 'string' ? data : JSON.stringify(data);
	
	fs.writeFile(dir + '/' + file, data, error => {
		if (error) throw error;
	});
}

module.exports.connect = async (socket, io) => {
	const classes = await ClassesModel.find({})
	const skills = await SkillsModel.find({})
	
	const context = {
		models: []
	}
	for (let classModel of classes) {
		let model = {};
		model[classModel.name] = mongoose.model(classModel.name, new Schema(classModel.model))
		context.models.push(model)
	}
	
	for (let skill of skills) {
		socket.on(`${skill.method}`, async data => {
			let res = null
			try {
				let script = null
				// todo сейчас не получает новосозданные файлы со скриптом, продумать как их подтягивать
				try {
					script = await require(`./${skill.method}`)
				} catch (e) {
					generateFile(`./src/methods`, `${skill.method}.js`, `module.exports = (reqParams, context) => {
  throw new Error('Method is not ready')
}`);
					script = await require(`./${skill.method}`)
				}
				const execResult = await script(data, context)
				log.info(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${skill.title}] - ${skill.response.success.statusMessage}`)
				res = {
					...skill.response.success,
					data: execResult
				}
			} catch (e) {
				log.error(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${skill.title}] - ${e.message}`)
				res = {
					...skill.response.error,
					error: e.message
				}
			}
			console.log(res)
			socket.emit(`${skill.method}`, res)
		})
	}
}
