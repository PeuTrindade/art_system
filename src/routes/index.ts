import express from "express"
import { userRoutes } from "./User.routes"
import { artRoutes } from './Art.routes'
import { feedbackRoutes } from "./Feedback.routes"

const routes = express.Router()

routes.use('/user', userRoutes)
routes.use('/art', artRoutes)
routes.use('/feedback', feedbackRoutes)

export { routes }