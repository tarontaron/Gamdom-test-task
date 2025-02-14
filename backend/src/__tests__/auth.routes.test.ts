import request from 'supertest';
import app from '../server';
import pool from '../services/db';

// basic tests, generally can be mocked some data or use test db connections...
describe('Auth Routes', () => {
  it('should return 200 and a token when login is successful', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@admin.com',
      password: 'Password1*',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should return 401 if email or password is incorrect', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});

afterAll(async () => {
  await pool.end(); // close DB connection...
});
