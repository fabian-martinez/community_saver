class MemberService {

    public async getMember(member_id:string):Promise<any>{}

    public async getMembers(paginarion:{page:Number,per_page:Number},filter:any[]):Promise<any>{}

}

export default MemberService