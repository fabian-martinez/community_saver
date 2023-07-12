import { Borrower } from "../models/borrower";
import { NotFoundError } from "../models/errors";
import { Loan, LoanModel } from "../models/loan";
import { LoanDisbursement } from "../models/loan_disbursement";
import { LoanPayment } from "../models/loan_payment";


class LoanService {
    public async getLoan(loan_id: string):Promise<Loan> {
        const loan = await Loan.findByPk(loan_id, {include:[LoanPayment, LoanDisbursement]})


        if (!loan) {
            throw new Error(`Loan with id ${loan_id} Not Found`)
        }

        return loan;

    }
    
    public async getLoans(borrowerName?:string,loanType?:string):Promise<LoanModel[]> {
        
        const whereClause: any = {};

        if(loanType) {
            whereClause.loan_type = loanType;
        } 

        if(borrowerName) {
            const borrower = await Borrower.findOne({
                where: {name:borrowerName},
                include: {
                    model: Loan,
                    where: whereClause,
                },
            });
            if (!borrower) {
                throw new NotFoundError(`Borrower ${borrowerName} Not Found`)
            }
            const loans = await borrower.get('loans') as Loan[];
            return loans
        }
        
        const loans = await Loan.findAll({
            where: whereClause
        })

        if (!loans) {
            throw new NotFoundError("Loan Not Found")
        }
        
        return loans
    }
}

export default LoanService