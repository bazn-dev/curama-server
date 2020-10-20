const moment = require('moment');
const LeadModel = require('../../../../../models/Lead').model;
const telegramLog = require('../../middleware/telegramLog');

module.exports = (req, res, next) => {
    const lead = new LeadModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company
    });

    lead.save(error => {
        if (error) next(error);

        console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - [${req.ip}] - Added lead`);
        telegramLog.telegram.sendMessage(289730027, `${moment().format('DD/MM/YYYY HH:mm:ss')} - Added lead`);

        res.send({
            status: 1
        });
    });
};