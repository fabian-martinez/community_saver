import { Model, DataTypes, Sequelize } from 'sequelize';
import { Borrower } from './borrower';
import { LoanDisbursement } from './loan_disbursement';
import { LoanPayment } from './loan_payment';

interface LoanModel{
  id: typeof DataTypes.UUID;
  member_id: typeof DataTypes.UUID;
  original_amount: number;
  updated_amount: number;
  monthly_payment_amount: number;
  interest_rate: number;
  loan_date: Date;
  payment_date: Date;
  loan_type: string;
} 
class Loan extends Model implements LoanModel {
  public id!: typeof DataTypes.UUID;
  public member_id!: typeof DataTypes.UUID;
  public original_amount!: number;
  public updated_amount!: number;
  public monthly_payment_amount!: number;
  public interest_rate!: number;
  public loan_date!: Date;
  public payment_date!: Date;
  public loan_type!: string;

  // Asociaciones
  static associate() {
    Loan.belongsTo(Borrower, { foreignKey: 'member_id' });
    Loan.hasMany(LoanDisbursement, { foreignKey: 'loan_id' });
    Loan.hasMany(LoanPayment, { foreignKey: 'loan_id' });
  }
}

function init(sequelize: Sequelize): void {
  Loan.init(
    {
      id: {
        type: typeof DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      member_id: {
        type: typeof DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'borrower',
          key: 'id',
        },
      },
      original_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      updated_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      monthly_payment_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      interest_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      loan_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      loan_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'loan',
      tableName: 'loans',
    }
  );
}

export { LoanModel, Loan, init };
