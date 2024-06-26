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

    describe('Find user by email tests', () => {
        it('should return status 200', async () => {
            const email = `${Math.random()}@gmail.com` 

            const requestBody = {
                name: "Fulano",
                email: email,
                password: "fulano123",
                age: 20,
                style: "design"
            }

            await request.post('/user').send(requestBody)

            const response = await request.get(`/user/${email}`)

            expect(response.status).toBe(200)
        })

        it('should return correctly message', async () => {
            const email = `${Math.random()}@gmail.com` 

            const requestBody = {
                name: "Fulano",
                email: email,
                password: "fulano123",
                age: 20,
                style: "design"
            }

            await request.post('/user').send(requestBody)

            const response = await request.get(`/user/${email}`)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe('User found successfully!')
        })

        it('should return user info correctly', async () => {
            const email = `${Math.random()}@gmail.com` 

            const requestBody = {
                name: "Fulano",
                email: email,
                password: "fulano123",
                age: 20,
                style: "design"
            }

            await request.post('/user').send(requestBody)

            const response = await request.get(`/user/${email}`)

            expect(response.status).toBe(200)
            expect(response.body.user.name).toBe('Fulano')
            expect(response.body.user.email).toBe(email)
            expect(response.body.user.age).toBe(20)
            expect(response.body.user.style).toBe('design')
        })

        it('should return error message', async () => {
            const email = `randomrandom@gmail.com` 

            const response = await request.get(`/user/${email}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('User not found!')
        })
    })

    describe('Update user info', () => {
        it('should return user not found error message', async () => {
            const requestBody = {
                name: "Fulano",
                password: "fulano123",
                age: 20,
                style: "design"
            }

            const response = await request.put('/user/48375935353535').send(requestBody)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('User update failed!')
        })

        it('should return success message', async () => {
            const updateRequestBody = {
                name: "Fulano",
                password: "fulano123",
                age: 20,
                style: "design"
            }

            const updateResponse = await request.put(`/user/10`).send(updateRequestBody)

            expect(updateResponse.status).toBe(200)
            expect(updateResponse.body.message).toBe('User info was updated successfully!')
        })
    })
})