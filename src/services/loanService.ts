import { Member } from "../models/member";
import { NotFoundError } from "../models/errors";
import { Loan, LoanModel } from "../models/loan";
import { LoanTransaction } from "../models/loan_transaction";


class LoanService {
    public async getLoan(loan_id: string):Promise<Loan> {
        const loan = await Loan.findByPk(loan_id)


        if (!loan) {
            throw new NotFoundError(`Loan with id ${loan_id} Not Found`)
        }

        return loan;

    }
    
    public async getLoans(memberName?:string,loanType?:string):Promise<LoanModel[]> {
        
        const whereClause: any = {};

        if(loanType) {
            whereClause.loan_type = loanType;
        } 

        if(memberName) {
            const member = await Member.findOne({
                where: {name:memberName},
                include: {
                    model: Loan,
                    where: whereClause,
                },
            });
            if (!member) {
                throw new NotFoundError(`Member loan ${memberName} Not Found`)
            }
            return await member.get('loans') as Loan[];
        }
        
        const loans = await Loan.findAll({
            where: whereClause
        })

        if (loans.length === 0) {
            throw new NotFoundError("Loan Not Found")
        }
        
        return loans
    }

    public async getLoanHistoric(loanid:string,pageNumber:number,pageSize:number):Promise<any> {
        const rowAndCount = await LoanTransaction.findAndCountAll({
            where:{
                'loan_id':loanid
            },
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize,
            order: [
                ['date', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
          ],
        })

        if (rowAndCount.rows.length === 0) {
            throw new NotFoundError(`Loan with id ${loanid} Not Found Historic`)
        }

        const response = {
            'total':rowAndCount.count,
            'page':pageNumber,
            'per_page':pageSize,
            'total_pages':Math.ceil(rowAndCount.count/pageSize),
            'records':rowAndCount.rows
        }

        return response;
    }
}

export default LoanService