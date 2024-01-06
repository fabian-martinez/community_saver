import express, { Application } from "express";
import loansRouter from '../routes/loans';
import membersRouter from '../routes/members';
import cors from 'cors';
import db from "./databaseConfig";
import { initModels } from "./initModels";
import logger from "../helpers/loggerService";
import authenticate from "../middlewares/authGuard";
import path from "path"

class Server {

	private app:Application
	private port:string
	private apiPath = {
		loans: '/api/v1/loans',
		members: '/api/v1/members'
	}
	private server:any

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '8000';
		
		// Init methods
		this.middelwares();
		this.routes();


	}

	public getApp(): Application {
		return this.app;
	  }

	async dbConnection() {
		try {
			await db.authenticate();
			initModels(db)
			logger.info("Database Online");
		} catch (error) {
			throw new Error('Database conection error')
		}
	}

	middelwares() {

		//CORS
		this.app.use( cors() )

		//read body
		this.app.use( express.json() )

		//Public folder
		this.app.use( express.static(path.join(__dirname, '../public')))

	}
	
	routes() {
		//Portected URLs
		this.app.get(/^\/(?!api).*/, (req, res) => {
			res.sendFile(path.join(__dirname, '../public', 'index.html'));
		  });
		this.app.use('/api', authenticate)
		this.app.use(this.apiPath.members, membersRouter)
		this.app.use(this.apiPath.loans, loansRouter)
	}

	async start() {
		await this.dbConnection();
		this.server =  this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
	
	async stop() {
		if (this.server) {
			this.server.close(() => {
			console.log('Server has been stopped.');
			});
		}
	}
	
}



export default Server;