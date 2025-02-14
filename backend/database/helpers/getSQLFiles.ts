import { readdir } from 'fs/promises';

export const getSQLFiles = async (dir: string): Promise<string[]> => {
  const files = await readdir(dir);

  // Filter for .sql files only
  const sqlFiles = files.filter(file => file.endsWith('.sql'));

  // Separate init.sql from other migration files
  const migrationFiles = sqlFiles.filter(file => file !== 'init.sql');

  return migrationFiles;
};
