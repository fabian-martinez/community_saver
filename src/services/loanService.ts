import { Borrower } from "../models/borrower";
import { Loan, LoanModel } from "../models/loan";
import { LoanPayment } from "../models/loan_payment";
import { PaymentSchedule } from "../models/payment_schedule";


class LoanService {
    public async getPaymentSchedule(loan_id: number):Promise<PaymentSchedule>  {
        
        const loan = await Loan.findByPk(loan_id)
        const loan_payment = await LoanPayment.findAll({
            where: {
                loan_id:loan_id
            }
        })

        if (!loan) {
            throw new Error(`Loan with id ${loan_id} Not Found`)
        }

        const paymentSchedule = []
        const loanBalance = loan?.original_amount

        do {
            const monthly_payment = 
                (loanBalance%loan.monthly_payment_amount) > 0 ? 
                loanBalance%loan.monthly_payment_amount : 
                loan.monthly_payment_amount
            
            paymentSchedule.push({
                
            })
        } while (loanBalance > 0);
        
        throw new Error('Method not implemented.');
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
                throw new Error(`Borrower ${borrowerName} Not Found`)
            }
            const loans = await borrower.get('loans') as Loan[];
            return loans
        }
            
        const loans = await Loan.findAll({
            where: whereClause
        })

        if (!loans) {
            throw new Error("Loan Not Found")
        }
        
        return loans
    }
}

export default LoanService