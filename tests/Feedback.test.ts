const supertestToolFeedback = require('supertest')
const reqFeedback = supertestToolFeedback('http://localhost:3000')

describe('Feedback tests', () => {
    describe('Create feedback tests', () => {
        it('should return success status', async () => {
            const requestBody = {
                artId: 30,
                userId: 10,
                feedback: "Cool!"
            }

            const response = await reqFeedback.post('/feedback').send(requestBody)
            expect(response.status).toBe(201)
        })

        it('should return success message', async () => {
            const requestBody = {
                artId: 30,
                userId: 10,
                feedback: "Cool!"
            }

            const response = await reqFeedback.post('/feedback').send(requestBody)
            expect(response.body.message).toBe("Feedback created successfully!")
        })

        it('should not create feedback with invalid info', async () => {
            const requestBody = {
                feedback: "Ok!"
            }

            const response = await reqFeedback.post('/feedback').send(requestBody)

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('Fields missing! Please send valid data.')
        })
    })

    describe('List feedbacks tests', () => {
        it('should return success status', async () => {
            const requestBody = {
                artId: 30,
                userId: 10,
                feedback: "Cool!"
            }

            await reqFeedback.post('/feedback').send(requestBody)

            const response = await reqFeedback.get('/feedback/3')

            expect(response.status).toBe(200)
        })
    })
})