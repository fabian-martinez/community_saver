import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import dotenv from 'dotenv';
import path from 'path'

dotenv.config()


const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS || 'GOOGLE_APPLICATION_CREDENTIALS'

const serviceAccount = require(path.join(__dirname,GOOGLE_APPLICATION_CREDENTIALS))

const firebaseApp = initializeApp({
    credential: credential.cert(serviceAccount)
});

export default firebaseApp