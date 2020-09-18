const Telegraf = require('telegraf');
const mailer = require('../middlewares/mailer');
const bot = new Telegraf('825767029:AAGcZ0HtesV-W_1PgZeYqXSZaCRKqH14NCo');
const LeadModel = require('../models/lead').model;
const LeadTextModel = require('../models/leadText').model;
const moment = require('moment');
const Markup = require('telegraf/markup.js');

function getMainMenu() {
  return Markup.keyboard([
    ['leads', 'add lead'],
    ['texts', 'add text'],
    ['send email']
  ]).resize().extra();
}

bot.start(ctx => {
  ctx.reply('Welcome!\nI\'m Curama.', getMainMenu());
});
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));
bot.hears('start', ctx => ctx.reply('Play'));


/* LEADS */
bot.hears('leads', (ctx) => {
  LeadModel.find({}, (error, leads) => {
    if (error) console.log(error);

    console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Got leads`);

    if (leads.length === 0) {
      return ctx.reply('No leads');
    }

    let str = '';

    leads.forEach((lead, index) => {
      str += `#${index}\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nCompany: ${lead.company}\nLetter was sent: ${lead.isLetterSent}\n\n`;
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
    company: data[4],
    isLetterSent: false
  });

  lead.save(error => {
    if (error) console.log(error);

    ctx.reply(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Added lead`);
  });
});

/* TEXTS */
bot.hears('texts', (ctx) => {
  LeadTextModel.find({}, (error, texts) => {
    if (error) console.log(error);

    console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Got texts`);

    if (texts.length === 0) {
      return ctx.reply('No texts');
    }

    let str = '';

    texts.forEach((text, index) => {
      str += `#${index}\nSubject: ${text.subject}\nHTML: ${text.html}\n\n`;
    });

    ctx.reply(str);
  });
});

bot.hears('add text', (ctx) => {
  return ctx.reply(`Введите:\n add text\n subject\n html`)
});

bot.hears(/^add text/, (ctx) => {
  const data = ctx.message.text.split('\n');

  const text = new LeadTextModel({
    subject: data[1],
    html: data[2]
  });

  text.save(error => {
    if (error) console.log(error);

    ctx.reply(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Added text`);
  });
});

/* EMAIL */
bot.hears('send email', (ctx) => {
  return ctx.reply(`Введите:\nsend email\nnumber of lead\nsubject\nhtml`)
});

bot.hears(/^send email/, (ctx) => {
  const data = ctx.message.text.split('\n');

  LeadModel.find({}, (error, leads) => {
    const index = data[1];
    const subject = data[2];
    const html = data[3];

    mailer.sendMail(leads[index].email, subject, html);

    leads[index].isLetterSent = true;

    const updateLead = {
      name: leads[index].name,
      email: leads[index].email,
      phone: leads[index].phone,
      company: leads[index].company,
      isLetterSent: true
    };

    LeadModel.findOneAndUpdate({_id: leads[index]._id}, updateLead, (error, updatedLead) => {
      if (error) console.log(error);
    });
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
