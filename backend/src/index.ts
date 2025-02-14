import server from './server';
import pool from './services/db';

const bootstrap = () => {
  server.listen(3000, async (error) => {
    if (error) throw error;

    try {
      await pool.connect();
      // todo => can be add logger (winston, pino)...
      console.log('[Server]: Database connected');
    } catch (e) {
      throw new Error('Failed to connect to the database');
    }

    console.log('[Server]: Running on port', 3000);
  });
};

bootstrap();
