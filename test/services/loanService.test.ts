import { expect } from 'chai';
import sinon from 'sinon';


import { Loan } from "../../src/models/loan";

import LoanService from "../../src/services/loanService"


import { 
    agilLoanByMember, 
    allLoans, 
    memberWithATypeLoan, 
    memberWithTwoLoans, 
    memberWithoutLoans,
    loansByMember,
    oldLoan,
    paymentHistoric,
    rowAndCountData,
    findAndCountAllLoans,
    findAndCountAllEmptyLoans
} from '../testData';
import { LoanTransaction } from '../../src/models/loan_transaction';
import logger from '../../src/services/loggerService';
import { NotFoundError } from '../../src/models/errors';



describe('LoanService', () => {

    let loanService: LoanService;

    const DEFAULT_FILTER_LOANS:any = {
        where:{},
        limit: 10,
        offset: (1 - 1) * 10,
        order: [
            ['created_at', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
      ],
    }

    const DEFAULT_FILTER_LOAN_HISTORIC:any = {
        where:{ 'loan_id':'test' },
        limit: 10,
        offset: (1 - 1) * 10,
        order: [
            ['date', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
      ],
    }
    
    beforeEach(() => {
        loanService = new LoanService();
    });
    
    it('should get loans with default configuration', async () => {

        const findAndCountAllStub = sinon.stub(Loan, 'findAndCountAll').resolves(findAndCountAllLoans);
        
        const response = await loanService.getLoans({page:NaN,per_page:NaN});
        
        expect(findAndCountAllStub.calledOnceWith(DEFAULT_FILTER_LOANS)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllLoans.rows)

        findAndCountAllStub.restore();
    });
    
    
    it('should throw an error when no Loans', async () => {
        
        const findAllStub = sinon.stub(Loan, 'findAndCountAll').resolves(findAndCountAllEmptyLoans);
        try {
            await loanService.getLoans({page:NaN,per_page:NaN});
        } catch (error) {
            if (error instanceof NotFoundError) {
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
            if (error instanceof NotFoundError) {
                expect(error.message).to.equal(`Loan with id test Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

        findByPkStub.restore();
    });

        
    it('should get loan historic by id with default pagination', async () => {
        const findAndCountAllStub = sinon.stub(LoanTransaction, 'findAndCountAll').resolves(rowAndCountData);
        
        const response = await loanService.getLoanHistoric('test',{page:NaN,per_page:NaN});

        expect(findAndCountAllStub.calledOnceWith(DEFAULT_FILTER_LOAN_HISTORIC)).to.be.true;
        expect(response.records).to.be.an('array')
        expect(response.total).to.equal(7)
        expect(response.page).to.equal(1)
        expect(response.per_page).to.equal(10)
        expect(response.total_pages).to.equal(1)
        expect(JSON.stringify(response.records)).to.eql(JSON.stringify(rowAndCountData.rows))

        findAndCountAllStub.restore();
    });
    
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
