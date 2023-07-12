import { Request, Response } from "express";
import LoanService from '../services/loanService';
import logger from "../services/loggerService";
import { BadRequestError, NotFoundError } from "../models/errors";

class LoanController{

    private loanService:LoanService

    constructor(loanService:LoanService){
        this.loanService = loanService
    }

    public getLoans = async (req:Request, res:Response):Promise<void> => {
        try {
            const borrowerName = req.query.borrower_name?.toString();
            const loanType = req.query.loan_type?.toString();
            const loans = await this.loanService.getLoans(borrowerName,loanType)
            res.status(200).json(loans)
        } catch (error) {
            if (error instanceof BadRequestError) {
                res.status(error.code).json({ error: error.message });
              } else if (error instanceof NotFoundError) {
                res.status(error.code).json({ error: error.message });
              } else {
                res.status(500).json({ error: 'Internal Server Error' });
              }
        }
    }
    public getLoansByBorrower = async (req:Request, res:Response):Promise<void> => {
        res.json("Por implementar")
    }
    public getLoan = async (req:Request, res:Response):Promise<void> => {
        try {
            const loanId:string = req.params.id
            logger.info(loanId)
            const loan = await this.loanService.getLoan(loanId);
            res.status(200).json(loan)
        } catch (error) {
            if (error instanceof BadRequestError) {
                res.status(error.code).json({ error: error.message });
              } else if (error instanceof NotFoundError) {
                res.status(error.code).json({ error: error.message });
              } else {
                logger.error(error)
                res.status(500).json({ error: 'Internal Server Error' });
              }
        }
    }
    public postNewLoan = async (req:Request, res:Response):Promise<void> => {
        res.json("Por implementar")
    }
    public putPayment = async (req:Request, res:Response):Promise<void> => {
        res.json("Por implementar")
    }
    public putDisburtsement = async (req:Request, res:Response):Promise<void> => {
        res.json("Por implementar")
    }
}

export default LoanController
