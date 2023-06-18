const request = require('supertest');
const app = require('./index');

describe('GET /mean', () => {
  it('returns the correct mean value', async () => {
    const response = await request(app)
      .get('/mean?nums=1,3,5,7')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ operation: 'mean', value: 4 });
  });

  it('returns an error for invalid numbers', async () => {
    const response = await request(app)
      .get('/mean?nums=foo,2,3')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({ error: 'Invalid number provided' });
  });

  it('returns an error for empty input', async () => {
    const response = await request(app)
      .get('/mean')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({ error: 'nums are required' });
  });
});

describe('GET /median', () => {
  it('returns the correct median value', async () => {
    const response = await request(app)
      .get('/median?nums=1,3,5,7')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ operation: 'median', value: 4 });
  });

  it('returns an error for invalid numbers', async () => {
    const response = await request(app)
      .get('/median?nums=foo,2,3')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({ error: 'Invalid number provided' });
  });

  it('returns an error for empty input', async () => {
    const response = await request(app)
      .get('/median')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({ error: 'nums are required' });
  });
});

describe('GET /mode', () => {
  it('returns the correct mode value', async () => {
    const response = await request(app)
      .get('/mode?nums=1,3,5,7,3')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ operation: 'mode', value: 3 });
  });

  it('returns an error for invalid numbers', async () => {
    const response = await request(app)
      .get('/mode?nums=foo,2,3')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({ error: 'Invalid number provided' });
  });

  it('returns an error for empty input', async () => {
    const response = await request(app)
      .get('/mode')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({ error: 'nums are required' });
  });
});

describe('GET /all', () => {
  it('returns the correct mean, median, and mode values', async () => {
    const response = await request(app)
      .get('/all?nums=1,3,5,7,3')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      operation: 'all',
      mean: 3.8,
      median: 3,
      mode: 3,
    });
  });

  it('returns an error for invalid numbers', async () => {
    const response = await request(app)
      .get('/all?nums=foo,2,3')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({ error: 'Invalid number provided' });
  });

  it('returns an error for empty input', async () => {
    const response = await request(app)
      .get('/all')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({ error: 'nums are required' });
  });
});
