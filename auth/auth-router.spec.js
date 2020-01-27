const supertest = require('supertest');
const server = require('../index.js');

const db = require('../database/dbConfig.js')



test('find', async () => {
    const res = await supertest(server).get('/api/auth')
    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.length).toBeGreaterThan(0)
})

beforeEach(async () => {
    await db.seed.run()
})

test('register new user', async () => {
    const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'N', password: 'Nuncle'})
    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
})

test('register new user without a proper password', async () => {
    const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'N', password: ''})
    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
})


test('logging in new user', async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: 'A', password: 'Auncle'})
    expect(res.status).toBe(401)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/invalid credentials/i)
})

test('logging in new user without a proper password', async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: 'A', password: ''})
    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/A username and password are required to log in/i)
})

