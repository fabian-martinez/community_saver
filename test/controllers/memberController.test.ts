import { expect } from "chai";
import sinon, { SinonStub } from "sinon";

import { NotFoundError } from "../../src/helpers/errors";
import { Request, Response } from "express";

import { allMembers, oldMember } from '../testData';
import MemberService from "../../src/services/memberService";
import MemberController from "../../src/controllers/memberController";

describe('Memeber Controller', () => {

    let memberController: MemberController;
    let memberService: MemberService;
    let getMembersStub:SinonStub;
    let getMemberStub:SinonStub;

    beforeEach(() => {
        // Inicializar el controlador y el servicio antes de cada prueba
        memberService = new MemberService();
        memberController = new MemberController(memberService);
        // Inicializar Stubs
        getMembersStub = sinon.stub(memberService,'getMembers')
        getMemberStub = sinon.stub(memberService,'getMember')
    });

    afterEach(() => {
        getMembersStub.restore();
        getMemberStub.restore();
    })

    it('should call to Members service to get all members', async () => {

        getMembersStub.resolves(allMembers)

        const req = { query: {} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(allMembers);
            },
        };
        
        await memberController.getMembers(req as Request,res as Response)

        expect(getMembersStub.calledOnceWith({page:NaN,per_page:NaN})).to.be.true
    });

    it('should call to Members service to get members with page', async () => {

        getMembersStub.resolves(allMembers)

        const req = { query: { "page":5 } }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(allMembers);
            },
        };
        
        await memberController.getMembers(req as unknown as Request,res as Response)

        expect(getMembersStub.calledOnceWith({page:5,per_page:NaN})).to.be.true
    });

    it('should call to Members service to get members with per_page', async () => {

        getMembersStub.resolves(allMembers)

        const req = { query: { "per_page":5 } }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(allMembers);
            },
        };
        
        await memberController.getMembers(req as unknown as Request,res as Response)

        expect(getMembersStub.calledOnceWith({page:NaN,per_page:5})).to.be.true
    });
    it('should call to memberd service to get members with a filter', async () => {

        getMembersStub.resolves(allMembers)

        const req = { query: {"filter":"name:eq:Member Name"} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(allMembers);
            },
        };
        
        await memberController.getMembers(req as unknown as Request,res as Response)

        expect(getMembersStub.calledOnceWith(
            {page:NaN,per_page:NaN},
            [
                {attribute:"name",operation:"eq",value:"Member Name"}
            ]
            )).to.be.true
    });

    it('should call to member service to get members with some filters', async () => {

        getMembersStub.resolves(allMembers)

        const req = { query: {"filter":"name:eq:Member Name,created_at:gt:1684472400"} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(allMembers);
            },
        };
        
        await memberController.getMembers(req as unknown as Request,res as Response)

        expect(getMembersStub.calledOnceWith(
            {page:NaN,per_page:NaN},
            [
                {attribute:"name",operation:"eq",value:"Member Name"},
                {attribute:"created_at",operation:"gt",value:"1684472400"},
            ]
            )).to.be.true
    });

    it('should throw an error when get members with invalid filter', async () => {

        getMembersStub.resolves(allMembers)

        const req = { query: {"filter":"member_id:a8f6bb2c-64f2-4728-a110-575ee3e9fa28otrovalor"}}
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(400);
                return res;
            },
            json: (data: any) => {
                expect(data).to.be.eql({ error: 'Invalid Filter' });
            },
        };

        expect(getMembersStub.calledOnce).to.be.false

        
    });

    it('should throw an error when call to memberd service fail', async () => {

        getMembersStub.rejects( new Error("Error simulado"))

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

        await memberController.getMembers(req as unknown as Request,res as Response)
        
        expect(getMembersStub.calledOnce).to.be.true

        
    });

    it('should call to member service to get a member by id', async () => {
        getMemberStub.resolves(oldMember)

        const req = { params : { "id":"test"} }
        const res = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(200);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal(oldMember);
            },
        };

        await memberController.getMember(req as unknown as Request,res as Response)
        
        expect(getMemberStub.calledOnceWith('test')).to.be.true

    });

    it('should call to member service to get no member', async () => {
        getMemberStub.rejects(new NotFoundError("Error simulado"))

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

        await memberController.getMember(req as unknown as Request,res as Response)
        
        expect(getMemberStub.calledOnceWith('test')).to.be.true

        
    });
})