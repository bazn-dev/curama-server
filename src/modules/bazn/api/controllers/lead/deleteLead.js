const moment = require('moment');
const LeadModel = require('../../../../../models/Lead').model;

module.exports = (req, res, next) => {

    LeadModel.deleteOne({ _id: req.params.id }).exec(error => {
        if (error) next(error);

        console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - [${req.ip}] - Deleted lead ` + req.params.id);

        res.send({
            status: 1
        });
    });
};