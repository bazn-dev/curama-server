const moment = require('moment');
const LeadModel = require('../../../../../models/lead').model;

module.exports = (req, res, next) => {
    LeadModel.findOne({ _id: req.params.id }, (error, lead) => {
        if (error) next(error);

        console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - [${req.ip}] - Got lead by ` + req.params.id);

        res.send(lead);
    });
};