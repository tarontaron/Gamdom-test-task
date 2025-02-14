import 'dotenv/config';

import { join } from 'path';
import { exit } from 'node:process';

import { getSQLFiles, processSQLFile } from '../helpers';
import { client } from './client';

const migrationsDir = join(__dirname, '../migrations');

const main = async () => {
  try {
    await client.connect();

    const existsQuery = await client.query(`
        SELECT EXISTS (SELECT 1
                       FROM information_schema.tables
                       WHERE table_schema = 'public'
                         AND table_name = 'migrations');
    `);

    const isMigrationsExists = existsQuery.rows[0].exists;

    if (!isMigrationsExists) {
      const queries = await processSQLFile(join(migrationsDir, 'init.sql'));

      for (const query of queries) {
        await client.query(query);
      }

      await client.query('INSERT INTO migrations (name) VALUES ($1)', ['init.sql']);
    }

    const migrationFiles = await getSQLFiles(migrationsDir);

    for (const file of migrationFiles) {
      const isMigratedQuery = await client.query('SELECT * FROM migrations WHERE name = $1', [file]);
      const isMigratedQueryResult = isMigratedQuery.rows.length > 0;

      if (isMigratedQueryResult) {
        continue;
      }

      const queries = await processSQLFile(join(migrationsDir, file));

      for (const query of queries) {
        await client.query(query);
      }

      await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
    }
  } catch (e) {
    console.log(e);
    exit(1);
  } finally {
    await client.end();
  }
};

main().then().catch();
