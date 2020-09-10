const Telegraf = require('telegraf');
const mailer = require('../middlewares/mailer');
const bot = new Telegraf('825767029:AAGcZ0HtesV-W_1PgZeYqXSZaCRKqH14NCo');
const LeadModel = require('../models/lead').model;
const moment = require('moment');
const Markup = require('telegraf/markup.js');

function getMainMenu() {
  return Markup.keyboard([
    ['leads', 'add lead']
  ]).resize().extra()
}

bot.start(ctx => {
  ctx.reply('Welcome!', getMainMenu());
});
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));
bot.hears('start', ctx => ctx.reply('Play'));

bot.hears('leads', (ctx) => {
  LeadModel.find({}, (error, leads) => {
    if (error) console.log(error);

    console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Got leads`);

    ctx.reply(JSON.stringify(leads));
  });
});

bot.hears('add lead', (ctx) => {
  return ctx.reply(`Введите:\n add lead\n name\n email\n phone\n company`)
});

bot.hears(/^add lead/, (ctx) => {
  const data = ctx.message.text.split('\n');

  const lead = new LeadModel({
    name: data[1],
    email: data[2],
    phone: data[3],
    company: data[4]
  });

  lead.save(error => {
    if (error) console.log(error);

    ctx.reply(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Added lead`);
  });

  //return ctx.reply(`add lead`)
});

/*bot.context.db = {
  getScores: () => { return 42 }
};*/

/*bot.on('text', (ctx) => {
  console.log(ctx.pollAnswer);

  const scores = ctx.db.getScores(ctx.message.from.username);

  //mailer.sendMail('alex', 'sdf', 'df', 'sdf');

  return ctx.reply(`${ctx.message.from.username}: ${scores}`)
});*/

bot.launch();

module.exports = bot;
