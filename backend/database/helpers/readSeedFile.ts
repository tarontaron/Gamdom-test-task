import { readFile } from 'node:fs/promises';

export const readSeedFile = async (path: string) => {
  const content = await readFile(path, 'utf-8');

  return JSON.parse(content);
};
