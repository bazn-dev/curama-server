const telegramBot = require('../plugins/telegram')
const {message} = require('telegraf/filters');
const services = require('../services');

module.exports.connect = async function() {
  console.log(services['skills/get']())
  telegramBot.on(message('text'), ctx => {
    console.log(ctx.update.message.date, ctx.update.message.text)
    return ctx.reply(`Hello!`)
  });
}
