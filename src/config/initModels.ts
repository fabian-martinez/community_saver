import { Sequelize } from 'sequelize';
import { init as initMember } from '../models/member';
import { init as initLoan } from '../models/loan';
import { init as initLoanTransaction } from '../models/loan_transaction';

export function initModels(sequelize: Sequelize): void {
  initMember(sequelize);
  initLoan(sequelize);
  initLoanTransaction(sequelize);

  // Asociar los modelos si es necesario
  const models: any = sequelize.models;
  Object.keys(models).forEach((modelName: string) => {
    if (models[modelName].associate) {
      models[modelName].associate();
    }
  });
}
