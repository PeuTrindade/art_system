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

    describe('Update user tests', () => {
        it('should update user name', async () => {
            const email = `${Math.random()}@gmail.com`

            const requestBody = {
                name: "Fulano",
                email: `${Math.random()}@gmail.com`,
                password: "fulano123",
                age: 20,
                style: "design"
            }

            await request.post('/user').send(requestBody)

            const user = await request.get(`/user/${email}`)
            const userId = user.body.user.id

            const requestBodyUpdated = {
                name: "Fulano Ciclano",
                email: email,
                password: "fulano123",
                age: 20,
                style: "design"
            }

            const response = request.put(`/user/${userId}`).send(requestBodyUpdated)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe("User has been updated successfully!")
            expect(response.body.user.name).toBe("Fulano Ciclano")
        })

        it('should update user password', async () => {
            const email = `${Math.random()}@gmail.com`

            const requestBody = {
                name: "Fulano",
                email: `${Math.random()}@gmail.com`,
                password: "fulano123",
                age: 20,
                style: "design"
            }

            await request.post('/user').send(requestBody)

            const user = await request.get(`/user/${email}`)
            const userId = user.body.user.id

            const requestBodyUpdated = {
                name: "Fulano Ciclano",
                email: email,
                password: "fulano12345",
                age: 20,
                style: "design"
            }

            const response = request.put(`/user/${userId}`).send(requestBodyUpdated)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe("User has been updated successfully!")
        })

        it('should update user age', async () => {
            const email = `${Math.random()}@gmail.com`

            const requestBody = {
                name: "Fulano",
                email: `${Math.random()}@gmail.com`,
                password: "fulano123",
                age: 20,
                style: "design"
            }

            await request.post('/user').send(requestBody)

            const user = await request.get(`/user/${email}`)
            const userId = user.body.user.id

            const requestBodyUpdated = {
                name: "Fulano Ciclano",
                email: email,
                password: "fulano12345",
                age: 25,
                style: "design"
            }

            const response = request.put(`/user/${userId}`).send(requestBodyUpdated)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe("User has been updated successfully!")
            expect(response.body.user.age).toBe(25)
        })

        it('should update user style', async () => {
            const email = `${Math.random()}@gmail.com`

            const requestBody = {
                name: "Fulano",
                email: `${Math.random()}@gmail.com`,
                password: "fulano123",
                age: 20,
                style: "design"
            }

            await request.post('/user').send(requestBody)

            const user = await request.get(`/user/${email}`)
            const userId = user.body.user.id

            const requestBodyUpdated = {
                name: "Fulano Ciclano",
                email: email,
                password: "fulano12345",
                age: 25,
                style: "photography"
            }

            const response = request.put(`/user/${userId}`).send(requestBodyUpdated)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe("User has been updated successfully!")
            expect(response.body.user.style).toBe("photography")
        })

        it('should return invalid user error', async () => {
            const requestBodyUpdated = {
                name: "Fulano Ciclano",
                email:`${Math.random()}@gmail.com` ,
                password: "fulano123",
                age: 25,
                style: "design"
            }

            const response = request.put(`/user/98525453843626424`).send(requestBodyUpdated)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe("User not found! Try again.")
        })
    })
})