class CustomError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public nameSpace?: string,
    public privateMessage?: string,
  ) {
    super(message);
  }
}

export default CustomError;
