const supertest = require('supertest')

const request = supertest('http://localhost:3000')

describe('User features tests', () => {
    describe('Create user tests', () => {
        it('should return status 200', async () => {
            const requestBody = {
                name: "Fulano",
                email: `${Math.random()}@gmail.com`,
                password: "fulano123",
                age: 20,
                style: "design"
            }

            const response = await request.post('/user').send(requestBody)
            expect(response.status).toBe(201)
        })

        it('should return success message', async () => {
            const requestBody = {
                name: "Ciclano",
                email: `${Math.random()}@gmail.com`,
                password: "ciclano",
                age: 22,
                style: "design"
            }

            const response = await request.post('/user').send(requestBody)
            expect(response.body.message).toBe('User created successfully!')
        })

        it('should not create user with invalid data', async () => {
            const requestBody = {
                name: "",
                email: "",
                password: "",
                age: 22,
                style: "design"
            }

            const response = await request.post('/user').send(requestBody)
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Fields missing! Please send valid data.')
        })

        it('should return email already exists error', async () => {
            const requestBody = {
                name: "Ciclano",
                email: "ciclano@gmail.com",
                password: "ciclano",
                age: 22,
                style: "design"
            }

            await request.post('/user').send(requestBody)
            const response = await request.post('/user').send(requestBody)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Email already exists. Please, try login!')
        })
    })
})