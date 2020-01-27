const supertest = require('supertest');
const server = require('../index.js')

const db = require('../database/dbConfig.js')

beforeEach(async () => {
    await db.seed.run()
})

test('get jokes not logged in', async () => {
    const res = await supertest(server).get('/api/jokes')
    expect(res.status).toBe(401)
})

test('get jokes not logged in', async () => {
    const res = await supertest(server).get('/api/jokes')
    expect(res.type).toBe('application/json')
})

test('get jokes invalid token', async () => {
    const res = await supertest(server).get('/api/jokes')
        .set('Authorization', 'abc')
    expect(res.body.message).toMatch(/token not valid/i)
})