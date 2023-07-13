import { expect } from "chai";
import sinon from "sinon";

import LoanController from '../../src/controllers/loansController';
import { Request, Response } from "express";
import LoanService from "../../src/services/loanService";

import { allLoans, loansByMember, oldLoan, paymentHistoric } from '../testData';
import { NotFoundError } from "../../src/models/errors";

describe('Loan Controller', () => {

    let loanController: LoanController;
    let loanService: LoanService;

    beforeEach(() => {
        // Inicializar el controlador y el servicio antes de cada prueba
        loanService = new LoanService();
        loanController = new LoanController(loanService);
    });

    it('should call to Loand service to get all loans in server', async () => {

        const getLoansStub = sinon.stub(loanService,'getLoans').resolves(allLoans)

        const req = { query: {} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(allLoans);
            },
        };
        
        await loanController.getLoans(req as Request,res as Response)

        expect(getLoansStub.calledOnce).to.be.true

        getLoansStub.restore();
    });

    it('should call to Loand service to get all loans of a member', async () => {

        const getLoansStub = sinon.stub(loanService,'getLoans').resolves(loansByMember)

        const req = { query: { "member_name" :'test'} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(loansByMember);
            },
        };

        await loanController.getLoans(req as unknown as Request,res as Response)
        
        expect(getLoansStub.calledOnceWith('test')).to.be.true

        getLoansStub.restore();
    });

    it('should call to Loand service to get all loans of a type', async () => {

        const getLoansStub = sinon.stub(loanService,'getLoans').resolves(allLoans)

        const req = { query: { "loan_type" :'TEST_TYPE'} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(allLoans);
            },
        };

        await loanController.getLoans(req as unknown as Request,res as Response)
        
        expect(getLoansStub.calledOnceWith(undefined,'TEST_TYPE')).to.be.true

        getLoansStub.restore();
    });

    it('should call to Loand service to get all loans of a type a member', async () => {

        const getLoansStub = sinon.stub(loanService,'getLoans').resolves(loansByMember)

        const req = { query: { "member_name":"test", "loan_type" :'TEST_TYPE'} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(loansByMember);
            },
        };

        await loanController.getLoans(req as unknown as Request,res as Response)
        
        expect(getLoansStub.calledOnceWith('test','TEST_TYPE')).to.be.true

        getLoansStub.restore();
    });

    it('should call to Loand service get no Loan', async () => {
        const getLoansStub = sinon.stub(loanService,'getLoans').rejects(new NotFoundError("Error simulado"))

        const req = { query: { "member_name":"test", "loan_type" :'TEST_TYPE'} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(404);
                return res;
            },
            json: (data: any) => {
                expect(data).to.be.eql({ error: 'Error simulado' });
            },
        };

        await loanController.getLoans(req as unknown as Request,res as Response)
        
        expect(getLoansStub.calledOnceWith('test','TEST_TYPE')).to.be.true

        getLoansStub.restore();
    });

    it('should throw an error when call to Loand service fail', async () => {

        const getLoansStub = sinon.stub(loanService,'getLoans').rejects(new Error("Error simulado"))

        const req = { query: {} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(500);
                return res;
            },
            json: (data: any) => {
                expect(data).to.be.eql({ error: 'Internal Server Error' });
            },
        };

        await loanController.getLoans(req as unknown as Request,res as Response)
        
        expect(getLoansStub.calledOnce).to.be.true

        getLoansStub.restore();
    });

    it('should call to Loan service to get a loan by id', async () => {
        const getLoanStub = sinon.stub(loanService,'getLoan').resolves(oldLoan)

        const req = { params : { "id":"test"} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(oldLoan);
            },
        };

        await loanController.getLoan(req as unknown as Request,res as Response)
        
        expect(getLoanStub.calledOnceWith('test')).to.be.true

        getLoanStub.restore();
    });

    it('should call to Loan service to get no loan', async () => {
        const getLoansStub = sinon.stub(loanService,'getLoan').rejects(new NotFoundError("Error simulado"))

        const req = { params : { "id":"test"} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(404);
                return res;
            },
            json: (data: any) => {
                expect(data).to.be.eql({ error: 'Error simulado' });
            },
        };

        await loanController.getLoan(req as unknown as Request,res as Response)
        
        expect(getLoansStub.calledOnceWith('test')).to.be.true

        getLoansStub.restore();
    });

    it('should call to Loan service to get loan historic', async () => {
        const getLoanStub = sinon.stub(loanService,'getLoanHistoric').resolves(paymentHistoric)

        const req = { params : { "id":"test"}, query: {page:5, per_page:10} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(oldLoan);
            },
        };

        await loanController.getLoan(req as unknown as Request,res as Response)
        
        expect(getLoanStub.calledOnceWith('test')).to.be.true

        getLoanStub.restore();    
    });

    it('should call to Loan service to get no loan', async () => {
        
    });
});