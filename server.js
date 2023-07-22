const express = require("express");
const { PORT } = require("./config");
const colors = require("colors");
const connectDB = require("./config/connectDB");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middlewares/error");
const morgan = require("morgan");
app = express();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// database configuration
connectDB();
// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/products", productRoute);

// Middleware for error
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`.bgCyan.white);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandeled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
