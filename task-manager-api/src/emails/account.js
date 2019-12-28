const sgMail = require("@sendgrid/mail");
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ksmuthuus@gmail.com",
    subject: "Welcome to TaskApp",
    text: `Hello ${name}, Thanks for signing-up...`
  });
};

const sendSeeYouEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ksmuthuus@gmail.com",
    subject: "Task Manager -Thanks for using our app",
    text: `Hello ${name}, Sorry to know you are leaving us.. Hope to see you back soon ...`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendSeeYouEmail
};
