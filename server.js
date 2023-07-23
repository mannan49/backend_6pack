const express = require("express");
const { PORT } = require("./config");
const colors = require("colors");
const connectDB = require("./config/connectDB");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());
app.use(morgan("dev"));

// routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");
app.use("/api/v1/products", productRoute);
app.use("/api/v1/user", userRoute);

// Middleware for error
const errorMiddleware = require("./middlewares/error");
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
