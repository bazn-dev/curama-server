const LeadModel = require('../models/Lead');

class Lead {
  constructor() {

  }

  get() {
    LeadModel.find({}, (error, leads) => {
      if (error) next(error);

      console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Got leads`);

      return leads;
    });
  }

  getById(id) {
    LeadModel.findOne({ _id: id }, (error, lead) => {
      if (error) next(error);

      console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Got company by ` + req.params.id);

      res.send(company);
    });
  }

  add() {
    const company = new CompanyModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      webSite: req.body.webSite,
      address: req.body.address,
      industry: req.body.industry,
      numberEmployees: req.body.numberEmployees,
      experience: req.body.experience
    });

    company.save(error => {
      if (error) next(error);

      console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Added company`);
      telegramLog.telegram.sendMessage(289730027, `${moment().format('DD/MM/YYYY HH:mm:ss')} - Added company`);

      res.send({
        status: 1
      });
    });
  }

  update() {
    const company = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      webSite: req.body.webSite,
      address: req.body.address,
      industry: req.body.industry,
      numberEmployees: req.body.numberEmployees,
      experience: req.body.experience
    };

    CompanyModel.findOneAndUpdate(req.params._id, company, (error, updatedCompany) => {
      if (error) next(error);

      console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Updated company ` + req.body._id);

      res.send({
        status: 1
      });
    });
  }

  remove() {
    CompanyModel.deleteOne({ _id: req.params.id }).exec(error => {
      if (error) next(error);

      console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Deleted company ` + req.params.id);

      res.send({
        status: 1
      });
    });
  }
}