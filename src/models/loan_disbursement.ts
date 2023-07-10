import { Model, DataTypes, Sequelize } from 'sequelize';
import { Loan } from './loan';

class LoanDisbursement extends Model {
  public id!: number;
  public loan_id!: number;
  public date!: Date;
  public disbursement_amount!: number;

  // Asociaciones
  static associate() {
    LoanDisbursement.belongsTo(Loan, { foreignKey: 'loan_id' });
  }
}

function init(sequelize: Sequelize): void {
  LoanDisbursement.init(
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
      disbursement_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'loan_disbursement',
      tableName: 'loandisbursements',
    }
  );
}

export { LoanDisbursement, init };
