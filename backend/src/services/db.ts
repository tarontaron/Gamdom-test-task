import { Pool } from 'pg';

import { DB_URL } from '../config/environment';

const connectionString = DB_URL;

const pool = new Pool({
  connectionString,
});

export default pool;
