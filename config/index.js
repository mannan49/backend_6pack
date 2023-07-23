const doetnv = require("dotenv");
doetnv.config();

const config = {
  PORT: process.env.PORT || 8080,
  DEV_MODE: process.env.DEV_MODE,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,
  SMPT_MAIL: process.env.SMPT_MAIL,
  SMPT_SERVICE: process.env.SMPT_SERVICE,
  SMPT_HOST: process.env.SMPT_HOST,
  SMPT_PORT: process.env.SMPT_PORT,
  SMPT_CLIENT_ID: process.env.SMPT_CLIENT_ID,
  SMPT_CLIENT_SECRET: process.env.SMPT_CLIENT_SECRET,
  SMPT_REFRESH_TOKEN: process.env.SMPT_REFRESH_TOKEN,
};

module.exports = config;
