import { Request, RequestParamHandler, Response } from "express";
import LoanService from '../services/loanService';
import logger from "../helpers/loggerService";
import { BadRequestError, NotFoundError } from "../helpers/errors";
import { validateFilter } from "../helpers/utilities";

class LoanController{

    private loanService:LoanService

    constructor(loanService:LoanService){
        this.loanService = loanService
    }

    public getLoans = async (req:Request, res:Response):Promise<void> => {
        try {
            const page:number =  Number(req.query.page);
            const per_page:number = Number(req.query.per_page);
            const filter = validateFilter(req.query.filter);
            const loans = await this.loanService.getLoans({page,per_page},filter)
            res.status(200).json(loans)
        } catch (error) {
            if (error instanceof BadRequestError) {
                logger.error(error)
                res.status(error.code).json({ error: error.message });
              } else if (error instanceof NotFoundError) {
                res.status(error.code).json({ error: error.message });
              } else {
                logger.error(error)
                res.status(500).json({ error: 'Internal Server Error' });
              }
        }
    }
    public getLoan = async (req:Request, res:Response):Promise<void> => {
        try {
            const loanId:string = req.params.id
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
    public getLoanTransactions =async (req:Request, res:Response) => {
        try {
            const loan_id:string = req.params.id
            const page:number = Number(req.query?.page)
            const per_page:number = Number(req.query?.per_page)
            const sort_by:string|undefined = (!req.query?.sort)?undefined:String(req.query?.sort)
            const response = await this.loanService.getLoanTransactions(loan_id,{page,per_page},sort_by);
            res.status(200).json(response)
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
