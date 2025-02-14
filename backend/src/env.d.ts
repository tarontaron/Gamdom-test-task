declare namespace NodeJS {
  export interface ProcessEnv {
    DB_URL: string;
    JWT_SECRET: string;
    BCRYPT_SALT_ROUNDS: string;
  }
}
