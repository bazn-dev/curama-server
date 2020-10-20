const moment = require('moment');
const telegramBot = require('../../../../loaders/telegram');

module.exports = (req, res, next) => {
  telegramBot.telegram.sendMessage(
    289730027,
    `${moment().format('DD/MM/YYYY HH:mm:ss')} - New feedback\n
    Name: ${req.body.name}\n
    Company: ${req.body.company}\n
    Email: ${req.body.email}\n
    Message: ${req.body.message}`
  );

  res.send({
    status: 1
  });
};
