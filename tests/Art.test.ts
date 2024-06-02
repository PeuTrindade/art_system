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

    describe('Update art tests', () => {
        it('should return art not found error message', async () => {
            const requestBody = {
                name: "Arte",
                valuedAt: 324.34,
                userId: 10
            }

            const response = await req.put('/art/48375935353535').send(requestBody)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Art update failed!')
        })

        it('should return success message', async () => {
            const updateRequestBody = {
                name: "Arte",
                valuedAt: 324.34
            }

            const updateResponse = await req.put(`/art/32`).send(updateRequestBody)

            expect(updateResponse.status).toBe(200)
            expect(updateResponse.body.message).toBe('Art info was updated successfully!')
        })
    })

    describe('Find art by id', () => {
        it('should return error message', async () => {
            const response = await req.get(`/art/34593478345345`)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Art was not found!')
        })

        it('should return success code', async () => {
            const response = await req.get(`/art/32`)

            expect(response.status).toBe(200)
        })
    })

    describe('Delete art', () => {
        it('should return error', async () => {
            const response = await req.delete('/art/493525844684532')

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Art delete failed!')
        })

        it('should delete correctly', async () => {
            const artsResponse = await req.get('/art')
            const arts = artsResponse.body.arts

            const artsIds = arts.map((art) => art.id)

            const response = await req.delete(`/art/${artsIds[0]}`)

            expect(response.status).toBe(200)
            expect(response.body.message).toBe('Art deleted successfully!')
        })
    })

    describe('List arts', () => {
        it('should return success status', async () => {
            const response = await req.get('/art')

            expect(response.status).toBe(200)
        })
    })
})