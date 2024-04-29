const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const bot = new Telegraf('825767029:AAGcZ0HtesV-W_1PgZeYqXSZaCRKqH14NCo');

bot.start((ctx) => {
  console.log(ctx.chat.id);
  ctx.reply('Welcome!');
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

module.exports = bot;
