import { Model, DataTypes, Sequelize } from 'sequelize';
import { Loan } from './loan';

interface LoanTransactionModel{
  id: number,
  loan_id: typeof DataTypes.UUID,
  date: number,
  amount: number,
  type: string;
  last_balance: number,
}
class LoanTransaction extends Model implements LoanTransaction {
  public id!: number;
  public loan_id!: typeof DataTypes.UUID;
  public date!: number;
  public amount!: number;
  public type!: string;
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
      amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(255),
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
