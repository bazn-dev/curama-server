const moment = require('moment');
const LeadModel = require('../../../../../models/lead').model;

module.exports = (req, res, next) => {
    const lead = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company
    };

    LeadModel.findOneAndUpdate(req.params._id, lead, (error, updatedLead) => {
        if (error) next(error);

        console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - [${req.ip}] - Updated lead ` + req.body._id);

        res.send({
            status: 1
        });
    });
};