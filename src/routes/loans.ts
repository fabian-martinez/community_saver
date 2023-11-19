import { Router } from 'express';
import LoanController from '../controllers/loanController';
import LoanService from '../services/loanService';
import logger from '../helpers/loggerService';

const router = Router();

const loanService = new LoanService()

const loanController:LoanController = new LoanController(loanService)

logger.debug(`Starting Loan Service`)

router.get    ('/',                loanController.getLoans);
router.get    ('/:id',             loanController.getLoan);
router.get    ('/:id/transactions',    loanController.getLoanTransactions);
router.post   ('/',                loanController.postNewLoan)
router.put    ('/:id/payment',     loanController.putPayment);
router.put    ('/:id/disbursement',loanController.putDisburtsement);

export default router