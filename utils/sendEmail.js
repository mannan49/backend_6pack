const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
  SMPT_MAIL,
  SMPT_SERVICE,
  SMPT_CLIENT_ID,
  SMPT_CLIENT_SECRET,
  SMPT_REFRESH_TOKEN,
} = require("../config");

const sendEmail = async (options) => {
  // Create an OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    SMPT_CLIENT_ID,
    SMPT_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URI (not used here, but required by googleapis library)
  );

  // Set the refresh token to obtain an access token
  oauth2Client.setCredentials({
    refresh_token: SMPT_REFRESH_TOKEN,
  });

  try {
    // Generate an access token
    const accessToken = await oauth2Client.getAccessToken();

    // Create the nodemailer transporter using OAuth2
    const transporter = nodemailer.createTransport({
      service: SMPT_SERVICE,
      auth: {
        type: "OAuth2",
        user: SMPT_MAIL,
        clientId: SMPT_CLIENT_ID,
        clientSecret: SMPT_CLIENT_SECRET,
        refreshToken: SMPT_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Mail options
    const mailOptions = {
      from: SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
