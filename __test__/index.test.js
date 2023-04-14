const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose')


describe('GET /coursess', () => {

  beforeAll(async () =>{
    await mongoose.connect(process.env.URI)
  })
  
  afterAll(async () =>{
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

    it('GET /coursess/ --> 404 not found', async () => {
      const response = await request(app).get('/coursess');
      expect(response.body).toEqual({});
      expect(response.status).toEqual(404);
    });

    it('GET /courses/ --> array of courses displayed  in the format', async () => {
        const response = await request(app).get('/courses');
    
        expect(response.status).toEqual(200);
    
        expect(response.body).toEqual(
          expect.arrayContaining([
            {
                _id: expect.any(String),
                courseTitle: expect.any(String),
                courseDescription: expect.any(String),
                courseDuration: expect.any(String),
                courseOutcome: expect.any(String),
                Category: expect.any(String)
            },
          ]),
        );
    });

    it('GET /courses/:id --> id does not exist', async () => {
        const response = await request(app).get('/courses/10');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
          message: "Id does not exist"
        });
    });

    it('GET /courses/:id --> id should return a course', async () => {
        const response = await request(app).get('/courses/6436c8b02d206febb2281d20');
        expect(response.status).toEqual(200);
        expect(response.body._id).toEqual('6436c8b02d206febb2281d20');
    });

    it('GET /courses/ --> should return all courses', async () => {
        const response = await request(app).get('/courses');
        expect(response.status).toEqual(200);
    });

    it('GET /catagories/ --> should return all courses in any category', async () => {
      const response = await request(app).get('/courses/categories');
      expect(response.status).toEqual(200);
    
        expect(response.body).toEqual(
          expect.arrayContaining([
            {
                _id: expect.any(String),
                courseTitle: expect.any(String),
                courseDescription: expect.any(String),
                courseDuration: expect.any(String),
                courseOutcome: expect.any(String),
                Category: expect.any(String)
            },
          ]),
        );
    });

    it('GET /catagory/:category --> should return all courses in a specific category', async () => {
      const response = await request(app).get('/courses/category/alevel');
      expect(response.status).toEqual(200);
    
      expect(response.body).toEqual(
        expect.arrayContaining([
          {
              _id: expect.any(String),
              courseTitle: expect.any(String),
              courseDescription: expect.any(String),
              courseDuration: expect.any(String),
              courseOutcome: expect.any(String),
              Category: 'alevel'
          },
        ]),
      );
    });
}); 