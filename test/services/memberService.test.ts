import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';



import { 
    DEFAULT_FILTER_MEMBERS, 
    FILTER_MEMBERS_EQ, 
    WITH_PAGE_FILTER_MEMBERS, 
    WITH_PER_PAGE_FILTER_MEMBERS, 
    findAndCountAllEmpty, 
    findAndCountAllMembers,
    oldMember } from '../testData';
import { NotFoundError } from '../../src/helpers/errors';
import MemberService from '../../src/services/memberService';
import { Member } from '../../src/models/member';



describe('MemberService', () => {

    let memberService: MemberService;
    
    // Define Stubs
    let findMembersAndCountAllStub:SinonStub
    let findMemberByPkStub:SinonStub

    beforeEach(() => {
        memberService = new MemberService();

        //Inicialize Stubs
        findMembersAndCountAllStub = sinon.stub(Member, 'findAndCountAll');
        findMemberByPkStub = sinon.stub(Member, 'findByPk');
    });

    afterEach(() => {
        // Clean Stubs
        findMembersAndCountAllStub.restore();
        findMemberByPkStub.restore();
    })

    
    it('should get members with default configuration', async () => {

        findMembersAndCountAllStub.resolves(findAndCountAllMembers);
        
        const response = await memberService.getMembers({page:NaN,per_page:NaN});
        
        expect(findMembersAndCountAllStub.calledOnceWith(DEFAULT_FILTER_MEMBERS)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllMembers.rows)

    });

    it('should get members with page', async () => {

        findMembersAndCountAllStub.resolves(findAndCountAllMembers);
        
        const response = await memberService.getMembers({page:2,per_page:NaN});
        
        expect(findMembersAndCountAllStub.calledOnceWith(WITH_PAGE_FILTER_MEMBERS)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllMembers.rows)

    });

    it('should get members with per_page', async () => {

        findMembersAndCountAllStub.resolves(findAndCountAllMembers);
        
        const response = await memberService.getMembers({page:NaN,per_page:7});
        
        expect(findMembersAndCountAllStub.calledOnceWith(WITH_PER_PAGE_FILTER_MEMBERS)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllMembers.rows)

    });

    it('should get members with a eq filter', async () => {

        findMembersAndCountAllStub.resolves(findAndCountAllMembers);
        
        const response = await memberService.getMembers(
                {page:NaN,per_page:NaN},
                [{attribute:"name",operation:"eq",value:"Member Name"}]
            );
        
        expect(findMembersAndCountAllStub.calledOnceWith(FILTER_MEMBERS_EQ)).to.be.true
        expect(response.items).to.be.an('array')
        expect(response.items).have.lengthOf(10)
        expect(response.items).to.eql(findAndCountAllMembers.rows)

    });

    it('should throw an error when no Members', async () => {
        
        findMembersAndCountAllStub.resolves(findAndCountAllEmpty);
        try {
            await memberService.getMembers({page:NaN,per_page:NaN});
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).to.equal(`Member Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

    });

    it('should get member by id', async () => {
        
        findMemberByPkStub.resolves(oldMember);
        
        const member:Member = await memberService.getMember('test');
    

        expect(findMemberByPkStub.calledOnceWith('test')).to.be.true;
        expect(JSON.stringify(member)).to.eql(JSON.stringify(member))

    });

    it('should get member by id no member', async () => {
        findMemberByPkStub.resolves(undefined);
        
        try {
            await memberService.getMember('test');
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).to.equal(`Member with id test Not Found`)
            }else{
                console.error('Unexpected error', error)
            }
        }

    });    
        
});
