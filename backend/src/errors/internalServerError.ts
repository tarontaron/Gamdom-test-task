class InternalServerError extends Error {
  constructor(message?: string) {
    super(message || 'Internal Server Error');
  }
}

export default InternalServerError;
