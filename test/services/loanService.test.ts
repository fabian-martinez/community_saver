import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';


import { Loan } from "../../src/models/loan";

import LoanService from "../../src/services/loanService"


import { 
    oldLoan,
    rowAndCountData,
    findAndCountAllLoans,
    findAndCountAllEmpty,
    DEFAULT_FILTER_LOANS,
    DEFAULT_FILTER_LOAN_HISTORIC,
    WITH_PAGE_FILTER_LOANS,
    WITH_PER_PAGE_FILTER_LOANS,
    FILTER_LOANS_EQ,
    FILTER_LOANS_GT,
    FILTER_LOANS_EQ_AND_GT
} from '../testData';
import { LoanTransaction } from '../../src/models/loan_transaction';
import { NotFoundError } from '../../src/helpers/errors';



describe('LoanService', () => {

    let loanService: LoanService;
    
    // Define Stubs
    let findLoansAndCountAllStub:SinonStub
    let findLoansTransactionsAndCountAllStub:SinonStub
    let findLoanHistoricByPkStub:SinonStub

    beforeEach(() => {
        loanService = new LoanService();

        //Inicialize Stubs
        findLoansAndCountAllStub = sinon.stub(Loan, 'findAndCountAll');
        findLoansTransactionsAndCountAllStub = sinon.stub(LoanTransaction, 'findAndCountAll');
        findLoanHistoricByPkStub = sinon.stub(Loan, 'findByPk');
    });

    afterEach(() => {
        // Clean Stubs
        findLoansAndCountAllStub.restore();
        findLoansTransactionsAndCountAllStub.restore();
        findLoanHistoricByPkStub.restore();
    })

    
    it('should get loans with default configuration', async () => {

        findLoansAndCountAllStub.resolves(findAndCountAllLoans);
        
        const response = await loanService.getLoans({page:NaN,per_page:NaN});
        
        expect(findLoansAndCountAllStub.calledOnceWith(DEFAULT_FILTER_LOANS)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllLoans.rows)

    });

    it('should get loans with page', async () => {

        findLoansAndCountAllStub.resolves(findAndCountAllLoans);
        
        const response = await loanService.getLoans({page:2,per_page:NaN});
        
        expect(findLoansAndCountAllStub.calledOnceWith(WITH_PAGE_FILTER_LOANS)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllLoans.rows)

    });

    it('should get loans with per_page', async () => {

        findLoansAndCountAllStub.resolves(findAndCountAllLoans);
        
        const response = await loanService.getLoans({page:NaN,per_page:7});
        
        expect(findLoansAndCountAllStub.calledOnceWith(WITH_PER_PAGE_FILTER_LOANS)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllLoans.rows)

    });

    it('should get loans with a eq filter', async () => {

        findLoansAndCountAllStub.resolves(findAndCountAllLoans);
        
        const response = await loanService.getLoans(
                {page:NaN,per_page:NaN},
                [{attribute:"member_id",operation:"eq",value:"a8f6bb2c-64f2-4728-a110-575ee3e9fa28"}]
            );
        
        expect(findLoansAndCountAllStub.calledOnceWith(FILTER_LOANS_EQ)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllLoans.rows)

    });

    it('should get loans with a gt filter', async () => {

        findLoansAndCountAllStub.resolves(findAndCountAllLoans);
        
        const response = await loanService.getLoans(
                {page:NaN,per_page:NaN},
                [{attribute:"created_at",operation:"gt",value:"1684472400"}]
            );
        
        expect(findLoansAndCountAllStub.calledOnceWith(FILTER_LOANS_GT)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllLoans.rows)

    });

    it('should get loans with a eq,gt filter', async () => {

        findLoansAndCountAllStub.resolves(findAndCountAllLoans);
        
        const response = await loanService.getLoans(
                {page:NaN,per_page:NaN},
                [
                    {attribute:"member_id",operation:"eq",value:"a8f6bb2c-64f2-4728-a110-575ee3e9fa28"},
                    {attribute:"created_at",operation:"gt",value:"1684472400"}
                ]
            );
        
        expect(findLoansAndCountAllStub.calledOnceWith(FILTER_LOANS_EQ_AND_GT)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllLoans.rows)

    });
    
    it('should throw an error when no Loans', async () => {
        
        findLoansAndCountAllStub.resolves(findAndCountAllEmpty);
        try {
            await loanService.getLoans({page:NaN,per_page:NaN});
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).to.equal(`Loan Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

    });

    it('should get loan by id', async () => {
        
        findLoanHistoricByPkStub.resolves(oldLoan);
        
        const loan:Loan = await loanService.getLoan('test');
    

        expect(findLoanHistoricByPkStub.calledOnceWith('test')).to.be.true;
        expect(JSON.stringify(oldLoan)).to.eql(JSON.stringify(loan))

    });

    it('should get loan by id no loan', async () => {
        findLoanHistoricByPkStub.resolves(undefined);
        
        try {
            await loanService.getLoan('test');
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).to.equal(`Loan with id test Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

    });

        
    it('should get loan historic by id with default pagination', async () => {
        findLoansTransactionsAndCountAllStub.resolves(rowAndCountData);
        
        const response = await loanService.getLoanTransactions('test',{page:NaN,per_page:NaN});

        expect(findLoansTransactionsAndCountAllStub.calledOnceWith(DEFAULT_FILTER_LOAN_HISTORIC)).to.be.true;
        expect(response.records).to.be.an('array')
        expect(response.total).to.equal(7)
        expect(response.page).to.equal(1)
        expect(response.per_page).to.equal(10)
        expect(response.total_pages).to.equal(1)
        expect(JSON.stringify(response.records)).to.eql(JSON.stringify(rowAndCountData.rows))

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
