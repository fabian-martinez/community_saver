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
        
        const findOneStub = sinon.stub(Member, 'findOne').resolves(undefined);
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
    
    it('should throw an error when Loans type not found to a member', async () => {
        
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
    
    it('should throw an error when no a Loans type', async () => {
        
        const findAllStub = sinon.stub(Loan, 'findAll').resolves([]);
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
        
        const findAllStub = sinon.stub(Loan, 'findAll').resolves([]);
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

    it('should get loan by id', async () => {
        
        const findByPkStub = sinon.stub(Loan, 'findByPk').resolves(oldLoan);
        
        const loan:Loan = await loanService.getLoan('test');
    

        expect(findByPkStub.calledOnceWith('test')).to.be.true;
        expect(JSON.stringify(oldLoan)).to.eql(JSON.stringify(loan))

        findByPkStub.restore();
    });

    it('should get loan by id no loan', async () => {
        const findByPkStub = sinon.stub(Loan, 'findByPk').resolves(undefined);
        
        try {
            await loanService.getLoan('test');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).to.equal(`Loan with id test Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

        findByPkStub.restore();
    });
    
    // it('should get payment schedule when the loan start', async () => {

    // });
    
    // it('should get payment schedule when the loan is in the half', async () => {
        
    // });
    
    // it('should get payment schedule when the loan has extra payments', async () => {
        
    // });
    
    // it('should disburce a Loan', async () => {
        
    // });
    
    // it('should pay a Loan', async () => {
        
    // });

    // it('should create a new Loan', async () => {
        
    // });
        
});
