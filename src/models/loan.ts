import { Model, DataTypes, Sequelize } from 'sequelize';
import { Member } from './member';
import { LoanTransaction } from './loan_transaction';

interface LoanModel{
  id: typeof DataTypes.UUID;
  member_id: typeof DataTypes.UUID;
  original_amount: number;
  updated_amount: number;
  monthly_payment: number;
  interest_rate: number;
  created_at: number;
  updated_at: number;
  loan_type: string;
  state: string;
} 
class Loan extends Model implements LoanModel {
  public id!: typeof DataTypes.UUID;
  public member_id!: typeof DataTypes.UUID;
  public original_amount!: number;
  public updated_amount!: number;
  public monthly_payment!: number;
  public interest_rate!: number;
  public created_at!: number;
  public updated_at!: number;
  public loan_type!: string;
  public state!: string;

  // Asociaciones
  static associate() {
    Loan.belongsTo(Member, { foreignKey: 'member_id' });
    Loan.hasMany(LoanTransaction, { foreignKey: 'loan_id' });
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
          model: 'member',
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
      monthly_payment: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      interest_rate: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      loan_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      state: {
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
