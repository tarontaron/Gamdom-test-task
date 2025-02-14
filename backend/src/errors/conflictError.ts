class ConflictError extends Error {
  constructor(message?: string) {
    super(message || 'Conflict');
  }
}

export default ConflictError;
