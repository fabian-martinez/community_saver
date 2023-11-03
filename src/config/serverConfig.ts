import express, { Application } from "express";
import loansRouter from '../routes/loans';
import membersRouter from '../routes/members';
import cors from 'cors';
import db from "./databaseConfig";
import { initModels } from "./initModels";
import logger from "../helpers/loggerService";

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
		this.app.use( express.static('public'))
	}

	routes() {
		this.app.use(this.apiPath.loans, loansRouter)
		this.app.use(this.apiPath.members, membersRouter)
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