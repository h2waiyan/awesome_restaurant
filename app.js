const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/user_route");
const logger = require("./middlewares/logger");
const dotenv = require("dotenv");
const globalErrorHandler = require("./controllers/errorCtrl");
const AppError = require("./api_features/appError");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(logger.myLogger);

if (process.env.NODE_ENVIRONMENT == "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
