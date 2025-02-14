import pool from '../services/db';
import type { TCreateUserPayload } from '../types/user.types';

export enum EUserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: EUserRoles;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

const UserModel = {
  findById: async (id: number): Promise<IUser | null> => {
    const { rows } = await pool.query<IUser>('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id]);

    return rows[0] || null;
  },
  findByEmail: async (email: string): Promise<IUser | null> => {
    const { rows } = await pool.query<IUser>('SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL', [email]);

    return rows[0] || null;
  },
  create: async (payload: TCreateUserPayload): Promise<IUser> => {
    const { name, email, password } = payload;
    const { rows } = await pool.query<IUser>(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );

    return rows[0];
  },
};

export default UserModel;
