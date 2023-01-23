const path = require("path");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const uniGhanaFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const systemLogger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(label({ label: "uni-ghana" }), timestamp(), uniGhanaFormat),
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
    new transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
      format: format.combine(format.json()),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
  exitOnError: true,
});

const appLogger = createLogger({
  format: combine(label({ label: "uni-ghana" }), timestamp(), uniGhanaFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "../logs/app.log"),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
  exitOnError: true,
});

module.exports = {
  systemLogger,
  appLogger,
};
