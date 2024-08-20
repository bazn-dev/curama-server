const mongoose = require("mongoose");
const fs = require("fs");
const moment = require("moment");
const Schema = mongoose.Schema
const ClassesModel = require('../libs/baseModels/classes/classes.model')
const SkillsModel = require('../libs/baseModels/skills/skills.model')
const log = require("../helpers/logger");

async function generateFile(dir, file, data) {
	data = typeof data === 'string' ? data : JSON.stringify(data);
	
	await fs.promises.writeFile(dir + '/' + file, data, error => {
		if (error) throw error;
	});
}

module.exports.connect = async (socket) => {
	const classes = await ClassesModel.find({})
	const skills = await SkillsModel.find({})
	
	const context = {
		models: {}
	}
	
	for (let classModel of classes) {
		if (!mongoose.modelNames().includes(classModel.name)) {
			context.models[classModel.name] = mongoose.model(classModel.name, new Schema(classModel.model))
		}
	}
	
	for (let skill of skills) {
		socket.on(`${skill.method}`, async data => {
			let res = null
			try {
				let script = null
				try {
					script = await require(`./${skill.method}`)
				} catch (e) {
					await generateFile(`./src/methods`, `${skill.method}.js`, `module.exports = (reqParams, context) => {
  throw new Error('Method is not ready')
}`);
					script = await require(`./${skill.method}`)
				}
				const execResult = await script(data, context)
				log.info(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${skill.title}] - Success`)
				res = {
					status: 'success',
					data: execResult
				}
			} catch (e) {
				log.error(`${moment().format('DD.MM.YYYY HH:mm:ss')} - [${skill.title}] - Error: ${e.message}`)
				res = {
					status: 'error',
					error: e.message
				}
			}
			console.log(res)
			socket.emit(`${skill.method}`, res)
		})
	}
}
