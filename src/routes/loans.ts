import { Router } from 'express';
import { getLoans, getLoansByBorrower, getLoan, postNewLoan, putPayment, putDisburtment } from '../controllers/loansController';

const router = Router();

router.get ('/',                getLoans );
router.get ('/:id',             getLoan);
router.post('/',                postNewLoan)
router.put ('/:id/payment',     putPayment);
router.put ('/:id/disbursment', putDisburtment);

export default router