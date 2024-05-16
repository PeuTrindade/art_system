import express from "express"
import { userRoutes } from "./User.routes"

const routes = express.Router()

routes.use('/user', userRoutes)

export { routes }