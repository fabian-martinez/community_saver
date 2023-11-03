import dotenv from 'dotenv';
import Server from './models/server';
import logger from './services/loggerService';

dotenv.config()

try {
    const server = new Server()
    server.start()
} catch (error) {
    logger.error(error)
}
