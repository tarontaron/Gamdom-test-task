import { Request } from 'express';

const extractAuthToken = (req: Request): string | null => {
  const { authorization } = req.headers;

  if (!authorization) {
    return null;
  }

  const match = authorization.match(/^bearer (.+)$/i);

  if (!match) {
    return null;
  }

  return match[1];
};

export default extractAuthToken;
