import express from "express"
import FeedbackController from "../controllers/FeedbackController"
import Auth from "../middlewares/Auth"

const feedbackRoutes = express.Router()

feedbackRoutes.get('/:id', Auth as any, FeedbackController.list)
feedbackRoutes.post('/', Auth as any, FeedbackController.create)

export { feedbackRoutes } 
