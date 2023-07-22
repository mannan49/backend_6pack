const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log(
    `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
  );
};

module.exports = connectDB;
