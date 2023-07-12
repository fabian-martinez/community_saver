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

        const disbursmentData = loan.get('loan_disbursements') as LoanDisbursement[]
        
        const paymentData = loan.get('loan_payments') as LoanPayment[]

        const filteredLoan = {
            id:loan.id,
            borrower_id:loan.borrower_id,
            original_amount:loan.original_amount,
            updated_amount:loan.updated_amount,
            monthly_payment_amount:loan.monthly_payment_amount,
            interest_rate:loan.interest_rate,
            loan_date:loan.loan_date,
            loan_type:loan.loan_type
        } as Loan

        // const result = [];
        let balance = 0;

        const paymentsAndDisbursements = [...disbursmentData, ...paymentData]

        // console.log(paymentsAndDisbursements);
        
        // for (let i = 0; i < paymentData.length; i++) {
        //     const payment = paymentData[i];
        //     const disbursement = disbursmentData.find((item) => item.date <= payment.date);
            
        //     const entry = {
        //         number: i,
        //         date: payment.date,
        //         capital: payment.payment_amount,
        //         interest: payment.interest_amount,
        //         balance: balance,
        //         disbursement: disbursement?.disbursement_amount,
        //         state: 'PAID',
        //     };
            
        //     result.push(entry);
            
        //     balance += (disbursement?.disbursement_amount) ? disbursement?.disbursement_amount : 0;
        //     balance -= payment.payment_amount;
        // }
        
        throw new Error('Method not implemented.');

        // return {loan:filteredLoan, payment_records:result}
    }

    // public async getPaymentSchedule(loan_id: number):Promise<PaymentSchedule>  {
        
    //     // throw new Error('Method not implemented.');
    // }
    
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