import { readFile } from 'node:fs/promises';

export const processSQLFile = async (path: string): Promise<string[]> => {
  // Extract SQL queries from files. Assumes no ';' in the fileNames
  return (await readFile(path)).toString()
    .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
    .replace(/\s+/g, ' ') // excess white space
    .split(';') // split into all statements
    .map(Function.prototype.call, String.prototype.trim)
    .filter((el) => el.length != 0);
};
