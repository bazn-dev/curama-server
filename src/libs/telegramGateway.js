const {Telegraf, Markup} = require('telegraf');
const {message} = require('telegraf/filters');
const bot = new Telegraf('825767029:AAGcZ0HtesV-W_1PgZeYqXSZaCRKqH14NCo');

const ByBit = require('../plugins/bybit');

bot.launch();

module.exports.connect = async () => {
	const bybit = new ByBit();
	
	bot.start(async (ctx) => {
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
	bot.telegram.setMyCommands(commands);
  
  bot.help((ctx) => ctx.reply('Send me a sticker'));
  
  bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
  
  bot.on(message('gif'), (ctx) => ctx.reply('👍'));
  
  bot.hears('hi', (ctx) => ctx.reply('Hey there'));
  
  bot.hears('gettickers', async (ctx) => {
		const tickers = await bybit.getTickers();
		console.log(JSON.stringify(tickers));
		ctx.reply('Hey there')
	});
  
  bot.hears('/getactiveorders', (ctx) => {
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
  
  bot.hears('/getpositioninfo', (ctx) => {
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
  
  bot.hears('/submitorder', (ctx) => {
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
  
  bot.hears('/closeorder', (ctx) => {
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
	
	// bot.on(message('text'), ctx => {
	//     console.log(ctx.update.message.date, ctx.update.message.text)
	//     return ctx.reply(`Hello!`)
	// });
}
