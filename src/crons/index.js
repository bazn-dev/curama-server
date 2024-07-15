const { CronJob } = require('cron')
const telegramBot = require('../plugins/telegram')

const job = new CronJob(
	'* * * * * *', // cronTime
	function () {
		console.log('You will see this message every second');
        telegramBot.telegram.sendMessage(process.env.TELEGRAM_BOT_CHAT_ID, 'Hello')
	}, // onTick
	null, // onComplete
);

module.exports = job