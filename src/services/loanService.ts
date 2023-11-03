import { Op } from "sequelize";
import { NotFoundError } from "../models/errors";
import { Loan, LoanModel } from "../models/loan";
import { LoanTransaction } from "../models/loan_transaction";
import logger from "./loggerService";


class LoanService {

    DEFAULT_PAGE=1
    DEFAULT_PER_PAGE=10

    public async getLoan(loan_id: string):Promise<Loan> {
        const loan = await Loan.findByPk(loan_id)


        if (!loan) {
            throw new NotFoundError(`Loan with id ${loan_id} Not Found`)
        }

        return loan;

    }
    
    public async getLoans(pagination:{page:number,per_page:number},filter?:any):Promise<any> {
        
        let whereClause: any = {};
        
        const page = (isNaN(pagination.page) || pagination.page < 1)?this.DEFAULT_PAGE:pagination.page
        const per_page = (isNaN(pagination.per_page ) || pagination.per_page < 1)?this.DEFAULT_PER_PAGE:pagination.per_page
        
        if(filter){
            whereClause = this.buildFilter(filter)
        }

        const rowAndCount = await Loan.findAndCountAll({
            where:whereClause,
            limit: per_page,
            offset: (page - 1) * per_page,
            order: [
                ['created_at', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
          ],
        })

        if (rowAndCount.rows.length === 0) {
            throw new NotFoundError("Loan Not Found")
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

    public async getLoanTransactions(loan_id:string,pagination:{page:number,per_page:number}):Promise<any> {

        const page = (isNaN(pagination.page) || pagination.page < 1)?this.DEFAULT_PAGE:pagination.page
        const per_page = (isNaN(pagination.per_page ) || pagination.per_page < 1)?this.DEFAULT_PER_PAGE:pagination.per_page
        const rowAndCount = await LoanTransaction.findAndCountAll({
            where:{
                'loan_id':loan_id
            },
            limit: per_page,
            offset: (page - 1) * per_page,
            order: [['date', 'DESC'],]
        });

        if (rowAndCount.rows.length === 0) {
            throw new NotFoundError(`Loan with id ${loan_id} Not Found Historic`)
        }

        const response = {
            'total':rowAndCount.count,
            'page':page,
            'per_page':per_page,
            'total_pages':Math.ceil(rowAndCount.count/per_page),
            'records':rowAndCount.rows
        }

        return response;
    }

    private buildFilter(filter:any):any {
        const { attribute, operation, value } = filter;

        let filterOptions = {};
        if(operation === 'eq')
            return { 
                [attribute] : {
                    [Op.eq]:`${value}`
                }
            };
        if(operation === 'gt')
            return {
                [attribute] : {
                    [Op.gt]:`${value}`
                }
            };
    }
}

export default LoanService