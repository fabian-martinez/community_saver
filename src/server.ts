import dotenv from 'dotenv';
import Server from './config/serverConfig';
import logger from './helpers/loggerService';

dotenv.config()

try {
    const server = new Server()
    server.start()
} catch (error) {
    logger.error(error)
}
