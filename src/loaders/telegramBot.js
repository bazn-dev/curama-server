const Telegraf = require('telegraf');
const mailer = require('../middlewares/mailer');
const bot = new Telegraf('825767029:AAGcZ0HtesV-W_1PgZeYqXSZaCRKqH14NCo');
const LeadModel = require('../models/lead').model;
const moment = require('moment');
const Markup = require('telegraf/markup.js');

function getMainMenu() {
  return Markup.keyboard([
    ['leads', 'add lead', 'send email']
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

    let str = '';

    leads.forEach((lead, index) => {
      str += `#${index}\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nCompany: ${lead.company}\n\n`;
    });

    ctx.reply(str);
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

bot.hears('send email', (ctx) => {
  return ctx.reply(`Введите:\nsend email\nnumber of lead\nsubject\nhtml`)
});

bot.hears(/^send email/, (ctx) => {
  const data = ctx.message.text.split('\n');

  LeadModel.find({}, (error, leads) => {
    const index = data[1];
    const subject = data[2];

    //TODO подумать над форматированным текстом с пустыми строками и тд
    const html = data[3];

    mailer.sendMail(leads[index].email, subject, html);
  });

  return ctx.reply(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Email sent`);
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
