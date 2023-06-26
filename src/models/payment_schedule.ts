import { LoanModel } from "./loan"

interface PaymentScheduleRecord {
    date:Date,
    number:number,
    capital:number,
    interest:number,
    balance:number,
    state:string //'PAYED' and 'PENNDING'
}

interface PaymentSchedule {
    loan:LoanModel,
    payment_records: PaymentScheduleRecord[]
}

export {PaymentSchedule}