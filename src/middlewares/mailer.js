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

module.exports.sendMail = function(to, subject, text, html) {
  to = 'alexbazhyn@gmail.com';
  subject = 'Message from Node js';
  text = 'This message was sent from Node js server.';
  html = 'This <i>message</i> was sent from <strong>Node js</strong> server.';

  transporter.sendMail({
    from: '"Olga Bazhina" <info.bazn.dev@gmail.com',
    to,
    subject,
    text,
    html
  }).then(data => console.log(data));
};