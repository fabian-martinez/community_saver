import { Op } from "sequelize";

const validateFilter = (filterParams:any):any => {
      
    if(!filterParams){
      return undefined
    }
    
    const filters = filterParams.split(',');

    return filters.map((filterParam:any) => {
      const [attribute, operation, value] = filterParam.split(':');

      if (operation && value) {
        return { attribute, operation, value };
      } else {
        throw new Error('Estructura de filtro incorrecta');
      }
    });
}

const buildFilter = (filters:any[]):any => {
  return filters.map((filter:any) => {
      const { attribute, operation, value } = filter;
      if(operation === 'eq')
          return { 
              [attribute] : {
                  [Op.eq]:value
              }
          };
      if(operation === 'gt')
          return {
              [attribute] : {
                  [Op.gt]:value
              }
          }
  });
}

export {validateFilter, buildFilter}