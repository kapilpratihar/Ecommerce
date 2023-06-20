const nodeMailer = require("nodemailer");
const { google } = require("googleapis");

// // These id's and secrets should come from .env file.
const CLIENT_ID =
  "923137176799-t1s2pbevjsbq8g8rnq0uf8bt6nfbfbe8.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04B7G4NX7wdKvCgYIARAAGAQSNwF-L9IrjIS8uDabyF8ZNYY0BVT1fnEZAPL9O6fkch0NWD5Rl8J4EyI-c_5yw7t8TVKOGyAZi9c";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// async function sendMail() {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: 'yours authorised email address',
//         clientId: CLIENT_ID,
//         clientSecret: CLEINT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     const mailOptions = {
//       from: 'kapil <kap13pratihar@gmail.com>',
//       to: 'to email address here',
//       subject: 'Hello from gmail using API',
//       text: 'Hello from gmail email using API',
//       html: '<h1>Hello from gmail email using API</h1>',
//     };

//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

// sendMail()
//   .then((result) => console.log('Email sent...', result))
//   .catch((error) => console.log(error.message));

// const nodeMailer = require("nodemailer");

// without google api

const sendEmail = async (options) => {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodeMailer.createTransport({
    //     // host: process.env.SMPT_HOST,
    //     // port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      type: "OAuth2",
      user: process.env.SMPT_MAIL,
      clientId: CLIENT_ID,
      clientSecret: CLEINT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,

      //       user: process.env.SMPT_MAIL,
      //       pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
};

module.exports = sendEmail;
