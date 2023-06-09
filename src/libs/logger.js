const log = require('cllc')();
const fs = require('fs');

function addLogToFile (str) {
  fs.appendFile('log.txt', `${str}\n`, error => {
    if (error) return log.error(error);
  });
}

module.exports.debug = str => {
  log.debug(str);
  addLogToFile(str);
};

module.exports.info = str => {
  log.info(str);
  addLogToFile(str);
};

module.exports.warn = str => {
  log.warn(str);
addLogToFile(str);
};

module.exports.error = str => {
  log.error(str);
  addLogToFile(str);
};