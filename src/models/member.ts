import { Model, DataTypes, Sequelize } from 'sequelize';
import { Loan } from './loan';
interface MemberModel{
  id: typeof DataTypes.UUID;
  name:string;
  email:string;
  document_type:string;
  number_id:string;
  created_at: number;
  updated_at: number;

}

class Member extends Model {
  public id!: typeof DataTypes.UUID;
  public name!: string;
  public email!: string;
  public document_type!: string;
  public number_id!:string;
  public created_at!: number;
  public updated_at!: number;
  

  // Asociaciones
  static associate() {
    Member.hasMany(Loan, { foreignKey: 'member_id' });
  }
}

function init(sequelize: Sequelize): void {
  Member.init(
    {
      id: {
        type: typeof DataTypes.UUID,
        primaryKey: true,
        autoIncrement: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      document_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      number_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'member',
      tableName: 'members',
    }
  );
}

export { Member , init };
