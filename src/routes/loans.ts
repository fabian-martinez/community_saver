import { Router } from 'express';
import LoanController from '../controllers/loansController';
import LoanService from '../services/loanService';
import logger from '../services/loggerService';

const router = Router();

const loanService = new LoanService()

const loanController:LoanController = new LoanController(loanService)

logger.debug(`Loan Controller Inicailizado ${loanController}`)

router.get ('/',                loanController.getLoans);
router.get ('/:id',             loanController.getLoan);
router.post('/',                loanController.postNewLoan)
router.put ('/:id/payment',     loanController.putPayment);
router.put ('/:id/disbursment', loanController.putDisburtment);

export default router