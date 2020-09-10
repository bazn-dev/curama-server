const express = require('express');
const bodyParser = require('body-parser');
//const api = require('../api');
const baznAPI = require('../modules/bazn/api');

module.exports.expressLoader = async function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

  app.get('/', (req, res) => {
    res.status(200).send("Hello! I'm CURAMA!)");
  });

  //Health check endpoints
  app.get('/status', (req, res) => {
    res.status(200).send('Server is running').end();
  });
  app.head('/status', (req, res) => {
    res.status(200).send('Server is running').end();
  });

  app.enable('trust proxy');

  //app.use('/', api.routes);
  app.use('/bazn', baznAPI.routes);

  //Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const error = new Error('Not Found');
    error['status'] = 404;
    next(error);
  });

  //error handlers
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
