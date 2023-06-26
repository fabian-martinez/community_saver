import { Sequelize } from 'sequelize';
import { initModels } from '../src/models/initModels';
import { Loan } from '../src/models/loan';
import { Borrower } from '../src/models/borrower';
import { PaymentSchedule } from '../src/models/payment_schedule';


const sequelize = new Sequelize({dialect: 'postgres'});
initModels(sequelize)
        
export const allLoans:Loan[] = [
    Loan.build({
        "id": 34,
        "borrower_id": 1,
        "original_amount": 10000,
        "updated_amount": 1000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "ACCION"
    }),
    Loan.build({
        "id": 4,
        "borrower_id": 4,
        "original_amount": 4200000,
        "updated_amount": 4200000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "AGIL"
    })
]

export const loansByBorrower:Loan[] = [
    Loan.build({
        "id": 34,
        "borrower_id": 1,
        "original_amount": 10000,
        "updated_amount": 1000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "ACCION"
    }),
    Loan.build({
        "id": 32,
        "borrower_id": 1,
        "original_amount": 4200000,
        "updated_amount": 4200000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "AGIL"
    })
]

export const agilLoanByBorrower = [
    Loan.build({
        "id": 32,
        "borrower_id": 1,
        "original_amount": 4200000,
        "updated_amount": 4200000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "AGIL"
    })
]

export const borrowerWithTwoLoans:Borrower = Borrower.build({
    id:1,
    name:'John Doe',
    loans: loansByBorrower
},{
    include:[Loan]
})

export const borrowerWithATypeLoan:Borrower = Borrower.build({
    id:1,name:'John Doe',
    loans: agilLoanByBorrower
},{
    include:[Loan]
})

export const borrowerWithoutLoans:Borrower = Borrower.build({
    id:1,name:'John Doe',
},{
    include:[Loan]
})

export const newLoan = Loan.build({
    "id": 32,
    "borrower_id": 1,
    "original_amount": 8806200,
    'updated_amount': 8806200,
    "monthly_payment_amount": 200000,
    "interest_rate": 0.0200,
    "loan_date": new Date(2022,1,1),
    "loan_type": "NEW_LOAN"
})

export const paymentScheduleToNewLoan:PaymentSchedule = {
    loan:newLoan,
    payment_records:[
        {'number':1, 'date':new Date('1/01/22'),'capital':806200, 'interest':	176124, 'balance':	8000000, 'state':	'PENNDING'},
        {'number':2, 'date':new Date('1/02/22'),'capital':1000000, 'interest':	160000, 'balance':	7000000, 'state':	'PENNDING'},
        {'number':3, 'date':new Date('2/02/22'),'capital':1000000, 'interest':	140000, 'balance':	6000000, 'state':	'PENNDING'},
        {'number':4, 'date':new Date('3/02/22'),'capital':1000000, 'interest':	120000, 'balance':	5000000, 'state':	'PENNDING'},
        {'number':5, 'date':new Date('4/02/22'),'capital':1000000, 'interest':	100000, 'balance':	4000000, 'state':	'PENNDING'},
        {'number':6, 'date':new Date('5/02/22'),'capital':1000000, 'interest':	80000, 'balance':	3000000, 'state':	'PENNDING'},
        {'number':7, 'date':new Date('6/02/22'),'capital':1000000, 'interest':	60000, 'balance':	2000000, 'state':	'PENNDING'},
        {'number':8, 'date':new Date('7/02/22'),'capital':1000000, 'interest':	40000, 'balance':	1000000, 'state':	'PENNDING'},
        {'number':9, 'date':new Date('8/02/22'),'capital':1000000, 'interest':	20000, 'balance':	0, 'state':	'PENNDING'},
    ]
}    