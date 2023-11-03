import { DEFAULT_PAGINATION } from "../helpers/enums";
import { NotFoundError } from "../helpers/errors";
import { buildFilter } from "../helpers/utilities";
import { Member } from "../models/member";

class MemberService {

    public async getMember(member_id:string):Promise<any>{
        const loan = await Member.findByPk(member_id)


        if (!loan) {
            throw new NotFoundError(`Member with id ${member_id} Not Found`)
        }

        return loan;

    }

    public async getMembers(pagination:{page:number,per_page:number},filter?:any[]):Promise<any>{
        let whereClause: any = {};
        
        const page = (isNaN(pagination.page) || pagination.page < 1)?DEFAULT_PAGINATION.PAGE:pagination.page
        const per_page = (isNaN(pagination.per_page ) || pagination.per_page < 1)?DEFAULT_PAGINATION.PER_PAGE:pagination.per_page
        
        if(filter){
            whereClause = buildFilter(filter)
        }

        const rowAndCount = await Member.findAndCountAll({
            where:whereClause,
            limit: per_page,
            offset: (page - 1) * per_page
        })

        if (rowAndCount.rows.length === 0) {
            throw new NotFoundError("Member Not Found")
        }
        
        const response = {
            'total':rowAndCount.count,
            'page':page,
            'per_page':per_page,
            'total_pages':Math.ceil(rowAndCount.count/per_page),
            'items':rowAndCount.rows
        }

        return response;
    }

}

export default MemberService