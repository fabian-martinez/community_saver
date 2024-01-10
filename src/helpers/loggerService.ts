import dotenv from 'dotenv';
import winston, { Logger, format } from 'winston';
const { combine, timestamp, errors,  printf, } = format;

dotenv.config()
const LOGGING_LEVEL = process.env.LOGGING_LEVEL || 'info'

const logger: Logger = winston.createLogger({
  level: LOGGING_LEVEL.toLowerCase(),
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} [${level.toUpperCase()}] : ${message} ${(stack)?stack:""}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

export default logger;
