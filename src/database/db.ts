import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config()

const DB_NAME = process.env.DB_NAME || 'DB_NAME'
const DB_USER = process.env.DB_USER || 'DB_USER'
const DB_PASS = process.env.DB_PASS || 'DB_PASS'
const DB_HOST = process.env.DB_HOST || 'DB_HOST'

const db = new Sequelize( 
	DB_NAME, 
	DB_USER, 
	DB_PASS,
	{
		host: DB_HOST,
		dialect: 'postgres',
		//logging: false
		define: {
			timestamps: false
		}
	},
); 

export default db