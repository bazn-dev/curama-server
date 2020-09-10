const fs = require('fs');
const moment = require('moment');

module.exports.log = function () {
  const dateTime = moment().format('DD.MM.YYYY HH:mm:ss');
  const {ip, userAction} = data;

  fs.appendFile('log.txt', `${dateTime} - ${ip}: ${userAction}\n`, error => {
    if (error) {
      return console.error(error);
    }
  });

  console.log(`${dateTime} - ${ip}: ${userAction}`);
};
