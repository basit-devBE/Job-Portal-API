import winston from "winston";

var logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'errors.log' })
    ]
});

export default logger;
