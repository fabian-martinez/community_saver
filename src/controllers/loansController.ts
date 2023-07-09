import { Request, Response } from "express";
import LoanService from '../services/loanService';
import logger from "../services/loggerService";

class LoanController{

    private loanService:LoanService

    constructor(loanService:LoanService){
        this.loanService = loanService
    }

    public getLoans = async (req:Request, res:Response):Promise<void> => {
        try {
            const borrowerName = req.query.borrower?.toString();
            const loanType = req.query.type?.toString();
            const loans = await this.loanService.getLoans(borrowerName,loanType)
            res.status(200).json(loans)
        } catch (error) {
            logger.error(error)
            res.status(500).json();
        }
    }
    public async getLoansByBorrower(req:Request, res:Response) {
        res.json("Por implementar")
    }
    public async getLoan(req:Request, res:Response) {
        res.json("Por implementar")
    }
    public async postNewLoan(req:Request, res:Response) {
        
    }
    public async putPayment(req:Request, res:Response) {
        
    }
    public async putDisburtsement(req:Request, res:Response) {
        
    }
}

export default LoanController
