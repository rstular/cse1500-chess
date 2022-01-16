const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        format.colorize(),
        format.prettyPrint(),
        label({ label: "chess-server" }),
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console({
            level: "debug",
        }),
    ],
});

module.exports = logger;
