const moment = require('moment');
const LeadModel = require('../../../../../models/lead').model;

module.exports = (req, res, next) => {
    LeadModel.find({}, (error, leads) => {
        if (error) next(error);

        console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - [${req.ip}] - Got leads`);

        res.send(leads);
    });
};