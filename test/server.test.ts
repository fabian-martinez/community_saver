// test/app.test.ts
import request from 'supertest';
import dotenv from 'dotenv';
import Server from '../src/config/serverConfig'; // Asegúrate de que la ruta sea correcta
import { expect } from 'chai';

dotenv.config()
let server:Server

before(async() => {
    server = new Server()
    // await server.dbConnection()
    await server.start(); // Inicia el servidor antes de las pruebas
});

after(async() => {
    await server.stop()
})

describe('API Tests', () => {

    it('should list loans', async () => {
        const response = await request(server.getApp())
          .get('/api/v1/loans');
    
          expect(response.status).equal(200);
      });

});
