import { Model, DataTypes, Sequelize } from 'sequelize';
import { Loan } from './loan';
interface MemberModel{
  id: typeof DataTypes.UUID;
  name:string;
}

class Member extends Model {
  public id!: typeof DataTypes.UUID;
  public name!: string;

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
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
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
