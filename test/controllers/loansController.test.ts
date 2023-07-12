import { expect } from "chai";
import sinon from "sinon";

import LoanController from '../../src/controllers/loansController';
import { Request, Response } from "express";
import LoanService from "../../src/services/loanService";

import { allLoans, borrowerWithTwoLoans, loansByBorrower } from '../testData';

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

    it('should call to Loand service to get all loans of a borrower', async () => {

        const getLoansStub = sinon.stub(loanService,'getLoans').resolves(loansByBorrower)

        const req = { query: { "borrower_name" :'test'} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(loansByBorrower);
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

    it('should call to Loand service to get all loans of a type a borrower', async () => {

        const getLoansStub = sinon.stub(loanService,'getLoans').resolves(loansByBorrower)

        const req = { query: { "borrower_name":"test", "loan_type" :'TEST_TYPE'} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(loansByBorrower);
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
                expect(data).to.be.undefined;
            },
        };

        await loanController.getLoans(req as unknown as Request,res as Response)
        
        expect(getLoansStub.calledOnce).to.be.true

        getLoansStub.restore();
    });
});