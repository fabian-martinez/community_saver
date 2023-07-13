import { Sequelize } from 'sequelize';
import { initModels } from '../src/models/initModels';
import { Loan } from '../src/models/loan';
import { Member } from '../src/models/member';
import { PaymentSchedule } from '../src/models/payment_schedule';
import { LoanDisbursement } from '../src/models/loan_disbursement';
import { LoanPayment } from '../src/models/loan_payment';


const sequelize = new Sequelize({dialect: 'postgres'});
initModels(sequelize)
        
export const allLoans:Loan[] = [
    Loan.build({
        "id": 'f7dcf876-1840-4be8-aee0-3a4734d2d44',
        "member_id": 'a8f6bb2c-64f2-4728-a110-575ee3e9fa28',
        "original_amount": 10000,
        "updated_amount": 1000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "ACCION"
    }),
    Loan.build({
        "id": 'ddbb5d48-9c47-46ea-a7df-3be17db984c9',
        "member_id": '324a3e00-b77e-4d9f-9184-d60ceb0fccec',
        "original_amount": 4200000,
        "updated_amount": 4200000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "AGIL"
    })
]

export const loansByMember:Loan[] = [
    Loan.build({
        "id": 'f7dcf876-1840-4be8-aee0-3a4734d2d44',
        "member_id": 'a8f6bb2c-64f2-4728-a110-575ee3e9fa28',
        "original_amount": 10000,
        "updated_amount": 1000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "ACCION"
    }),
    Loan.build({
        "id": 'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f',
        "member_id": 'a8f6bb2c-64f2-4728-a110-575ee3e9fa28',
        "original_amount": 4200000,
        "updated_amount": 4200000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "AGIL"
    })
]

export const agilLoanByMember = [
    Loan.build({
        "id": 'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f',
        "member_id": 1,
        "original_amount": 4200000,
        "updated_amount": 4200000,
        "monthly_payment_amount": 0,
        "interest_rate": 0.0200,
        "loan_date": new Date(2022,1,1),
        "payment_date": new Date(2022,1,1),
        "loan_type": "AGIL"
    })
]

export const memberWithTwoLoans:Member = Member.build({
    id:'a8f6bb2c-64f2-4728-a110-575ee3e9fa28',
    name:'John Doe',
    loans: loansByMember
},{
    include:[Loan]
})

export const memberWithATypeLoan:Member = Member.build({
    id:'a8f6bb2c-64f2-4728-a110-575ee3e9fa28',name:'John Doe',
    loans: agilLoanByMember
},{
    include:[Loan]
})

export const memberWithoutLoans:Member = Member.build({
    id:'a8f6bb2c-64f2-4728-a110-575ee3e9fa28',name:'John Doe',
},{
    include:[Loan]
})

export const newLoan = Loan.build({
    "id": 'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f',
    "member_id": 'a8f6bb2c-64f2-4728-a110-575ee3e9fa28',
    "original_amount": 8806200,
    'updated_amount': 8806200,
    "monthly_payment_amount": 200000,
    "interest_rate": 0.0200,
    "loan_date": new Date(2022,1,1),
    "loan_type": "NEW_LOAN"
})

export const oldLoan = Loan.build({
    "id": 'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f',
    "member_id": 'a8f6bb2c-64f2-4728-a110-575ee3e9fa28',
    "original_amount": 8806200,
    'updated_amount': 6400000,
    "monthly_payment_amount": 200000,
    "interest_rate": 0.0200,
    "loan_date": new Date(2022,5,1),
    "loan_type": "OLD_LOAN"
})

export const loandDisbursements:LoanDisbursement[] = [
    LoanDisbursement.build({ 'id': 1,'loan_id': 'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f','date': new Date(2022,1,1),'disbursement_amount': 3000000, 'last_balance':3000000}),
    LoanDisbursement.build({ 'id': 2,'loan_id': 'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f','date': new Date(2022,2,1),'disbursement_amount': 4000000, 'last_balance':7000000}),
    LoanDisbursement.build({ 'id': 3,'loan_id': 'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f','date': new Date(2022,3,1),'disbursement_amount': 1806200, 'last_balance':8806200}),
]

export const loanPayments:LoanPayment[] = [
    LoanPayment.build({'id':1,'loan_id':'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f','date':new Date(2022, 2,1),'payment_amount':0      ,'interest_amount':45000 ,'last_balance':7000000 }),
    LoanPayment.build({'id':2,'loan_id':'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f','date':new Date(2022, 3,1),'payment_amount':0      ,'interest_amount':105000,'last_balance':8806200 }),
    LoanPayment.build({'id':3,'loan_id':'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f','date':new Date(2022, 4,1),'payment_amount':806200 ,'interest_amount':132093,'last_balance':8000000 }),
    LoanPayment.build({'id':4,'loan_id':'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f','date':new Date(2022, 5,1),'payment_amount':1600000,'interest_amount':120000,'last_balance':6400000 }),
]

export const oldLoanWithPaymentsAndDisbursements:Loan = Loan.build({
    "id": 'e2c2aefe-0ab1-48f8-b99a-f0faa011ea4f',
    "member_id": 'a8f6bb2c-64f2-4728-a110-575ee3e9fa28',
    "original_amount": 8806200,
    'updated_amount': 6400000,
    "monthly_payment_amount": 200000,
    "interest_rate": 0.0200,
    "loan_date": new Date(2022,5,1),
    "loan_type": "OLD_LOAN",
    "loan_payments": loanPayments,
    "loan_disbursements": loandDisbursements
},{
    include:[LoanPayment,LoanDisbursement]
})

export const paymentHistoric:PaymentSchedule = {
    loan:oldLoan,
    payment_records:[
        {'number':1, 'date':new Date('1/01/22'),'capital':0,       'interest':	0,      'balance':	3000000, 'disbursement': 3000000, 'state':	'PAID'},
        {'number':2, 'date':new Date('1/02/22'),'capital':0,       'interest':	45000,  'balance':	7000000, 'disbursement': 4000000, 'state':	'PAID'},
        {'number':3, 'date':new Date('1/03/22'),'capital':0,       'interest':	105000, 'balance':	8806200, 'disbursement': 1806200, 'state':	'PAID'},
        {'number':4, 'date':new Date('1/04/22'),'capital':806200,  'interest':	132093, 'balance':	8000000, 'state':	'PAID'    },
        {'number':5, 'date':new Date('1/05/22'),'capital':1600000, 'interest':	120000, 'balance':	6400000, 'state':	'PAID'    },
    ]
}    

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