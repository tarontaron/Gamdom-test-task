import request from 'supertest';
import server from '../server'; // Import Express app and server
import pool from '../services/db'; // Import database connection

// Mocked authentication token
const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzM5NTI5NzU5fQ.Qth9ihjb8Z4wCzrkxZdCmZT7S0zgAluj3Uzxnj3q8F8';

// basic tests, generally can be mocked some data or use test db connections...
describe('Events Routes (Basic Tests)', () => {
  it('should return all events', async () => {
    const res = await request(server)
      .get('/api/events')
      .set('Authorization', authToken);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // Ensure response is an array
  });

  it('should return a single event by ID', async () => {
    const res = await request(server)
      .get('/api/events/1')
      .set('Authorization', authToken);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('event_id', 1);
    expect(res.body).toHaveProperty('event_name');
    expect(res.body).toHaveProperty('odds');
  });

  it('should return 404 for non-existent event', async () => {
    const res = await request(server)
      .get('/api/events/999')
      .set('Authorization', authToken);

    expect(res.statusCode).toBe(404);
  });

  it('should return 401 for unauthorized call', async () => {
    const res = await request(server)
      .get('/api/events');

    expect(res.statusCode).toBe(401);
  });
});

/** 🛑 Cleanup: Close database and server after tests */
afterAll(async () => {
  await pool.end();
});
