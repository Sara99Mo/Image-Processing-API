import request from 'supertest';
import app from '../index';

describe('GET /', (): void => {
  it('responds with 200', (done): void => {
    request(app).get('/').expect(200, done);
  });
});
