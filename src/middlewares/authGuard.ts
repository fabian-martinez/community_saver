import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin/auth"
import firebaseApp from "../config/firebaseConfig"
import { BadRequestError, NotFoundError, Unauthorized } from "../helpers/errors"
import logger from "../helpers/loggerService"


const authenticate = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const idToken = req.header('Authorization')
        if (idToken === undefined) {
            logger.debug(idToken)
            throw new Unauthorized("Invalid token");
        }
        const isLoged = await admin.getAuth(firebaseApp).verifyIdToken(idToken)
        next()
    } catch (error) {
        if (error instanceof BadRequestError) {
                res.status(error.code).json({ error: error.message });
            } else if (error instanceof NotFoundError) {
                res.status(error.code).json({ error: error.message });
            } else if (error instanceof Unauthorized){
                res.status(error.code).json({ error: error.message });
            } else {
            logger.error(error)
            res.status(401).json({ error: 'Error Authenticating' });
            }
    }
}


export default authenticate;