import { Request } from 'express';

export interface IAuthRequest extends Request {
  user?: { id: number };
}

export type TLoginBody = {
  email: string;
  password: string;
};

export type TRegisterBody = {
  name: string;
  email: string;
  password: string;
};

// Response types
export type TAuthResponse = {
  accessToken: string;
};
