const request = require('supertest');
const app = require('../app');
const express = require('express');

let server;

beforeAll(async () => {
  server = app.listen(4000);
});

afterAll(async () => {
  await server.close();
});

afterEach(async () => {
});

describe('GET /coursess', () => {
    it('GET /coursess/ --> 404 not found', async () => {
      const response = await request(app).get('/coursess');
      expect(response.body).toEqual({});
      expect(response.status).toEqual(404);
    });

    it('GET /courses/ --> array of courses displayed', async (done) => {
        const response = await request(app).get('/courses');
    
        expect(response.status).toEqual(200);
    
        expect(response.body).toEqual(
          expect.arrayContaining([
            {
                id: expect.any(String),
                courseTitle: expect.any(String),
                courseDescription: expect.any(String),
                courseDuration: expect.any(String),
                courseOutcome: expect.any(String),
                Category: expect.any(String)
            },
          ]),
        );
        done();
    }, 30000);

    it('GET /courses/:id --> id does not exist', async () => {
        const response = await request(app).get('/courses/10');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
          message: "Id does not exist"
        });
    });

    it('GET /courses/:id --> id should return a course', async (done) => {
        const response = await request(app).get('/6436c8b02d206febb2281d20');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                {
                    id: "6436c8b02d206febb2281d20",
                    courseTitle: expect.any(String),
                    courseDescription: expect.any(String),
                    courseDuration: expect.any(String),
                    courseOutcome: expect.any(String),
                    Category: expect.any(String)
                },
            ]),
        );
        done()
    }, 10000);

    it('GET /courses/ --> should return all courses', async () => {
        const response = await request(app).get('/courses');
        expect(response.status).toEqual(200);
    });
}, 10000); 