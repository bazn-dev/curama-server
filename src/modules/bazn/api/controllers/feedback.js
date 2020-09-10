const moment = require('moment');
const telegramBot = require('../../../../loaders/telegramBot');

module.exports = (req, res, next) => {
  telegramBot.telegram.sendMessage(
    289730027,
    `{moment().format('DD/MM/YYYY HH:mm:ss')} - New feedback\n
    Name: ${req.body.name}\n
    Company: ${req.body.company}\n
    Email: ${req.body.email}\n
    Type of project: ${req.body.projectType}\n
    Value: ${req.body.value}\n
    Message: ${req.body.message}`
  );

  res.send({
    status: 1
  });
};