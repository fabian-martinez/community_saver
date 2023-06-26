import express, { Application } from "express";
import loansRouter from '../routes/loans';
import cors from 'cors';
import db from "../database/db";
import { initModels } from "./initModels";
import { Sequelize } from "sequelize";

class Server {

	private app:Application
	private port:string
	private apiPath = {
		loan: '/api/loan'
	}

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '8000';
		
		// Init methods
		this.dbConnection();

		this.middelwares();
		this.routes();
	}

	async dbConnection() {
		try {
			await db.authenticate();
			initModels(db)
			console.log("Database Online");
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
		this.app.use(this.apiPath.loan, loansRouter)
	}

	listen(){
		this.app.listen( this.port, () => {
			console.log('Servidor funcionando en puerto: ' + this.port);
		})
	}
}



export default Server;