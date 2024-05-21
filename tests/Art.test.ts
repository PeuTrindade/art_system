const supertestTool = require('supertest')

const req = supertestTool('http://localhost:3000')

describe('Art features tests', () => {
    describe('Create art tests', () => {
        it('should return status 200', async () => {
            const requestBody = {
                name: "Arte",
                valuedAt: 200.0,
                userId: 10
            }

            const response = await req.post('/art').send(requestBody)
            expect(response.status).toBe(201)
        })

        it('should return success message', async () => {
            const requestBody = {
                name: "Arte",
                valuedAt: 200.0,
                userId: 10
            }

            const response = await req.post('/art').send(requestBody)
            expect(response.status).toBe(201)
            expect(response.body.message).toBe('Art created successfully!')
        })

        it('should not create art with invalid info', async () => {
            const requestBody = {
                name: "Arte"
            }

            const response = await req.post('/art').send(requestBody)
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Fields missing! Please send valid data.')
        })
    })
})