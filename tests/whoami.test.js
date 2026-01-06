const request = require('supertest');
const app = require('../app');

describe('Whoami endpoint', () => {
  test('GET /whoami returns commit info', async () => {
    const res = await request(app).get('/whoami');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('commit');
    expect(typeof res.body.commit).toBe('string');
    expect(res.body).toHaveProperty('branch');
  });
});