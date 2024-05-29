const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const request = require('supertest')
const app = require('../app')

const endpoints = require('../endpoints.json')

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('GET: /api/topics', () => {
    test('status: 200, responds with all topics', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body }) =>{
                expect(body.topics).toHaveLength(3)
                body.topics.forEach((topic) => {
                    expect(topic).toMatchObject(
                        {
                            slug: expect.any(String),
                            description: expect.any(String)
                        }
                    )
                })
            })
    });

    test('status: 404, responds with an error message when non existent api', () => {
        return request(app)
            .get('/api/non-existent')
            .expect(404)
            .then(({body})=> {
                expect(body.msg).toBe("Endpoint doesn't exist.")

            })
    });
});

describe('GET: /api', () => {
    test('status: 200, responds with a list of all endpoints available', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
                for (const [key, value] of Object.entries(endpoints)) {
                    if(key === 'GET /api'){
                        expect(value).toMatchObject({
                            description: expect.any(String),
                        }) 
                    } else {
                        expect(value).toMatchObject({
                            description: expect.any(String),
                            queries: expect.any(Array),
                            exampleResponse: expect.any(Object)
                        })
                        expect(value.exampleResponse).toMatchObject({
                            [Object.keys(value.exampleResponse)[0]]: expect.any(Array)
                        })
                    }
                    
                }
            })
    });
    
});

