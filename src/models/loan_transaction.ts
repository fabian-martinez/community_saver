import { Model, DataTypes, Sequelize } from 'sequelize';
import { Loan } from './loan';

interface LoanTransactionModel{
  id: number,
  loan_id: typeof DataTypes.UUID,
  date: number,
  payment_amount: number,
  interest_amount: number,
  disbursement_amount: number,
  last_balance: number,
}
class LoanTransaction extends Model implements LoanTransaction {
  public id!: number;
  public loan_id!: typeof DataTypes.UUID;
  public date!: number;
  public payment_amount!: number;
  public interest_amount!: number;
  public disbursement_amount!: number;
  public last_balance!: number;
  // Asociaciones
  static associate() {
    LoanTransaction.belongsTo(Loan, { foreignKey: 'loan_id' });
  }
}

function init(sequelize: Sequelize): void {
  LoanTransaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      loan_id: {
        type: typeof DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'loan',
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DECIMAL(20, 2),
        defaultValue: DataTypes.NOW,
      },
      payment_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      interest_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      disbursement_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      last_balance: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'loan_transaction',
      tableName: 'loantransactions',
    }
  );
}

export { LoanTransaction , init };
