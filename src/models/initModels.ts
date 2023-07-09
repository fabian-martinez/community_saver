import { Sequelize } from 'sequelize';
import { init as initBorrower } from './borrower';
import { init as initLoan } from './loan';
import { init as initLoanDisbursement } from './loan_disbursement';
import { init as initLoanPayment } from './loan_payment';

export function initModels(sequelize: Sequelize): void {
  initBorrower(sequelize);
  initLoan(sequelize);
  initLoanDisbursement(sequelize);
  initLoanPayment(sequelize);

  // Asociar los modelos si es necesario
  const models: any = sequelize.models;
  Object.keys(models).forEach((modelName: string) => {
    if (models[modelName].associate) {
      models[modelName].associate();
    }
  });
}
