const request = require('supertest');
const app = require('../app');

describe('Webhook endpoints', () => {
  beforeAll(() => {
    process.env.VERIFY_TOKEN = 'test_token';
  });

  test('GET / verification with correct token should return challenge', async () => {
    const res = await request(app)
      .get('/')
      .query({ 'hub.mode': 'subscribe', 'hub.challenge': 'abc123', 'hub.verify_token': 'test_token' });

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('abc123');
  });

  test('GET / verification with incorrect token should return 403', async () => {
    const res = await request(app)
      .get('/')
      .query({ 'hub.mode': 'subscribe', 'hub.challenge': 'abc123', 'hub.verify_token': 'wrong' });

    expect(res.statusCode).toBe(403);
  });

  test('POST / should return 200 and acknowledge', async () => {
    const payload = { object: 'whatsapp_business_account', entry: [] };
    const res = await request(app)
      .post('/')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'received' });
  });
});