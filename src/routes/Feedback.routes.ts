import express from "express"
import FeedbackController from "../controllers/FeedbackController"

const feedbackRoutes = express.Router()

feedbackRoutes.get('/:id', FeedbackController.list)
feedbackRoutes.post('/', FeedbackController.create)

export { feedbackRoutes } 
