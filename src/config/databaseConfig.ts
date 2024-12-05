import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config()

const DB_LOG_ENABLE = (process.env.ENABLE_LOG) || "false"

const db = new Sequelize({
	dialect: 'sqlite',
	logging: DB_LOG_ENABLE.toLowerCase() == 'true',
	define: {
		timestamps: false,
	  },
	storage: 'src/config/community_saver.db'
  });

export default db