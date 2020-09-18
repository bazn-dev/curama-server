const nodemailer = require('nodemailer');

let testAccount = nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info.bazn.dev@gmail.com',
    pass: '9789355qw'
  }
});

module.exports.sendMail = function(to, subject, html) {
  transporter.sendMail({
    from: '"Olga Bazhina" <info.bazn.dev@gmail.com',
    to,
    subject,
    text: '',
    html
  })
    .then(data => console.log(data))
    .catch(error => console.log(error));
};