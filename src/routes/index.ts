import express from "express"
import { userRoutes } from "./User.routes"
import { artRoutes } from './Art.routes'

const routes = express.Router()

routes.use('/user', userRoutes)
routes.use('/art', artRoutes)

export { routes }