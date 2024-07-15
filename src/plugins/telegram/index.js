const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const bot = new Telegraf('825767029:AAGcZ0HtesV-W_1PgZeYqXSZaCRKqH14NCo');

bot.launch();

module.exports = bot;
