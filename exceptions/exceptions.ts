export class ExampleError extends Error {
    constructor(message: any) {
      super(message); 
      this.name = "ValidationError";
    }
  }
