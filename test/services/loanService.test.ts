import { expect } from 'chai';
import sinon from 'sinon';

import { Loan } from "../../src/models/loan";
import { LoanPayment } from '../../src/models/loan_payment';
import { LoanDisbursement } from '../../src/models/loan_disbursement';
import { PaymentSchedule } from '../../src/models/payment_schedule';
import { Borrower } from '../../src/models/borrower';

import LoanService from "../../src/services/loanService"


import { 
    agilLoanByBorrower, 
    allLoans, 
    borrowerWithATypeLoan, 
    borrowerWithTwoLoans, 
    borrowerWithoutLoans,
    loansByBorrower,
    oldLoanWithPaymentsAndDisbursements,
    paymentHistoric
} from '../testData';



describe('LoanService', () => {

    let loanService: LoanService;
    
    beforeEach(() => {
        loanService = new LoanService();
    });
    
    it('should get all loans', async () => {

        const findAllStub = sinon.stub(Loan, 'findAll').resolves(allLoans);
        
        const response = await loanService.getLoans();
        
        expect(response).to.be.an('array')
        expect(response).have.lengthOf(2)
        expect(response).to.eql(allLoans)
        expect(findAllStub.calledOnce).to.be.true

        findAllStub.restore();
    });
    
    it('should get all loans to a borrower', async () => {

        const filterOptions = { where: {name:'Jhon Doe'}, include: { model: Loan, where: {} }};

        const findOneStub = sinon.stub(Borrower, 'findOne').resolves(borrowerWithTwoLoans);
        const loans = await loanService.getLoans('Jhon Doe');

        expect(findOneStub.calledOnceWith(filterOptions)).to.be.true;
        expect(loans).to.be.an('array')
        expect(JSON.stringify(loans)).to.eql(JSON.stringify(loansByBorrower))

        findOneStub.restore();
    });

    it('should get loans to a borrower and a type', async () => {
        const filterOptions = { where: {name:'Jhon Doe'}, include: { model: Loan, where: { loan_type: 'AGIL'} }};

        const findOneStub = sinon.stub(Borrower, 'findOne').resolves(borrowerWithATypeLoan);
        const loans = await loanService.getLoans('Jhon Doe','AGIL');

        expect(findOneStub.calledOnceWith(filterOptions)).to.be.true;
        expect(loans).to.be.an('array')
        expect(JSON.stringify(loans)).to.eql(JSON.stringify(agilLoanByBorrower))

        findOneStub.restore();
    });

    it('should throw an error when Borrower not found', async () => {
        
        const findOneStub = sinon.stub(Borrower, 'findOne').resolves(null);
        try {
            await loanService.getLoans('Jhon Doe');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).to.equal(`Borrower Jhon Doe Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

        findOneStub.restore();
    });
    
    it('should throw an error when Loan type not found to a borrower', async () => {
        
        const findOneStub = sinon.stub(Borrower, 'findOne').resolves(borrowerWithoutLoans);
        try {
            await loanService.getLoans('Jhon Doe','AGILE');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).to.equal(`Loan type AGILE Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

        findOneStub.restore();
    });
    
    it('should throw an error when no a Loan type', async () => {
        
        const findAllStub = sinon.stub(Loan, 'findAll').resolves(undefined);
        try {
            await loanService.getLoans(undefined,'AGILE');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).to.equal(`Loan Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

        findAllStub.restore();
    });
    
    it('should throw an error when no Loans', async () => {
        
        const findAllStub = sinon.stub(Loan, 'findAll').resolves(undefined);
        try {
            await loanService.getLoans();
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).to.equal(`Loan Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

        findAllStub.restore();
    });
    
    // it('should get payment schedule when the loan start', async () => {

    // });
    
    // it('should get payment schedule when the loan is in the half', async () => {
        
    // });
    
    // it('should get payment schedule when the loan has extra payments', async () => {
        
    // });
    
    // it('should get Loan with payment historics', async () => {
    //     const findByPkLoanStub = sinon.stub(Loan, 'findByPk').resolves(oldLoanWithPaymentsAndDisbursements);
    //     const includeOption = {include:[{model:LoanPayment},{model:LoanDisbursement}]};

    //     const paymentScheduleToOldLoan:PaymentSchedule = await loanService.getLoan('e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f');

    //     expect(findByPkLoanStub.calledOnceWith('e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f',includeOption))
    //     expect(JSON.stringify(paymentScheduleToOldLoan)).to.eql(JSON.stringify(paymentHistoric))
        
    //     findByPkLoanStub.restore();
    // });
    
    // it('should disburse a Loan', async () => {
        
    // });
    
    // it('should pay a Loan', async () => {
        
    // });

    // it('should create a new Loan', async () => {
        
    // });
        
});
