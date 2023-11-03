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

export {validateFilter}