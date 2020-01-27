const supertest = require('supertest');
const server = require('../index.js');

const db = require('../database/dbConfig.js')

beforeEach(async () => {
    await db.seed.run()
})

test('find', async () => {
    const res = await supertest(server).get('/api/auth')
    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.length).toBeGreaterThan(0)
})

test('register new user', async () => {
    const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'N', password: 'Nuncle'})
    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
})

test('loggin in new user', async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: 'A', password: 'Auncle'})
    expect(res.status).toBe(401)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/invalid credentials/i)
})