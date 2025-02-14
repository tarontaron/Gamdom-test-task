class UnAuthorizedError extends Error {
  constructor(message?: string) {
    super(message || 'Unauthorized error');
  }
}

export default UnAuthorizedError;
