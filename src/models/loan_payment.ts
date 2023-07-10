import { Model, DataTypes, Sequelize } from 'sequelize';
import { Loan } from './loan';

class LoanPayment extends Model {
  public id!: number;
  public loan_id!: number;
  public date!: Date;
  public payment_amount!: number;
  public interest_amount!: number;

  // Asociaciones
  static associate() {
    LoanPayment.belongsTo(Loan, { foreignKey: 'loan_id' });
  }
}

function init(sequelize: Sequelize): void {
  LoanPayment.init(
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
        type: DataTypes.DATE,
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
    },
    {
      sequelize,
      modelName: 'loan_payment',
      tableName: 'loanpayments',
    }
  );
}

export { LoanPayment, init };
