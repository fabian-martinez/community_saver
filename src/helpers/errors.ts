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
  class Unauthorized implements CustomError {
    message: string;
    code: number;
  
    constructor(message: string) {
      this.message = message;
      this.code = 401;
    }
  }
  
  export {BadRequestError, NotFoundError, Unauthorized}