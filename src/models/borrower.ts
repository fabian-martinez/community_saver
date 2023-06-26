import { Model, DataTypes, Sequelize } from 'sequelize';
import { Loan } from './loan';

interface BorrowerModel{
  id:number;
  name:string;
  address:string;
  contact_info:string;
}

class Borrower extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public contact_info!: string;

  // Asociaciones
  static associate() {
    Borrower.hasMany(Loan, { foreignKey: 'borrower_id' });
  }
}

function init(sequelize: Sequelize): void {
  Borrower.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      contact_info: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'borrower',
      tableName: 'borrowers',
    }
  );
}

export { Borrower, init };
