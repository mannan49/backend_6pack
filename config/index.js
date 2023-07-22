const doetnv = require("dotenv");
doetnv.config();

const config = {
  PORT: process.env.PORT || 8080,
  DEV_MODE: process.env.DEV_MODE,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
