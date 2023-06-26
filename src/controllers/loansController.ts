import { Request, Response } from "express";
import LoanService from '../services/loanService';
import logger from "../services/loggerService";

const loanService = new LoanService();

export const getLoans = async (req:Request, res:Response) => {
    try {
        console.log('Obteniendo Loan');
        console.log(req.query);
        const borrowerName = req.query.borrower?.toString();
        const loanType = req.query.type?.toString();
        const loans = await loanService.getLoans(borrowerName,loanType)
        res.json(loans)
    } catch (error) {
        logger.error(error)
        res.status(500).json();
    }
}
export const getLoansByBorrower =async (req:Request, res:Response) => {
    res.json("Por implementar")
}
export const getLoan =async (req:Request, res:Response) => {
    
}
export const postNewLoan =async (req:Request, res:Response) => {
    
}
export const putPayment =async (req:Request, res:Response) => {
    
}
export const putDisburtment =async (req:Request, res:Response) => {
    
}

