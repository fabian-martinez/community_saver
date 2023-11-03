import winston, { Logger, format } from 'winston';
const { combine, timestamp, errors,  printf, } = format;

const logger: Logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: false }),
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
