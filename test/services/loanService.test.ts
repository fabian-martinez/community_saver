import { expect } from 'chai';
import sinon from 'sinon';

import { Loan } from "../../src/models/loan";
import { Member } from '../../src/models/member';

import LoanService from "../../src/services/loanService"


import { 
    agilLoanByMember, 
    allLoans, 
    memberWithATypeLoan, 
    memberWithTwoLoans, 
    memberWithoutLoans,
    loansByMember,
    oldLoan
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
    
    it('should get all loans to a member', async () => {

        const filterOptions = { where: {name:'Jhon Doe'}, include: { model: Loan, where: {} }};

        const findOneStub = sinon.stub(Member, 'findOne').resolves(memberWithTwoLoans);
        const loans = await loanService.getLoans('Jhon Doe');

        expect(findOneStub.calledOnceWith(filterOptions)).to.be.true;
        expect(loans).to.be.an('array')
        expect(JSON.stringify(loans)).to.eql(JSON.stringify(loansByMember))

        findOneStub.restore();
    });

    it('should get loans to a member and a type', async () => {
        const filterOptions = { where: {name:'Jhon Doe'}, include: { model: Loan, where: { loan_type: 'AGIL'} }};

        const findOneStub = sinon.stub(Member, 'findOne').resolves(memberWithATypeLoan);
        const loans = await loanService.getLoans('Jhon Doe','AGIL');

        expect(findOneStub.calledOnceWith(filterOptions)).to.be.true;
        expect(loans).to.be.an('array')
        expect(JSON.stringify(loans)).to.eql(JSON.stringify(agilLoanByMember))

        findOneStub.restore();
    });

    it('should throw an error when Member not found', async () => {
        
        const findOneStub = sinon.stub(Member, 'findOne').resolves(null);
        try {
            await loanService.getLoans('Jhon Doe');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).to.equal(`Member Jhon Doe Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

        findOneStub.restore();
    });
    
    it('should throw an error when Loan type not found to a member', async () => {
        
        const findOneStub = sinon.stub(Member, 'findOne').resolves(memberWithoutLoans);
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

    it('should ge loan by id', async () => {
        
        const findByPkStub = sinon.stub(Loan, 'findByPk').resolves(oldLoan);
        
        const loan:Loan = await loanService.getLoan('test');
    

        expect(findByPkStub.calledOnceWith('test')).to.be.true;
        expect(JSON.stringify(oldLoan)).to.eql(JSON.stringify(loan))

        findByPkStub.restore();
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
