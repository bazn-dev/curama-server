const telegramBot = require('../plugins/telegram')
const {message} = require('telegraf/filters');
const { Markup } = require('telegraf');

const mongoose = require("mongoose");
const fs = require("fs");
const moment = require("moment");
const Schema = mongoose.Schema
const ClassesModel = require('./classes/classes.model')
const SkillsModel = require('./skills/skills.model')
const log = require("../plugins/logger");

const ByBit = require('../plugins/bybit');

function generateFile(dir, file, data) {
	data = typeof data === 'string' ? data : JSON.stringify(data);
	
	fs.writeFile(dir + '/' + file, data, error => {
		if (error) throw error;
	});
}

module.exports.connect = async () => {
    const bybit = new ByBit();

    const commands = [
      {
        command: 'start',
        description: 'Start command',
      },
      {
        command: 'gettickers',
        description: 'Get tickers'
      },
      {
        command: 'getpositioninfo',
        description: 'Get position info'
      },
      {
        command: 'getactiveorders',
        description: 'Get active orders'
      },
      {
        command: 'submitorder',
        description: 'Submit order'
      },
      {
        command: 'closeorder',
        description: 'Close order'
      }
    ];

    telegramBot.start(async (ctx) => {
        console.log(ctx.chat.id);
        return await ctx.reply('this is text', Markup
          .keyboard([
            ['button 1', 'button 2'], // Row1 with 2 buttons
            ['button 3', 'button 4'], // Row2 with 2 buttons
            ['button 5', 'button 6', 'button 7'] // Row3 with 3 buttons
          ])
          .oneTime()
          .resize()
        )
    });

    telegramBot.help((ctx) => ctx.reply('Send me a sticker'));

    telegramBot.on(message('sticker'), (ctx) => ctx.reply('👍'));

    telegramBot.on(message('gif'), (ctx) => ctx.reply('👍'));

    telegramBot.hears('hi', (ctx) => ctx.reply('Hey there'));

    telegramBot.hears('gettickers', async (ctx) => {
      const tickers = await bybit.getTickers();
      console.log(JSON.stringify(tickers));
      ctx.reply('Hey there')
    });

    telegramBot.hears('/getactiveorders', (ctx) => {
      bybit.client
        .getActiveOrders({
            category: 'linear',
            // symbol: 'SUIUSDT',
            openOnly: 2,
            settleCoin: 'USDT',
            limit: 50
        })
        .then((response) => {
            console.log(JSON.stringify(response));
            // ctx.reply(JSON.stringify(response))
        })
        .catch((error) => {
            console.error(error);
        });

      ctx.reply('Hey there')
    });

    telegramBot.hears('/getpositioninfo', (ctx) => {
      bybit.client
        .getPositionInfo({
            category: 'linear',
            // symbol: 'SUIUSDT',
            settleCoin: 'USDT'
        })
        .then((response) => {
            console.log(JSON.stringify(response));
            // ctx.reply(JSON.stringify(response))
        })
        .catch((error) => {
            console.error(error);
        });

      ctx.reply('Hey there')
    });

    telegramBot.hears('/submitorder', (ctx) => {
      bybit.client
        .submitOrder({
          // category: 'spot',
          category: 'linear',
          symbol: 'SUIUSDT',
          side: 'Buy',
          orderType: 'Market',
          qty: '10', // USDT
          // price: '15600',
          positionIdx: 1, // required for linear // 0: one-way mode // 1: hedge-mode Buy side // 2: hedge-mode Sell side
          timeInForce: 'PostOnly',
          // orderLinkId: 'linear-test-postonly',
          // isLeverage: 0,
          // orderFilter: 'Order',
        })
        .then((response) => {
            console.log(JSON.stringify(response));
            // ctx.reply(JSON.stringify(response))
        })
        .catch((error) => {
            console.error(error);
        });

      ctx.reply('Hey there')
    });

    telegramBot.hears('/closeorder', (ctx) => {
      bybit.client
        .submitOrder({
          // category: 'spot',
          category: 'linear',
          symbol: 'SUIUSDT',
          side: 'Sell',
          orderType: 'Market',
          qty: '10', // USDT
          // price: '15600',
          positionIdx: 1, // required for linear // 0: one-way mode // 1: hedge-mode Buy side // 2: hedge-mode Sell side
          timeInForce: 'PostOnly',
          reduceOnly: true,
          // orderLinkId: 'linear-test-postonly',
          // isLeverage: 0,
          // orderFilter: 'Order',
        })
        .then((response) => {
            console.log(JSON.stringify(response));
            // ctx.reply(JSON.stringify(response))
        })
        .catch((error) => {
            console.error(error);
        });

      ctx.reply('Hey there')
    });

    // telegramBot.on(message('text'), ctx => {
    //     console.log(ctx.update.message.date, ctx.update.message.text)
    //     return ctx.reply(`Hello!`)
    // });

    ////////////////////////////////////////////////////////////////

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
      commands.push({
        command: `${skill.method.toLowerCase()}`,
        description: `${skill.title}`,
      })

      telegramBot.hears(`/${skill.method.toLowerCase()}`, async ctx => {
        console.log(ctx)
        let res = null
        try {
          let script = null
          // todo сейчас не получает новосозданные файлы со скриптом, продумать как их подтягивать
          try {
            script = await require(`../methods/${skill.method}`)
          } catch (e) {
            generateFile(`./src/methods`, `${skill.method}.js`, `module.exports = (reqParams, context) => {
    throw new Error('Method is not ready')
  }`);
            script = await require(`../methods/${skill.method}`)
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
        return ctx.reply(JSON.stringify(res))
      })
    }

    telegramBot.telegram.setMyCommands(commands);
}
  