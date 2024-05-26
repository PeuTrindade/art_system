import express from "express"
import UserController from "../controllers/UserController"
import Auth from "../middlewares/Auth"

const userRoutes = express.Router()

userRoutes.post('/', UserController.create)
userRoutes.get('/:email', UserController.getByEmail)
userRoutes.put('/:id', Auth as any, UserController.update)
userRoutes.post('/auth', UserController.auth)

export { userRoutes }
