class CustomError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public customMessage?: string,
  ) {
    super(message);
  }
}

export default CustomError;
