const request = require('supertest');
const app = require('./index');
const mongoClient = require('./functions/mongo')
const redisClient = require('./functions/redis');

let savedId = '';

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll(done => {
  server.close(done);  // this will close the server after each test run
  mongoClient.close(done);
  redisClient.quit(done);
});


describe('POST /newurl', () => {
  it('should create a new shortened url', async () => {
    const response = await request(app)
      .post('/newurl')
      .send({
        url: "https://www.google.com"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.url).toBe('https://www.google.com');
    expect(response.body.shortenUri).toMatch(/^https:\/\/shortenurl.org\/[a-zA-Z0-9]{9}$/);

    savedId = response.body.shortenUri.split('/')[3];
  });
});

describe('GET /:id', () => {
  it('should redirect to the real url', async () => {
    const id = savedId;  // assuming this id exists in your database
    const response = await request(app).get(`/${id}`);

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('https://www.google.com');  // assuming this is the url associated with id
  });

  it('should return 404 for nonexistent ids', async () => {
    const id = 'nonexistentId';
    const response = await request(app).get(`/${id}`);

    expect(response.statusCode).toBe(404);
  });
});
