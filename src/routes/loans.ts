import { Router } from 'express';
import LoanController from '../controllers/loansController';
import LoanService from '../services/loanService';
import logger from '../services/loggerService';

const router = Router();

const loanService = new LoanService()

const loanController:LoanController = new LoanController(loanService)

logger.debug(`Loan Controller Inicailizado ${loanController}`)

router.get    ('/',                loanController.getLoans);
router.get    ('/:id',             loanController.getLoan);
router.get    ('/:id/historic',    loanController.getLoanHistoric);
router.post   ('/',                loanController.postNewLoan)
router.put    ('/:id/payment',     loanController.putPayment);
router.put    ('/:id/disbursement',loanController.putDisburtsement);

export default router