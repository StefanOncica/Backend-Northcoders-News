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
                    }
                    
                }
            })
    });
    
});

describe('GET: /api/articles/:article_id', () => {
    test('status: 200, responds with a specific article based on the article_id', () => {
        return request(app)
            .get('/api/articles/6')
            .expect(200)
            .then(({body}) => {
                expect(body).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                })
            })
    });
    
    test('status: 200, responds with an empty object if the article_id does not exist', () => {
        return request(app)
            .get('/api/articles/1000')
            .expect(200)
            .then(({body}) => {
                expect(body).toEqual({})
            })
        
    });
    
});

describe('GET: /api/articles', () => {
    test('status: 200, responds with all articles', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body }) =>{
                expect(body.articles).toHaveLength(13)
                body.articles.forEach((article) => {
                    expect(article).toMatchObject(
                        {
                            author: expect.any(String),
                            title: expect.any(String),
                            article_id: expect.any(Number),
                            topic: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            article_img_url: expect.any(String),
                            comment_count: expect.any(String),
                        })
                    expect(article.body).toBeUndefined()
                })
            })
    });

});

describe('GET: /api/articles/:article_id/comments', () => {
    test('status: 200, responds with all comments for an article', () => {
        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({body}) => {
                expect(body.comments).toHaveLength(11)
                body.comments.forEach((comment) => {
                    expect(comment).toMatchObject(
                        {
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String),
                            article_id: expect.any(Number)
                        })
                })
                
                const allCommentCreateDates = body.comments.map((comment) => {
                    return Number(comment.created_at.split('T')[0].split('-')[1])
                })
                expect(allCommentCreateDates).toBeSorted({descending: true})
                
            })
    });
    test('status:400, invalid article_Id', () => {
        return request(app)
            .get('/api/articles/invalid/comments')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request.')
            })
    });
})

describe('POST: /api/articles/:article_id/comments', () => {
    test('status:201, adds a comment for an article  ', () => {
        return request(app)
            .post('/api/articles/1/comments')
            .send({
                username: 'butter_bridge',
                body: 'This is a test comment'
            })
            .expect(201)
            .then((response) => {
                expect(response.body.comment).toMatchObject({
                    comment_id: expect.any(Number),
                    body: 'This is a test comment',
                    article_id: 1,
                    author: 'butter_bridge',
                    votes: 0,
                    created_at: expect.any(String)
                })
               
            })
        
    });

    test('status: 400, responds with an error message if no username is provided  ', () => {
        return request(app)
            .post('/api/articles/1/comments')
            .send({
                body: 'I like carrots.'
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request.')
            })
        
    });

    test('status: 400, responds with an error message if no body is provided  ', () => {
        return request(app)
            .post('/api/articles/1/comments')
            .send({
                username: 'butter_bridge'
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request.')
            })
        
    });

    test('status:400, responds with an error message if articleId is NaN', () => {
        return request(app)
            .post('/api/articles/invalid/comments')
            .send({
                username: 'butter_bridge',
                body: 'I like carrots.'
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request.')
            })
        
    });

    test('status:404, responds with an error message if articleId does not exist', () => {
        return request(app)
            .post('/api/articles/1000/comments')
            .send({
                username: 'butter_bridge',
                body: 'I like carrots.'
            })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Not found.')
            })
        
    });
    
    test('status:404, responds with an error message if username does not exist. ', () => {
        return request(app)
            .post('/api/articles/1/comments')
            .send({
                username: 'non-existent',
                body: 'I like carrots.'
            })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Not found.')
            })
        
    });
});

describe('PATCH: /api/articles/:article_id', () => {
    test('status:200, updates the votes on an article', () => {
        return request(app)
            .patch('/api/articles/1')
            .send({
                inc_votes: -1,
                color: 'red',
                font: 'arial'
            })
            .expect(200)
            .then(({body}) => {
                expect(body.article).toMatchObject(
                    {
                        article_id: 1,
                        title: "Living in the shadow of a great man",
                        topic: "mitch",
                        author: "butter_bridge",
                        body: "I find this existence challenging",
                        votes:99,
                        article_img_url:
                          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                      })
                
            })
    })

    test('status:400, responds with an error message if inc_votes is not a number', () => {
        return request(app)
            .patch('/api/articles/1')
            .send({
                inc_votes: 'invalid'
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request.')
            })
    })

    test('status:400, responds with an error message if inc_votes is missing', () => {
        return request(app)
            .patch('/api/articles/1')
            .send({
                animals: 4
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request.')
            })
    })

    test('status:400, responds with an error message if articleId is invalid', () => {
        return request(app)
            .patch('/api/articles/invalid')
            .send({
                inc_votes: 1
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request.')
            })
    })

    test('status:404, responds with an error message if articleId does not exist', () => {
        return request(app)
            .patch('/api/articles/1000')
            .send({
                inc_votes: 1
            })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Not found.')
            })
    })
});

describe('DELETE: /api/comments/:comment_id', () => {
    test('status:204, deletes a comment by comment_id', () => {
        return request(app)
            .delete('/api/comments/1')
            .expect(204)
            .then(({body})=> {
                expect(body).toEqual({})
            })
    })

    test('status:404, responds with an error message if commentId does not exist', () => {
        return request(app)
            .delete('/api/comments/1000')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Not found.')
            })
    })

    test('status:400, responds with an error message if commentId is NaN', () => {
        return request(app)
            .delete('/api/comments/invalid')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request.')
            })
    })
    
});

describe('GET: /api/users', () => {
    test('status:200, responds with all users', () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then(({body}) => {
                expect(body.users).toHaveLength(4)
                body.users.forEach((user) => {
                    expect(user).toMatchObject(
                        {
                            username: expect.any(String),
                            name: expect.any(String),
                            avatar_url: expect.any(String)
                        }
                    )
                })
            })
    })
     test('status:404, responds with an error message when non existent api', () => {
        return request(app)
            .get('/api/non-existent')
            .expect(404)
            .then(({body})=> {
                expect(body.msg).toBe("Endpoint doesn't exist.")

            })
        })
    
    
});