import { Client } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DB_URL;

export const client = new Client({
  connectionString,
});
