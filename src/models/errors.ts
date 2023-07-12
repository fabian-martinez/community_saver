interface CustomError {
    message: string;
    code: number;
  }
  
  class BadRequestError implements CustomError {
    message: string;
    code: number;
  
    constructor(message: string) {
      this.message = message;
      this.code = 400;
    }
  }
  
  class NotFoundError implements CustomError {
    message: string;
    code: number;
  
    constructor(message: string) {
      this.message = message;
      this.code = 404;
    }
  }
  
  export {BadRequestError, NotFoundError}