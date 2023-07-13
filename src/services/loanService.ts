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

    public async getLoanHistoric(loanid:string,page:number,per_page:number):Promise<any> {
        const response = await Loan.findAndCountAll({
            include:
                {
                    model:LoanTransaction,
                    where:{
                        'loan_id':loanid
                    },
                }
        })

        if (!response) {
            throw new NotFoundError(`Loan with id ${loanid} Not Found`)
        }

        return response;
    }
}

export default LoanService