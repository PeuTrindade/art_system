const supertest = require('supertest')
const request = supertest('http://localhost:3000')

describe('User tests', () => {
    describe('Create new user', () => {
        it('should create a user correctly', async () => {
            const requestBody = {
                name: "Teste",
                email: `${Math.random()}@gmail.com`,
                password: "123",
                age: 18,
                style: "painting"
            }
    
            const response = await request.post('/user').send(requestBody)
    
            expect(response.status).toBe(201)
        })
    
        it ('should return 400 status code - Empty name', async () => {
            const requestBody = {
                email: "teste@gmail.com",
                password: "123",
                age: 18,
                style: "painting"
            }
    
            const response = await request.post('/user').send(requestBody)
    
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Field name is required!')
        })
    
        it ('should return 400 status code - Empty email', async () => {
            const requestBody = {
                name: "Pedro",
                password: "123",
                age: 18,
                style: "painting"
            }
    
            const response = await request.post('/user').send(requestBody)
    
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Field email is required!')
        })
    
        it ('should return 400 status code - Empty password', async () => {
            const requestBody = {
                name: "Pedro",
                email: "teste@gmail.com",
                age: 18,
                style: "painting"
            }
    
            const response = await request.post('/user').send(requestBody)
    
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Field password is required!')
        })
    
        it ('should return 400 status code - Empty age', async () => {
            const requestBody = {
                name: "Pedro",
                email: "teste@gmail.com",
                password: "123",
                style: "painting"
            }
    
            const response = await request.post('/user').send(requestBody)
    
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Field age is required!')
        })
    
        it ('should return 400 status code - Empty style', async () => {
            const requestBody = {
                name: "Pedro",
                email: "teste@gmail.com",
                age: 17,
                password: "123"
            }
    
            const response = await request.post('/user').send(requestBody)
    
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Field style is empty or has unacceptable type')
        })
    
        it ('should return 400 status code - Invalid style', async () => {
            const requestBody = {
                name: "Pedro",
                email: "teste@gmail.com",
                age: 17,
                password: "123",
                style: "blablablaa"
            }
    
            const response = await request.post('/user').send(requestBody)
    
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Field style is empty or has unacceptable type')
        })
    })

    describe('Find user(s)', () => {
        it('should find a user by ID', async () => {
            const response = await request.get('/user/19')
    
            expect(response.status).toBe(200)
        })

        it('should return a error - User not found by ID', async () => {
            const response = await request.get('/user/159')
    
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('User not found!')
        })

        it('should return a error - Invalid ID', async () => {
            const response = await request.get('/user/15ejr3')
    
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Invalid ID!')
        })
    })
})